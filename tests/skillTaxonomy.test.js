import { describe, it, expect } from "vitest";
import {
  SKILL_TAXONOMY,
  buildSkillRegex,
  normalizeSkill,
  isSkillInText,
  extractSkillsFromText
} from "../src/data/skillTaxonomy.js";

describe("Part B: Skill Taxonomy & Boundary Matching Tests", () => {
  it("supports case-insensitive matching across canonical and aliases", () => {
    expect(normalizeSkill("react")).toBe("React");
    expect(normalizeSkill("REACT")).toBe("React");
    expect(normalizeSkill("React.js")).toBe("React");
    expect(normalizeSkill("reactjs")).toBe("React");
    expect(normalizeSkill("JS")).toBe("JavaScript");
    expect(normalizeSkill("javascript")).toBe("JavaScript");
    expect(normalizeSkill("golang")).toBe("Go");
    expect(normalizeSkill("k8s")).toBe("Kubernetes");
    expect(normalizeSkill("postgres")).toBe("PostgreSQL");
    expect(normalizeSkill("ts")).toBe("TypeScript");
  });

  it("avoids false positives for short or ambiguous words like 'go'", () => {
    // Should NOT match 'go' in unrelated words
    const sentenceWithFalsePositives = "Good algorithms in Django help Google index web pages.";
    expect(isSkillInText("Go", sentenceWithFalsePositives)).toBe(false);

    // Should MATCH when Go is referenced as a distinct language
    const sentenceWithGo = "We build high-performance microservices using Go and PostgreSQL.";
    expect(isSkillInText("Go", sentenceWithGo)).toBe(true);

    const sentenceWithGolang = "Looking for a seasoned Golang developer.";
    expect(isSkillInText("Go", sentenceWithGolang)).toBe(true);
  });

  it("avoids false positives for 'java' inside 'javascript'", () => {
    const textJavaScriptOnly = "I have 5 years of experience building web applications in JavaScript and React.";
    expect(isSkillInText("Java", textJavaScriptOnly)).toBe(false);

    const textWithJava = "Backend microservices built in Java and Spring Boot.";
    expect(isSkillInText("Java", textWithJava)).toBe(true);
  });

  it("avoids false positives for single-letter 'c' in unrelated words", () => {
    const textWithoutC = "Cloud computing with React, modern CSS, and container platforms.";
    expect(isSkillInText("C", textWithoutC)).toBe(false);

    const textWithC = "Low-level systems programming in ANSI C and assembly.";
    expect(isSkillInText("C", textWithC)).toBe(true);
  });

  it("correctly identifies special character technologies: C++, C#, .NET, CI/CD", () => {
    const text = "Experience in C++, C#, .NET Core, and CI/CD automation pipelines.";
    expect(isSkillInText("C++", text)).toBe(true);
    expect(isSkillInText("C#", text)).toBe(true);
    expect(isSkillInText(".NET", text)).toBe(true);
    expect(isSkillInText("CI/CD", text)).toBe(true);
  });

  it("extracts multiple skills from resume text with accurate canonical mappings", () => {
    const resumeSnippet = `
      Alex Rivera
      Senior Frontend Developer with experience in React, Next.js, and TypeScript.
      Expert in Tailwind CSS, Redux, and Jest testing.
    `;

    const extracted = extractSkillsFromText(resumeSnippet);
    const skillNames = extracted.map((s) => s.canonical);

    expect(skillNames).toContain("React");
    expect(skillNames).toContain("Next.js");
    expect(skillNames).toContain("TypeScript");
    expect(skillNames).toContain("Tailwind CSS");
    expect(skillNames).toContain("Redux");
    expect(skillNames).toContain("Jest");
    expect(skillNames).not.toContain("Java");
    expect(skillNames).not.toContain("Go");
  });
});
