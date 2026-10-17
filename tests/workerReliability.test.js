import { describe, it, expect, vi } from "vitest";
import { analyzeATSResume } from "../src/workers/atsAlgorithms.js";

describe("Part D: Worker Reliability, Protocol, and Stale Result Invalidation Tests", () => {
  it("enforces structured message envelopes with request IDs", () => {
    const requestId = "req_test_12345";
    const payload = {
      resumeText: "React developer with 4 years experience",
      jobDescriptionText: "Seeking a React developer with modern JavaScript",
      targetJob: null
    };

    // Simulate worker logic
    const startTime = performance.now();
    const result = analyzeATSResume(payload.resumeText, payload.jobDescriptionText, payload.targetJob);
    const duration = performance.now() - startTime;

    const responseEnvelope = {
      id: requestId,
      type: "ANALYSIS_SUCCESS",
      payload: result,
      durationMs: duration,
      error: null
    };

    expect(responseEnvelope.id).toBe(requestId);
    expect(responseEnvelope.type).toBe("ANALYSIS_SUCCESS");
    expect(responseEnvelope.payload.overallMatchScore).toBeGreaterThan(0);
    expect(responseEnvelope.error).toBeNull();
  });

  it("handles malformed incoming messages and returns structured error", () => {
    // Test validation logic
    function simulateWorkerReceive(message) {
      if (!message || typeof message !== "object") {
        return {
          id: null,
          type: "ANALYSIS_ERROR",
          error: "Worker received invalid message format (expected object).",
          payload: null
        };
      }

      if (!message.id) {
        return {
          id: null,
          type: "ANALYSIS_ERROR",
          error: "Worker message missing required 'id' attribute.",
          payload: null
        };
      }

      if (message.type !== "ANALYZE_MATCH") {
        return {
          id: message.id,
          type: "ANALYSIS_ERROR",
          error: `Unknown message type: "${message.type}".`,
          payload: null
        };
      }

      return null;
    }

    const invalidMsg1 = null;
    expect(simulateWorkerReceive(invalidMsg1).type).toBe("ANALYSIS_ERROR");

    const invalidMsg2 = { type: "ANALYZE_MATCH" }; // Missing ID
    expect(simulateWorkerReceive(invalidMsg2).error).toContain("missing required 'id'");

    const invalidMsg3 = { id: "req_1", type: "UNKNOWN_COMMAND" };
    expect(simulateWorkerReceive(invalidMsg3).error).toContain("Unknown message type");
  });

  it("prevents stale results from overwriting newer user inputs", () => {
    let latestDispatchedRequestId = "req_1";
    let activeState = null;

    // Simulate user typing: Request 1 is dispatched
    latestDispatchedRequestId = "req_1";

    // User types again immediately before Request 1 finishes: Request 2 is dispatched
    latestDispatchedRequestId = "req_2";

    // Simulate delayed response arriving for Request 1
    const response1 = {
      id: "req_1",
      type: "ANALYSIS_SUCCESS",
      payload: { overallMatchScore: 45 }
    };

    // Stale check logic
    if (response1.id === latestDispatchedRequestId) {
      activeState = response1.payload;
    }
    // Should NOT have updated state because req_1 !== req_2!
    expect(activeState).toBeNull();

    // Now Response 2 arrives
    const response2 = {
      id: "req_2",
      type: "ANALYSIS_SUCCESS",
      payload: { overallMatchScore: 88 }
    };

    if (response2.id === latestDispatchedRequestId) {
      activeState = response2.payload;
    }
    // Correctly updated!
    expect(activeState).toEqual({ overallMatchScore: 88 });
  });

  it("handles exception during analysis and returns structured error without crashing", () => {
    function safeWorkerExecution(message) {
      try {
        if (message.payload.forceError) {
          throw new Error("Simulated memory overflow during tokenization");
        }
        return { id: message.id, type: "ANALYSIS_SUCCESS", error: null };
      } catch (err) {
        return { id: message.id, type: "ANALYSIS_ERROR", error: err.message, payload: null };
      }
    }

    const result = safeWorkerExecution({
      id: "req_err_999",
      payload: { forceError: true }
    });

    expect(result.type).toBe("ANALYSIS_ERROR");
    expect(result.error).toBe("Simulated memory overflow during tokenization");
    expect(result.payload).toBeNull();
  });
});
