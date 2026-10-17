/**
 * Technical Skill Taxonomy & Matcher Engine
 * Contains categorized technical skills with canonical names, aliases, and synonyms.
 * Provides safe regex generation to prevent naive substring false-positives
 * (e.g. avoids matching "go" in "good/algorithm", "java" in "javascript", "c" in "cloud/react").
 */

export const SKILL_TAXONOMY = [
  // --- Languages ---
  {
    canonical: "JavaScript",
    category: "Languages",
    aliases: ["javascript", "js", "ecmascript", "es6", "es6+", "es2015", "es2020", "es2022"]
  },
  {
    canonical: "TypeScript",
    category: "Languages",
    aliases: ["typescript", "ts"]
  },
  {
    canonical: "Python",
    category: "Languages",
    aliases: ["python", "python3", "py"]
  },
  {
    canonical: "Go",
    category: "Languages",
    aliases: ["go", "golang"]
  },
  {
    canonical: "Rust",
    category: "Languages",
    aliases: ["rust", "rustlang"]
  },
  {
    canonical: "Java",
    category: "Languages",
    aliases: ["java", "core java"]
  },
  {
    canonical: "C#",
    category: "Languages",
    aliases: ["c#", "csharp", "c-sharp"]
  },
  {
    canonical: "C++",
    category: "Languages",
    aliases: ["c++", "cpp"]
  },
  {
    canonical: "C",
    category: "Languages",
    aliases: ["c language", "ansi c"] // specifically avoid single letter 'c' false positives
  },
  {
    canonical: "PHP",
    category: "Languages",
    aliases: ["php", "php8", "php7"]
  },
  {
    canonical: "Ruby",
    category: "Languages",
    aliases: ["ruby", "ruby on rails", "rails"]
  },
  {
    canonical: "Swift",
    category: "Languages",
    aliases: ["swift", "swift5"]
  },
  {
    canonical: "Kotlin",
    category: "Languages",
    aliases: ["kotlin"]
  },
  {
    canonical: "Dart",
    category: "Languages",
    aliases: ["dart", "dartlang"]
  },
  {
    canonical: "Elixir",
    category: "Languages",
    aliases: ["elixir", "erlang", "otp"]
  },
  {
    canonical: "SQL",
    category: "Languages",
    aliases: ["sql", "ansi sql", "t-sql", "pl/sql"]
  },

  // --- Frontend ---
  {
    canonical: "React",
    category: "Frontend",
    aliases: ["react", "react.js", "reactjs", "react framework"]
  },
  {
    canonical: "Next.js",
    category: "Frontend",
    aliases: ["next.js", "nextjs", "next js", "next"]
  },
  {
    canonical: "Vue",
    category: "Frontend",
    aliases: ["vue", "vue.js", "vuejs", "vue 3", "vue 2", "vue3", "vue2"]
  },
  {
    canonical: "Angular",
    category: "Frontend",
    aliases: ["angular", "angular.js", "angularjs", "angular 2+"]
  },
  {
    canonical: "Svelte",
    category: "Frontend",
    aliases: ["svelte", "sveltekit", "svelte.js"]
  },
  {
    canonical: "HTML5",
    category: "Frontend",
    aliases: ["html5", "html", "semantic html"]
  },
  {
    canonical: "CSS3",
    category: "Frontend",
    aliases: ["css3", "css", "modern css"]
  },
  {
    canonical: "Tailwind CSS",
    category: "Frontend",
    aliases: ["tailwind css", "tailwind", "tailwindcss"]
  },
  {
    canonical: "Redux",
    category: "Frontend",
    aliases: ["redux", "redux toolkit", "rtk", "redux-saga", "redux-thunk"]
  },
  {
    canonical: "Storybook",
    category: "Frontend",
    aliases: ["storybook", "storybook.js"]
  },
  {
    canonical: "Design Systems",
    category: "Frontend",
    aliases: ["design systems", "design system", "ui component library", "component libraries", "design tokens"]
  },
  {
    canonical: "Web Accessibility",
    category: "Frontend",
    aliases: ["web accessibility", "accessibility", "a11y", "wcag", "wcag aa", "aria", "wai-aria", "screen readers"]
  },
  {
    canonical: "Web Performance",
    category: "Frontend",
    aliases: ["web performance", "core web vitals", "lighthouse", "page speed", "web vitals", "code splitting"]
  },
  {
    canonical: "WebSockets",
    category: "Frontend",
    aliases: ["websockets", "websocket", "socket.io", "real-time sync"]
  },
  {
    canonical: "GraphQL",
    category: "Frontend",
    aliases: ["graphql", "apollo client", "relay", "gql"]
  },
  {
    canonical: "Vite",
    category: "Frontend",
    aliases: ["vite", "vitejs", "vite.js"]
  },
  {
    canonical: "Webpack",
    category: "Frontend",
    aliases: ["webpack", "module federation"]
  },

  // --- Backend & Databases ---
  {
    canonical: "Node.js",
    category: "Backend",
    aliases: ["node.js", "nodejs", "node"]
  },
  {
    canonical: "Express.js",
    category: "Backend",
    aliases: ["express.js", "express", "expressjs"]
  },
  {
    canonical: "FastAPI",
    category: "Backend",
    aliases: ["fastapi", "fast-api"]
  },
  {
    canonical: "Django",
    category: "Backend",
    aliases: ["django", "django rest framework", "drf"]
  },
  {
    canonical: "Spring Boot",
    category: "Backend",
    aliases: ["spring boot", "spring framework", "spring-boot", "spring"]
  },
  {
    canonical: ".NET",
    category: "Backend",
    aliases: [".net", ".net core", "asp.net", "asp.net core", "dotnet"]
  },
  {
    canonical: "REST APIs",
    category: "Backend",
    aliases: ["rest apis", "rest api", "restful apis", "restful api", "rest", "restful", "api development"]
  },
  {
    canonical: "Microservices",
    category: "Backend",
    aliases: ["microservices", "microservice architecture", "micro-services", "service-oriented"]
  },
  {
    canonical: "Distributed Systems",
    category: "Backend",
    aliases: ["distributed systems", "distributed computing", "consensus", "raft", "fault tolerance"]
  },
  {
    canonical: "PostgreSQL",
    category: "Databases",
    aliases: ["postgresql", "postgres", "psql", "pg"]
  },
  {
    canonical: "MySQL",
    category: "Databases",
    aliases: ["mysql", "mariadb"]
  },
  {
    canonical: "MongoDB",
    category: "Databases",
    aliases: ["mongodb", "mongo", "nosql"]
  },
  {
    canonical: "Redis",
    category: "Databases",
    aliases: ["redis", "in-memory cache", "redis cluster"]
  },
  {
    canonical: "Kafka",
    category: "Databases",
    aliases: ["kafka", "apache kafka", "event streaming", "event-driven"]
  },
  {
    canonical: "Elasticsearch",
    category: "Databases",
    aliases: ["elasticsearch", "opensearch", "elastic search", "solr"]
  },

  // --- Mobile ---
  {
    canonical: "React Native",
    category: "Mobile",
    aliases: ["react native", "react-native", "rn"]
  },
  {
    canonical: "iOS",
    category: "Mobile",
    aliases: ["ios", "ios development", "cocoa touch", "uikit"]
  },
  {
    canonical: "Android",
    category: "Mobile",
    aliases: ["android", "android development", "android sdk"]
  },
  {
    canonical: "Flutter",
    category: "Mobile",
    aliases: ["flutter", "flutter sdk"]
  },
  {
    canonical: "SwiftUI",
    category: "Mobile",
    aliases: ["swiftui", "swift-ui"]
  },
  {
    canonical: "Jetpack Compose",
    category: "Mobile",
    aliases: ["jetpack compose", "compose"]
  },
  {
    canonical: "Mobile Development",
    category: "Mobile",
    aliases: ["mobile development", "mobile apps", "mobile app", "cross-platform mobile"]
  },

  // --- Cloud & DevOps ---
  {
    canonical: "Docker",
    category: "DevOps",
    aliases: ["docker", "containerization", "containers", "dockerfile", "docker compose"]
  },
  {
    canonical: "Kubernetes",
    category: "DevOps",
    aliases: ["kubernetes", "k8s", "kubectl", "helm"]
  },
  {
    canonical: "AWS",
    category: "Cloud",
    aliases: ["aws", "amazon web services", "amazon aws", "ec2", "s3", "lambda", "cloudwatch"]
  },
  {
    canonical: "GCP",
    category: "Cloud",
    aliases: ["gcp", "google cloud", "google cloud platform"]
  },
  {
    canonical: "Azure",
    category: "Cloud",
    aliases: ["azure", "microsoft azure", "azure cloud"]
  },
  {
    canonical: "Terraform",
    category: "DevOps",
    aliases: ["terraform", "iac", "infrastructure as code"]
  },
  {
    canonical: "CI/CD",
    category: "DevOps",
    aliases: ["ci/cd", "cicd", "continuous integration", "continuous deployment", "github actions", "gitlab ci", "jenkins"]
  },
  {
    canonical: "Linux",
    category: "DevOps",
    aliases: ["linux", "unix", "ubuntu", "debian", "rhel", "centos"]
  },
  {
    canonical: "Git",
    category: "DevOps",
    aliases: ["git", "github", "gitlab", "version control"]
  },
  {
    canonical: "Prometheus",
    category: "DevOps",
    aliases: ["prometheus", "grafana", "observability", "metrics", "opentelemetry"]
  },
  {
    canonical: "SRE / Reliability",
    category: "DevOps",
    aliases: ["sre", "site reliability engineering", "reliability", "slo", "sla", "chaos engineering"]
  },

  // --- AI / Machine Learning ---
  {
    canonical: "Machine Learning",
    category: "AI/ML",
    aliases: ["machine learning", "ml", "statistical learning"]
  },
  {
    canonical: "Deep Learning",
    category: "AI/ML",
    aliases: ["deep learning", "neural networks", "dnn", "cnn", "rnn"]
  },
  {
    canonical: "PyTorch",
    category: "AI/ML",
    aliases: ["pytorch", "torch"]
  },
  {
    canonical: "TensorFlow",
    category: "AI/ML",
    aliases: ["tensorflow", "tf", "keras"]
  },
  {
    canonical: "LLMs",
    category: "AI/ML",
    aliases: ["llms", "llm", "large language models", "foundation models", "gpt", "claude", "llama"]
  },
  {
    canonical: "NLP",
    category: "AI/ML",
    aliases: ["nlp", "natural language processing", "text processing", "tokenization"]
  },
  {
    canonical: "Transformers",
    category: "AI/ML",
    aliases: ["transformers", "hugging face", "huggingface", "attention mechanism", "bert"]
  },
  {
    canonical: "Vector Databases",
    category: "AI/ML",
    aliases: ["vector databases", "vector database", "pinecone", "qdrant", "weaviate", "milvus", "chroma", "embeddings"]
  },
  {
    canonical: "LangChain",
    category: "AI/ML",
    aliases: ["langchain", "llamaindex", "rag", "retrieval augmented generation"]
  },
  {
    canonical: "Computer Vision",
    category: "AI/ML",
    aliases: ["computer vision", "cv", "opencv", "object detection", "image segmentation"]
  },

  // --- Security ---
  {
    canonical: "Application Security",
    category: "Security",
    aliases: ["application security", "appsec", "secure coding", "owasp", "owasp top 10", "sast", "dast"]
  },
  {
    canonical: "Cloud Security",
    category: "Security",
    aliases: ["cloud security", "cspm", "zero trust", "iam security", "least privilege"]
  },
  {
    canonical: "Penetration Testing",
    category: "Security",
    aliases: ["penetration testing", "pen testing", "ethical hacking", "red teaming", "vulnerability assessment"]
  },
  {
    canonical: "Cryptography",
    category: "Security",
    aliases: ["cryptography", "encryption", "public key infrastructure", "pki", "tls", "ssl", "aes", "rsa"]
  },
  {
    canonical: "OAuth / OIDC",
    category: "Security",
    aliases: ["oauth", "oauth2", "oauth 2.0", "oidc", "openid connect", "saml", "sso", "jwt", "tokens"]
  },

  // --- QA & Testing ---
  {
    canonical: "Testing",
    category: "QA",
    aliases: ["testing", "unit testing", "integration testing", "e2e testing", "automated testing", "test automation"]
  },
  {
    canonical: "Jest",
    category: "QA",
    aliases: ["jest", "vitest", "mocha", "chai"]
  },
  {
    canonical: "Cypress",
    category: "QA",
    aliases: ["cypress", "cypress.io"]
  },
  {
    canonical: "Playwright",
    category: "QA",
    aliases: ["playwright", "puppeteer"]
  },
  {
    canonical: "Performance Testing",
    category: "QA",
    aliases: ["performance testing", "load testing", "stress testing", "jmeter", "k6", "locust"]
  }
];

/**
 * Escapes regex special characters in a literal string.
 * @param {string} str
 * @returns {string}
 */
export function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Builds a boundary-safe regular expression for a skill name or alias.
 * Prevents false positives such as matching "go" inside "good" or "Django",
 * "java" in "javascript", "c" in "cloud" or "react".
 *
 * @param {string} term The skill alias
 * @returns {RegExp} Safe word-boundary regular expression
 */
export function buildSkillRegex(term) {
  const trimmed = term.trim().toLowerCase();

  // Special cases for single or short technical terms:
  if (trimmed === "c") {
    // Must not be preceded or followed by alphanumeric or + or #
    return /(?:^|[^a-zA-Z0-9+#])c(?=[^a-zA-Z0-9+#]|$)/i;
  }
  if (trimmed === "go") {
    // Must be exact word "go" - not in "Google", "algorithm", "Django", "good"
    return /(?:^|[^a-zA-Z0-9])go(?=[^a-zA-Z0-9]|$)/i;
  }
  if (trimmed === "r") {
    return /(?:^|[^a-zA-Z0-9])r(?=[^a-zA-Z0-9]|$)/i;
  }
  if (trimmed === "java") {
    // Must not be immediately followed by "script" or other letters
    return /(?:^|[^a-zA-Z0-9])java(?=[^a-zA-Z0-9]|$)/i;
  }
  if (trimmed === "c++" || trimmed === "cpp") {
    return /(?:^|[^a-zA-Z0-9])(?:c\+\+|cpp)(?=[^a-zA-Z0-9]|$)/i;
  }
  if (trimmed === "c#" || trimmed === "csharp") {
    return /(?:^|[^a-zA-Z0-9])(?:c#|csharp)(?=[^a-zA-Z0-9]|$)/i;
  }
  if (trimmed === ".net" || trimmed === "dotnet") {
    return /(?:^|[^a-zA-Z0-9])(?:\.net|dotnet)(?=[^a-zA-Z0-9]|$)/i;
  }

  // General case: word boundaries with punctuation awareness
  const escaped = escapeRegex(trimmed);
  // Match with lookarounds that allow common delimiters (. , / ( ) - +)
  return new RegExp(`(?:^|[^a-zA-Z0-9])${escaped}(?=[^a-zA-Z0-9]|$)`, "i");
}

/**
 * Maps any skill name or alias to its canonical representation in the taxonomy.
 * If not found in the taxonomy, returns the cleaned original name.
 *
 * @param {string} skillName
 * @returns {string} Canonical skill name
 */
export function normalizeSkill(skillName) {
  if (!skillName || typeof skillName !== "string") return "";
  const cleaned = skillName.trim().toLowerCase();

  for (const item of SKILL_TAXONOMY) {
    if (item.canonical.toLowerCase() === cleaned) {
      return item.canonical;
    }
    if (item.aliases.some((alias) => alias.toLowerCase() === cleaned)) {
      return item.canonical;
    }
  }

  return skillName.trim();
}

/**
 * Extracts all taxonomy skills present in the given text.
 * Returns an array of matched skills with canonical name, category, and match count.
 *
 * @param {string} text
 * @returns {Array<{ canonical: string, category: string, count: number }>}
 */
export function extractSkillsFromText(text) {
  if (!text || typeof text !== "string") return [];

  const results = new Map();

  for (const item of SKILL_TAXONOMY) {
    let totalCount = 0;

    // Check canonical name
    const canonicalRegex = buildSkillRegex(item.canonical);
    const canonicalMatches = text.match(new RegExp(canonicalRegex.source, "gi"));
    if (canonicalMatches) {
      totalCount += canonicalMatches.length;
    }

    // Check all aliases
    for (const alias of item.aliases) {
      if (alias.toLowerCase() === item.canonical.toLowerCase()) continue;
      const aliasRegex = buildSkillRegex(alias);
      const aliasMatches = text.match(new RegExp(aliasRegex.source, "gi"));
      if (aliasMatches) {
        totalCount += aliasMatches.length;
      }
    }

    if (totalCount > 0) {
      results.set(item.canonical, {
        canonical: item.canonical,
        category: item.category,
        count: totalCount
      });
    }
  }

  return Array.from(results.values());
}

/**
 * Checks if a specific skill (by canonical or any alias) is present in the text.
 *
 * @param {string} skillName
 * @param {string} text
 * @returns {boolean}
 */
export function isSkillInText(skillName, text) {
  if (!skillName || !text) return false;
  const canonical = normalizeSkill(skillName);

  // Find entry in taxonomy
  const entry = SKILL_TAXONOMY.find(
    (item) => item.canonical.toLowerCase() === canonical.toLowerCase()
  );

  const aliasesToCheck = entry ? [entry.canonical, ...entry.aliases] : [skillName];

  for (const alias of aliasesToCheck) {
    const regex = buildSkillRegex(alias);
    if (regex.test(text)) {
      return true;
    }
  }

  return false;
}

export default {
  SKILL_TAXONOMY,
  buildSkillRegex,
  normalizeSkill,
  extractSkillsFromText,
  isSkillInText
};
