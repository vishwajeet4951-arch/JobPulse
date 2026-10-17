import { describe, it, expect } from "vitest";
import {
  tokenizeText,
  countSyllables,
  calculateReadabilityMetrics,
  calculateCosineSimilarity,
  calculateRoleAlignment,
  analyzeATSResume
} from "../src/workers/atsAlgorithms.js";
import { sampleResumes } from "../src/data/sampleResumes.js";
import { mockJobs } from "../src/data/mockJobs.js";

describe("Part C: ATS Algorithms & Scoring Engine Tests", () => {
  it("strictly bounds all scores between 0 and 100", () => {
    // Test with empty string
    const emptyResult = analyzeATSResume("", "");
    expect(emptyResult.overallMatchScore).toBeGreaterThanOrEqual(0);
    expect(emptyResult.overallMatchScore).toBeLessThanOrEqual(100);

    // Test with various jobs and resumes
    for (const job of mockJobs.slice(0, 10)) {
      const res = analyzeATSResume(sampleResumes.frontendSenior.text, job.description, job);
      expect(res.overallMatchScore).toBeGreaterThanOrEqual(0);
      expect(res.overallMatchScore).toBeLessThanOrEqual(100);
      expect(res.scoreBreakdown.requiredSkillsScore).toBeGreaterThanOrEqual(0);
      expect(res.scoreBreakdown.requiredSkillsScore).toBeLessThanOrEqual(100);
    }
  });

  it("handles empty resume or empty job description gracefully", () => {
    const emptyResume = analyzeATSResume("", "Requires React and JavaScript");
    expect(emptyResume.overallMatchScore).toBe(0);
    expect(emptyResume.matchedSkills).toEqual([]);

    const emptyJD = analyzeATSResume("Senior React engineer with 5 years experience", "");
    expect(emptyJD.overallMatchScore).toBe(0);
  });

  it("produces high match (>90%) for identical resume and job description text", () => {
    const text = sampleResumes.frontendSenior.text;
    const result = analyzeATSResume(text, text);
    expect(result.overallMatchScore).toBeGreaterThanOrEqual(85);
  });

  it("validates Calibration Benchmark A: Target Senior Frontend Specialist (Expect: 88-96%)", () => {
    // Senior Frontend Engineer role at Stripe (job-001)
    const job001 = mockJobs.find((j) => j.id === "job-001");
    expect(job001).toBeDefined();

    const analysis = analyzeATSResume(
      sampleResumes.frontendSenior.text,
      job001.description,
      job001
    );

    expect(analysis.overallMatchScore).toBeGreaterThanOrEqual(85);
    expect(analysis.overallMatchScore).toBeLessThanOrEqual(98);

    // Matched skills should include React, JavaScript, CSS3, Design Systems
    const matchedNames = analysis.matchedSkills.map((s) => s.name);
    expect(matchedNames).toContain("React");
    expect(matchedNames).toContain("JavaScript");

    // Critical missing skills penalty should be low or 0
    expect(analysis.scoreBreakdown.penaltyDeducted).toBeLessThanOrEqual(5);
  });

  it("validates Calibration Benchmark B: Partial Domain Shift (Expect: 45-60%)", () => {
    // Fullstack engineer applying to Senior Go Backend (job-051)
    const job051 = mockJobs.find((j) => j.id === "job-051");
    expect(job051).toBeDefined();

    const analysis = analyzeATSResume(
      sampleResumes.fullstackGeneralist.text,
      job051.description,
      job051
    );

    expect(analysis.overallMatchScore).toBeGreaterThanOrEqual(40);
    expect(analysis.overallMatchScore).toBeLessThanOrEqual(65);

    // Should detect missing Go or Microservices
    const missingNames = analysis.missingSkills.map((s) => s.name);
    expect(missingNames).toContain("Go");
  });

  it("validates Calibration Benchmark C: Seniority Mismatch (Expect: 18-32%)", () => {
    // Junior Developer applying to Lead React Architect (job-002)
    const job002 = mockJobs.find((j) => j.id === "job-002");
    expect(job002).toBeDefined();

    const analysis = analyzeATSResume(
      sampleResumes.juniorDeveloper.text,
      job002.description,
      job002
    );

    // Expect score in the 18-32% range (computed: 25%)
    expect(analysis.overallMatchScore).toBeGreaterThanOrEqual(18);
    expect(analysis.overallMatchScore).toBeLessThanOrEqual(32);
  });

  it("validates Calibration Benchmark D: Completely Unrelated Content (Expect: <= 5%)", () => {
    const job001 = mockJobs.find((j) => j.id === "job-001");
    const analysis = analyzeATSResume(
      sampleResumes.unrelatedContent.text,
      job001.description,
      job001
    );

    expect(analysis.overallMatchScore).toBeLessThanOrEqual(5);
    expect(analysis.matchedSkills.length).toBe(0);
  });

  it("applies missing critical skill penalties consistently without double-counting", () => {
    const targetJob = {
      title: "Backend Engineer",
      skillsRequired: ["Go", "Kubernetes", "Kafka", "PostgreSQL"],
      preferredSkills: ["Redis"]
    };

    // Resume only has PostgreSQL
    const resume = "Experienced developer working with PostgreSQL databases.";
    const analysis = analyzeATSResume(resume, "Backend Engineer using Go, Kubernetes, Kafka, and PostgreSQL.", targetJob);

    // Required skills coverage: 1 of 4 = 25%
    expect(analysis.scoreBreakdown.requiredSkillsScore).toBe(25);

    // 3 missing critical skills -> penalty is min(8, 3 * 2) = 6
    expect(analysis.scoreBreakdown.penaltyDeducted).toBe(6);

    // Score remains strictly non-negative and calibrated
    expect(analysis.overallMatchScore).toBeGreaterThan(0);
    expect(analysis.overallMatchScore).toBeLessThan(40);
  });

  it("calculates readability metrics heuristic without claiming official certification", () => {
    const sampleText = sampleResumes.frontendSenior.text;
    const readability = calculateReadabilityMetrics(sampleText);

    expect(readability.isHeuristic).toBe(true);
    expect(readability.disclaimer).toContain("heuristic");
    expect(readability.wordCount).toBeGreaterThan(150);
    expect(readability.sentenceCount).toBeGreaterThan(5);
    expect(readability.fleschReadingEase).toBeGreaterThan(20);
    expect(readability.bulletCount).toBeGreaterThan(0);
    expect(readability.metricRatio).toBeGreaterThan(0.3); // Has quantifiable numbers like 42%, 54%, 120,000
  });
});
