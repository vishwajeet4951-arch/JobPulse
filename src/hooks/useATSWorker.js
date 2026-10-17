import { useState, useEffect, useRef, useCallback } from "react";
import { analyzeATSResume } from "../workers/atsAlgorithms.js";

/**
 * Custom hook to manage the native Web Worker for ATS resume matching.
 * Provides structured messaging, monotonic request IDs, stale-result prevention,
 * 350ms analysis debouncing, and worker lifecycle termination.
 *
 * @param {string} resumeText
 * @param {string} jobDescriptionText
 * @param {Object} [targetJob]
 * @param {number} [debounceMs=350]
 * @returns {Object} Analysis state: { analysisResult, isAnalyzing, workerError, durationMs }
 */
export function useATSWorker(resumeText, jobDescriptionText, targetJob = null, debounceMs = 350) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [workerError, setWorkerError] = useState(null);
  const [durationMs, setDurationMs] = useState(0);

  const workerRef = useRef(null);
  const requestCounterRef = useRef(0);
  const latestRequestIdRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize and maintain the native Web Worker instance
  useEffect(() => {
    let worker = null;

    // Verify browser supports native Web Workers
    if (typeof window !== "undefined" && typeof window.Worker !== "undefined") {
      try {
        worker = new Worker(new URL("../workers/atsWorker.js", import.meta.url), {
          type: "module"
        });

        worker.onmessage = (event) => {
          const { id, type, payload, durationMs: execTime, error } = event.data || {};

          // Stale Result Check: Discard result if ID doesn't match the latest dispatched request
          if (id !== latestRequestIdRef.current) {
            return;
          }

          setIsAnalyzing(false);

          if (type === "ANALYSIS_SUCCESS") {
            setAnalysisResult(payload);
            setWorkerError(null);
            if (execTime !== undefined) setDurationMs(execTime);
          } else if (type === "ANALYSIS_ERROR") {
            setWorkerError(error || "Worker analysis failed.");
          }
        };

        worker.onerror = (err) => {
          console.error("[useATSWorker] Worker error:", err);
          setIsAnalyzing(false);
          setWorkerError("A background worker error occurred.");
        };

        workerRef.current = worker;
      } catch (err) {
        console.warn("[useATSWorker] Could not instantiate Web Worker, using fallback mode:", err);
        workerRef.current = null;
      }
    }

    // Cleanup: Terminate worker instance on unmount
    return () => {
      if (worker) {
        worker.terminate();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Trigger analysis when inputs change, debounced by 350ms to keep UI 60fps responsive
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Fast-path: If both texts are empty, clear without worker overhead
    if (!resumeText?.trim() && !jobDescriptionText?.trim()) {
      setIsAnalyzing(false);
      setAnalysisResult(null);
      setWorkerError(null);
      return;
    }

    setIsAnalyzing(true);

    timerRef.current = setTimeout(() => {
      const requestId = `req_${Date.now()}_${++requestCounterRef.current}`;
      latestRequestIdRef.current = requestId;

      if (workerRef.current) {
        // Dispatch to background Web Worker
        workerRef.current.postMessage({
          id: requestId,
          type: "ANALYZE_MATCH",
          payload: {
            resumeText,
            jobDescriptionText,
            targetJob
          }
        });
      } else {
        // Fallback for environments where Web Worker is unavailable (e.g. testing)
        try {
          const start = performance.now();
          const fallbackResult = analyzeATSResume(resumeText, jobDescriptionText, targetJob);
          const elapsed = Math.round((performance.now() - start) * 10) / 10;

          if (requestId === latestRequestIdRef.current) {
            setAnalysisResult(fallbackResult);
            setWorkerError(null);
            setDurationMs(elapsed);
            setIsAnalyzing(false);
          }
        } catch (err) {
          if (requestId === latestRequestIdRef.current) {
            setWorkerError(err.message);
            setIsAnalyzing(false);
          }
        }
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resumeText, jobDescriptionText, targetJob, debounceMs]);

  return {
    analysisResult,
    isAnalyzing,
    workerError,
    durationMs
  };
}

export default useATSWorker;
