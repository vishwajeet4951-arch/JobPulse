/**
 * Pure ATS Text Analysis & Scoring Algorithms
 * Offloaded to Web Worker for CPU-intensive NLP processing.
 * Exported for automated unit testing and worker execution.
 */

import { SKILL_TAXONOMY, buildSkillRegex, normalizeSkill, isSkillInText } from "../data/skillTaxonomy.js";

// Common English stop words to filter out during keyword extraction
export const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
  "but", "by", "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does",
  "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had",
  "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her",
  "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd",
  "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's",
  "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once",
  "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't",
  "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that",
  "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these",
  "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
  "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who",
  "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll",
  "you're", "you've", "your", "yours", "yourself", "yourselves", "will", "shall", "our", "your"
]);

/**
 * Tokenizes text into normalized alphanumeric words, filtering punctuation and stop words.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeText(text) {
  if (!text || typeof text !== "string") return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  return words;
}

/**
 * Counts syllables in an English word (used in Flesch Reading Ease).
 * @param {string} word
 * @returns {number}
 */
export function countSyllables(word) {
  if (!word) return 1;
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;

  const clean = w.replace(/(?:[^laeiouy]|ed|es|e)$/, "").replace(/^y/, "");
  const syllables = clean.match(/[aeiouy]{1,2}/g);
  return syllables ? Math.max(1, syllables.length) : 1;
}

/**
 * Calculates Flesch Reading Ease score and returns readability metrics.
 * Calibrated for technical resumes where professional terminology has high syllable density.
 * Bounded strictly to 0-100.
 *
 * @param {string} text
 * @returns {Object} Readability statistics and heuristic score
 */
export function calculateReadabilityMetrics(text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    return {
      heuristicScore: 0,
      fleschReadingEase: 0,
      readingLevel: "Unreadable / Empty",
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      bulletCount: 0,
      bulletsWithMetricsCount: 0,
      metricRatio: 0,
      isHeuristic: true,
      disclaimer: "Readability and metrics scores are automated heuristics for guidance and do not represent formal ATS certification."
    };
  }

  // Split sentences: by periods, question marks, exclamation marks, or line breaks
  const sentences = text
    .split(/[.!?]+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const words = text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);

  // Count syllables
  let totalSyllables = 0;
  for (const word of words) {
    totalSyllables += countSyllables(word);
  }

  // Flesch Reading Ease Formula:
  // 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = totalSyllables / Math.max(1, wordCount);
  const rawFlesch = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  const fleschReadingEase = Math.round(Math.max(0, Math.min(100, rawFlesch)) * 10) / 10;

  // Determine reading level description
  let readingLevel = "Standard (8th-9th Grade)";
  if (fleschReadingEase >= 80) readingLevel = "Conversational (Easy)";
  else if (fleschReadingEase >= 60) readingLevel = "Standard (Plain English)";
  else if (fleschReadingEase >= 40) readingLevel = "Professional / Technical";
  else if (fleschReadingEase >= 20) readingLevel = "Dense Professional Engineering";
  else readingLevel = "Highly Academic / Very Dense";

  // Detect bullet points and quantifiable metrics (numbers, %, $, x times, metrics)
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  const bulletLines = lines.filter((l) => /^[-*•–—]|\d+\./.test(l) || l.length > 25);
  const bulletCount = bulletLines.length;

  const metricRegex = /\d+[\d,.]*(?:\s*%|\s*percent|\s*k|\s*m|\s*b|\s*x|\s*\$|\+)?|\$\s*\d+/i;
  const bulletsWithMetrics = bulletLines.filter((l) => metricRegex.test(l));
  const bulletsWithMetricsCount = bulletsWithMetrics.length;
  const metricRatio = bulletCount > 0 ? bulletsWithMetricsCount / bulletCount : 0;

  // Normalize Flesch score for technical resumes:
  // In engineering resumes, 20-65 is the standard professional sweet spot.
  let normalizedFlesch = 0;
  if (fleschReadingEase >= 20 && fleschReadingEase <= 70) {
    normalizedFlesch = 95;
  } else if (fleschReadingEase > 70) {
    normalizedFlesch = Math.max(60, 95 - (fleschReadingEase - 70) * 1.2);
  } else {
    normalizedFlesch = Math.max(40, fleschReadingEase * 2.5);
  }

  // Composite Readability Score (60% Flesch balance + 40% quantifiable impact ratio)
  const heuristicScore = Math.round(
    Math.min(100, normalizedFlesch * 0.6 + metricRatio * 100 * 0.4)
  );

  return {
    heuristicScore,
    fleschReadingEase,
    readingLevel,
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(wordsPerSentence * 10) / 10,
    bulletCount,
    bulletsWithMetricsCount,
    metricRatio: Math.round(metricRatio * 100) / 100,
    isHeuristic: true,
    disclaimer: "Readability and metrics scores are automated heuristics for guidance and do not represent formal ATS certification."
  };
}

/**
 * Computes keyword and vocabulary relevance between resume tokens and job description tokens.
 * Blends domain vocabulary coverage with sublinear term-frequency cosine similarity.
 *
 * @param {string[]} resumeTokens
 * @param {string[]} jdTokens
 * @returns {number} Relevance score percentage (0 - 100)
 */
export function calculateCosineSimilarity(resumeTokens, jdTokens) {
  if (!resumeTokens.length || !jdTokens.length) return 0;

  const tfResume = {};
  for (const t of resumeTokens) {
    tfResume[t] = (tfResume[t] || 0) + 1;
  }

  const tfJd = {};
  for (const t of jdTokens) {
    tfJd[t] = (tfJd[t] || 0) + 1;
  }

  const jdTerms = Object.keys(tfJd);
  if (!jdTerms.length) return 0;

  // Vocabulary coverage: percentage of unique JD terms present in resume
  const shared = jdTerms.filter((term) => tfResume[term]);
  const rawCoverage = shared.length / jdTerms.length;

  // In technical job descriptions, 50% unique token overlap represents exceptional match
  // due to common boilerplate verbs/nouns. Scale coverage accordingly.
  const scaledCoverage = Math.min(100, (rawCoverage / 0.52) * 100);

  // Sublinear TF cosine similarity
  let dotProduct = 0;
  let magResume = 0;
  let magJd = 0;

  for (const term of jdTerms) {
    const vr = tfResume[term] ? 1 + Math.log(tfResume[term]) : 0;
    const vj = 1 + Math.log(tfJd[term]);

    dotProduct += vr * vj;
    magResume += vr * vr;
    magJd += vj * vj;
  }

  const cosine = magResume > 0 && magJd > 0 ? (dotProduct / (Math.sqrt(magResume) * Math.sqrt(magJd))) * 100 : 0;

  return Math.round(Math.min(100, scaledCoverage * 0.65 + cosine * 0.35));
}

/**
 * Computes seniority & role alignment score (0 - 100).
 *
 * @param {string} resumeText
 * @param {string} jobTitle
 * @param {string} experienceLevel
 * @returns {number}
 */
export function calculateRoleAlignment(resumeText, jobTitle = "", experienceLevel = "") {
  if (!resumeText) return 0;
  if (!jobTitle) return 50;

  const resumeLower = resumeText.toLowerCase();
  const titleLower = jobTitle.toLowerCase();
  let score = 25; // Base score for technical alignment

  // Seniority keywords
  const levels = ["senior", "lead", "staff", "junior", "principal", "architect", "mid"];
  const targetLevel = (experienceLevel || "").toLowerCase();

  for (const lvl of levels) {
    if (titleLower.includes(lvl) || targetLevel.includes(lvl)) {
      if (resumeLower.includes(lvl)) {
        score += 35;
      }
      break;
    }
  }

  // Role specializations
  const roles = [
    "frontend", "backend", "full-stack", "fullstack", "mobile",
    "devops", "cloud", "security", "qa", "machine learning", "ai",
    "software engineer", "developer"
  ];

  for (const role of roles) {
    if (titleLower.includes(role)) {
      if (resumeLower.includes(role)) {
        score += 40;
      }
      break;
    }
  }

  return Math.min(100, score);
}

/**
 * Analyzes resume text against a target job or job description.
 * Applies the documented 0-100 deterministic scoring formula without double-counting penalties.
 *
 * @param {string} resumeText Plain text resume
 * @param {string} jobDescriptionText Target job description text
 * @param {Object} [targetJob] Optional target job record with explicit required/preferred skills
 * @returns {Object} Comprehensive ATS analysis report
 */
export function analyzeATSResume(resumeText, jobDescriptionText, targetJob = null) {
  // Edge Case 1: Empty or Whitespace-only Resume
  if (!resumeText || !resumeText.trim()) {
    return {
      overallMatchScore: 0,
      scoreBreakdown: {
        requiredSkillsScore: 0,
        preferredSkillsScore: 0,
        keywordRelevanceScore: 0,
        alignmentScore: 0,
        readabilityScore: 0,
        penaltyDeducted: 0
      },
      matchedSkills: [],
      missingSkills: [],
      atsReadabilityScore: calculateReadabilityMetrics(""),
      highlightedKeywords: [],
      suggestions: [
        {
          id: "sug_empty",
          type: "critical",
          title: "Empty Resume Content",
          description: "Please enter or paste your resume text to begin ATS match analysis."
        }
      ]
    };
  }

  // Edge Case 2: Empty or Whitespace-only Job Description
  if (!jobDescriptionText || !jobDescriptionText.trim()) {
    const readability = calculateReadabilityMetrics(resumeText);
    return {
      overallMatchScore: 0,
      scoreBreakdown: {
        requiredSkillsScore: 0,
        preferredSkillsScore: 0,
        keywordRelevanceScore: 0,
        alignmentScore: 0,
        readabilityScore: readability.heuristicScore,
        penaltyDeducted: 0
      },
      matchedSkills: [],
      missingSkills: [],
      atsReadabilityScore: readability,
      highlightedKeywords: [],
      suggestions: [
        {
          id: "sug_no_jd",
          type: "critical",
          title: "Missing Job Description",
          description: "Please provide a job description or select a job from Job Explorer."
        }
      ]
    };
  }

  // Synthesize complete job context if targetJob object is provided
  let effectiveJD = jobDescriptionText;
  if (targetJob) {
    effectiveJD = [
      targetJob.title,
      targetJob.company,
      targetJob.location,
      targetJob.description || targetJob.overview,
      (targetJob.skillsRequired || targetJob.requiredSkills || []).join(" "),
      (targetJob.preferredSkills || []).join(" "),
      (targetJob.responsibilities || []).join(" "),
      (targetJob.qualifications || []).join(" ")
    ].filter(Boolean).join("\n\n");
  }

  // 1. SKILL IDENTIFICATION & MATCHING
  let requiredList = [];
  let preferredList = [];

  if (targetJob?.skillsRequired?.length) {
    requiredList = targetJob.skillsRequired;
  } else if (targetJob?.requiredSkills?.length) {
    requiredList = targetJob.requiredSkills;
  }

  if (targetJob?.preferredSkills?.length) {
    preferredList = targetJob.preferredSkills;
  }

  // If no explicit skills provided, extract from JD text using taxonomy
  if (!requiredList.length) {
    const jdSkills = [];
    for (const item of SKILL_TAXONOMY) {
      if (isSkillInText(item.canonical, effectiveJD)) {
        jdSkills.push(item.canonical);
      }
    }
    const half = Math.ceil(jdSkills.length * 0.6);
    requiredList = jdSkills.slice(0, half);
    preferredList = jdSkills.slice(half);
  }

  const matchedSkills = [];
  const missingSkills = [];

  // Match required skills
  let matchedReqCount = 0;
  for (const skill of requiredList) {
    const canonical = normalizeSkill(skill);
    const inResume = isSkillInText(skill, resumeText);
    const inJD = isSkillInText(skill, effectiveJD);

    const regex = buildSkillRegex(skill);
    const resumeMatches = resumeText.match(new RegExp(regex.source, "gi"));
    const countInResume = resumeMatches ? resumeMatches.length : 0;

    const jdMatches = effectiveJD.match(new RegExp(regex.source, "gi"));
    const countInJD = jdMatches ? jdMatches.length : 1;

    const entry = SKILL_TAXONOMY.find((t) => t.canonical.toLowerCase() === canonical.toLowerCase());
    const category = entry ? entry.category : "Technical Skills";

    if (inResume) {
      matchedReqCount++;
      matchedSkills.push({
        name: canonical,
        category,
        isRequired: true,
        isPreferred: false,
        countInResume,
        countInJD
      });
    } else {
      missingSkills.push({
        name: canonical,
        category,
        isRequired: true,
        isPreferred: false,
        priority: "critical"
      });
    }
  }

  // Match preferred skills
  let matchedPrefCount = 0;
  for (const skill of preferredList) {
    const canonical = normalizeSkill(skill);
    if (requiredList.some((r) => normalizeSkill(r).toLowerCase() === canonical.toLowerCase())) {
      continue;
    }

    const inResume = isSkillInText(skill, resumeText);
    const regex = buildSkillRegex(skill);
    const resumeMatches = resumeText.match(new RegExp(regex.source, "gi"));
    const countInResume = resumeMatches ? resumeMatches.length : 0;

    const jdMatches = effectiveJD.match(new RegExp(regex.source, "gi"));
    const countInJD = jdMatches ? jdMatches.length : 1;

    const entry = SKILL_TAXONOMY.find((t) => t.canonical.toLowerCase() === canonical.toLowerCase());
    const category = entry ? entry.category : "Bonus Skills";

    if (inResume) {
      matchedPrefCount++;
      matchedSkills.push({
        name: canonical,
        category,
        isRequired: false,
        isPreferred: true,
        countInResume,
        countInJD
      });
    } else {
      missingSkills.push({
        name: canonical,
        category,
        isRequired: false,
        isPreferred: true,
        priority: "recommended"
      });
    }
  }

  // 2. SUB-SCORES COMPUTATION
  const totalReq = Math.max(1, requiredList.length);
  const requiredSkillsScore = Math.round((matchedReqCount / totalReq) * 100);

  const totalPref = preferredList.length;
  const preferredSkillsScore = totalPref > 0 ? Math.round((matchedPrefCount / totalPref) * 100) : 100;

  // Text / Keyword Relevance
  const resumeTokens = tokenizeText(resumeText);
  const jdTokens = tokenizeText(effectiveJD);
  const keywordRelevanceScore = calculateCosineSimilarity(resumeTokens, jdTokens);

  // Seniority & Title Alignment
  const jobTitle = targetJob?.title || "";
  const experienceLevel = targetJob?.experienceLevel || targetJob?.seniority || "";
  const alignmentScore = calculateRoleAlignment(resumeText, jobTitle, experienceLevel);

  // Readability & Impact Heuristic
  const readability = calculateReadabilityMetrics(resumeText);
  const readabilityScore = readability.heuristicScore;

  // 3. WEIGHTED SCORE CALCULATION
  // Formula:
  // Required Skills (40%), Preferred Skills (20%), Keyword Relevance (20%), Alignment (10%), Readability (10%)
  const weightedScore =
    requiredSkillsScore * 0.40 +
    preferredSkillsScore * 0.20 +
    keywordRelevanceScore * 0.20 +
    alignmentScore * 0.10 +
    readabilityScore * 0.10;

  // 4. MISSING CRITICAL SKILL PENALTY (Consistency without Double Counting)
  // Missing skills are already represented in requiredSkillsScore.
  // We apply a modest penalty of 2 pts per missing critical skill (max 8 pts)
  // to prevent runaway subtraction while maintaining calibration.
  const missingCriticalCount = missingSkills.filter((s) => s.priority === "critical").length;
  const penaltyDeducted = Math.min(8, Math.round(missingCriticalCount * 2));

  // If text is completely unrelated (0 keyword relevance, 0 skills matched), score must be 0
  let finalScore = 0;
  if (keywordRelevanceScore === 0 && matchedSkills.length === 0) {
    finalScore = 0;
  } else {
    finalScore = Math.max(0, Math.min(100, Math.round(weightedScore - penaltyDeducted)));
  }

  // 5. HIGHLIGHTED KEYWORDS
  const sharedTokens = {};
  for (const token of resumeTokens) {
    if (jdTokens.includes(token)) {
      sharedTokens[token] = (sharedTokens[token] || 0) + 1;
    }
  }
  const highlightedKeywords = Object.entries(sharedTokens)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  // 6. ACTIONABLE SUGGESTIONS
  const suggestions = [];

  if (missingCriticalCount > 0) {
    const topMissing = missingSkills
      .filter((s) => s.priority === "critical")
      .slice(0, 3)
      .map((s) => s.name)
      .join(", ");
    suggestions.push({
      id: "sug_crit_skills",
      type: "critical",
      title: "Add Missing Core Skills",
      description: `Your target job specifies core requirements that are not found in your resume: ${topMissing}. If you have experience with these, incorporate them into your work history.`
    });
  }

  if (readability.metricRatio < 0.4 && readability.bulletCount > 0) {
    suggestions.push({
      id: "sug_quantify",
      type: "improvement",
      title: "Quantify Impact with Measurable Metrics",
      description: `Only ${Math.round(readability.metricRatio * 100)}% of your bullet points contain metrics. Increase credibility by adding specific numbers, percentages, or performance results (e.g., 'Reduced page load times by 42%').`
    });
  }

  if (keywordRelevanceScore < 40 && keywordRelevanceScore > 0) {
    suggestions.push({
      id: "sug_keywords",
      type: "improvement",
      title: "Align Job Description Terminology",
      description: "Keyword similarity between your resume and the job description is modest. Mirror relevant industry phrasing and domain concepts used in the job description."
    });
  }

  if (finalScore >= 80) {
    suggestions.push({
      id: "sug_strong",
      type: "positive",
      title: "Excellent Profile Alignment",
      description: "Your background strongly aligns with the target role's core requirements and tech stack. You are in a prime position to apply!"
    });
  }

  return {
    overallMatchScore: finalScore,
    scoreBreakdown: {
      requiredSkillsScore,
      preferredSkillsScore,
      keywordRelevanceScore,
      alignmentScore,
      readabilityScore,
      penaltyDeducted
    },
    matchedSkills,
    missingSkills,
    atsReadabilityScore: readability,
    highlightedKeywords,
    suggestions
  };
}

export default {
  STOP_WORDS,
  tokenizeText,
  countSyllables,
  calculateReadabilityMetrics,
  calculateCosineSimilarity,
  calculateRoleAlignment,
  analyzeATSResume
};
