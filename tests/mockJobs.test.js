import { describe, it, expect } from "vitest";
import { mockJobs } from "../src/data/mockJobs.js";

describe("Part A: Job Dataset Verification", () => {
  it("contains at least 130 realistic developer job records", () => {
    expect(mockJobs.length).toBeGreaterThanOrEqual(130);
  });

  it("ensures every job record has a stable, unique ID", () => {
    const idSet = new Set();
    for (const job of mockJobs) {
      expect(job.id).toBeDefined();
      expect(typeof job.id).toBe("string");
      expect(job.id.trim().length).toBeGreaterThan(0);
      expect(idSet.has(job.id)).toBe(false);
      idSet.add(job.id);
    }
    expect(idSet.size).toBe(mockJobs.length);
  });

  it("ensures all required fields are present on every job record", () => {
    const requiredFields = [
      "id",
      "title",
      "company",
      "location",
      "type",
      "experienceLevel",
      "skillsRequired",
      "description",
      "salary"
    ];

    for (const job of mockJobs) {
      for (const field of requiredFields) {
        expect(job[field], `Job ${job.id} missing field: ${field}`).toBeDefined();
      }

      // Verify types
      expect(typeof job.title).toBe("string");
      expect(typeof job.company).toBe("string");
      expect(typeof job.location).toBe("string");
      expect(typeof job.type).toBe("string");
      expect(typeof job.experienceLevel).toBe("string");
      expect(Array.isArray(job.skillsRequired)).toBe(true);
      expect(job.skillsRequired.length).toBeGreaterThan(0);
      expect(typeof job.description).toBe("string");
      expect(typeof job.salary).toBe("object");
      expect(typeof job.salary.min).toBe("number");
      expect(typeof job.salary.max).toBe("number");
      expect(job.salary.max).toBeGreaterThanOrEqual(job.salary.min);
    }
  });

  it("covers all 8 engineering specializations", () => {
    const categories = new Set(mockJobs.map((j) => j.category));
    const expectedCategories = [
      "Frontend",
      "Full-Stack",
      "Backend",
      "Mobile",
      "Cloud/DevOps",
      "AI/ML",
      "Security",
      "QA"
    ];

    for (const cat of expectedCategories) {
      expect(categories.has(cat), `Missing category: ${cat}`).toBe(true);
      const count = mockJobs.filter((j) => j.category === cat).length;
      expect(count).toBeGreaterThanOrEqual(10);
    }
  });

  it("includes a sensible mix of Remote, Hybrid, and Onsite roles", () => {
    const types = new Set(mockJobs.map((j) => j.type));
    expect(types.has("Remote")).toBe(true);
    expect(types.has("Hybrid")).toBe(true);
    expect(types.has("Onsite")).toBe(true);

    const remoteCount = mockJobs.filter((j) => j.type === "Remote").length;
    const hybridCount = mockJobs.filter((j) => j.type === "Hybrid").length;
    const onsiteCount = mockJobs.filter((j) => j.type === "Onsite").length;

    expect(remoteCount).toBeGreaterThan(20);
    expect(hybridCount).toBeGreaterThan(20);
    expect(onsiteCount).toBeGreaterThan(10);
  });

  it("includes junior through senior, lead, and staff experience levels", () => {
    const levels = new Set(mockJobs.map((j) => j.experienceLevel));
    expect(levels.has("Junior")).toBe(true);
    expect(levels.has("Mid")).toBe(true);
    expect(levels.has("Senior")).toBe(true);
    expect(levels.has("Lead")).toBe(true);
    expect(levels.has("Staff")).toBe(true);
  });
});
