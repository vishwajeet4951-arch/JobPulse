/**
 * Native ES-Module Web Worker for ATS Resume Matching
 * Offloads heavy text tokenization, n-gram matching, TF-IDF, and scoring from the UI thread.
 */

import { analyzeATSResume } from "./atsAlgorithms.js";

self.onmessage = function (event) {
  const message = event.data;

  // 1. Validate envelope structure
  if (!message || typeof message !== "object") {
    self.postMessage({
      id: null,
      type: "ANALYSIS_ERROR",
      error: "Worker received invalid message format (expected object).",
      payload: null
    });
    return;
  }

  const { id, type, payload } = message;

  if (!id) {
    self.postMessage({
      id: null,
      type: "ANALYSIS_ERROR",
      error: "Worker message missing required 'id' attribute.",
      payload: null
    });
    return;
  }

  // 2. Handle Message Types
  if (type === "ANALYZE_MATCH") {
    const startTime = performance.now();

    try {
      const { resumeText, jobDescriptionText, targetJob } = payload || {};

      // Execute computation
      const analysisResult = analyzeATSResume(resumeText, jobDescriptionText, targetJob);
      const durationMs = Math.round((performance.now() - startTime) * 10) / 10;

      // Post back success result with matching ID
      self.postMessage({
        id,
        type: "ANALYSIS_SUCCESS",
        payload: analysisResult,
        durationMs,
        error: null
      });
    } catch (err) {
      self.postMessage({
        id,
        type: "ANALYSIS_ERROR",
        error: err.message || "An unexpected error occurred during worker analysis.",
        payload: null,
        durationMs: Math.round((performance.now() - startTime) * 10) / 10
      });
    }
  } else if (type === "PING") {
    self.postMessage({
      id,
      type: "PONG",
      payload: { status: "ready" }
    });
  } else {
    self.postMessage({
      id,
      type: "ANALYSIS_ERROR",
      error: `Unknown message type: "${type}".`,
      payload: null
    });
  }
};
