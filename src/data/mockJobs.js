/**
 * JobPulse Mock Jobs Dataset
 * At least 130 realistic developer jobs across 8 engineering specializations:
 * Frontend, Full-Stack, Backend, Mobile, Cloud/DevOps, AI/ML, Security, QA.
 * Every record contains:
 * id, title, company, location, type, experienceLevel, skillsRequired, description, salary
 * along with backward-compatible aliases: workMode, seniority, requiredSkills, overview.
 */

const RAW_JOBS = [
  // ==========================================
  // 1. FRONTEND ROLES (25 jobs: 001 - 025)
  // ==========================================
  {
    id: "job-001",
    title: "Senior Frontend Engineer - Design Systems",
    company: "Stripe",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "JavaScript", "CSS3", "Design Systems", "Web Accessibility"],
    preferredSkills: ["Tailwind CSS", "Storybook", "TypeScript", "Jest", "Figma"],
    description: "Stripe is seeking a Senior Frontend Engineer to build and scale our Core UI Design Systems across all developer and customer portals.",
    responsibilities: [
      "Architect and maintain accessible, high-performance UI primitives used across all product surfaces.",
      "Collaborate with product designers to establish unified tokens and component guidelines.",
      "Improve front-end build pipelines and automated visual regression testing."
    ],
    qualifications: [
      "5+ years building scalable web applications with React.",
      "Deep understanding of DOM rendering performance, web standards, and WCAG AA accessibility.",
      "Strong track record publishing reusable UI component libraries."
    ],
    benefits: ["Health & dental coverage", "Remote office setup stipend", "401(k) matching", "Unlimited PTO"],
    postedDaysAgo: 1
  },
  {
    id: "job-002",
    title: "Lead React Architect",
    company: "Vercel",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React", "Next.js", "JavaScript", "Web Performance", "State Management"],
    preferredSkills: ["Node.js", "Server Components", "Tailwind CSS", "Edge Computing"],
    description: "Drive architectural direction for modern web applications at scale, focusing on Next.js, React Server Components, and zero-runtime CSS.",
    responsibilities: [
      "Define standard patterns for React Server Components and client hydration.",
      "Lead cross-functional RFCs to modernize web performance across global edge networks.",
      "Mentor senior frontend engineers across distributed timezones."
    ],
    qualifications: [
      "7+ years architecting web applications with deep React ecosystem mastery.",
      "Recognized expertise in web vitals (LCP, INP, CLS) and modern bundling tools."
    ],
    benefits: ["Equity options", "Annual team retreats", "Flexible work schedule", "Health insurance"],
    postedDaysAgo: 2
  },
  {
    id: "job-003",
    title: "Junior Frontend Developer",
    company: "Shopify",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Toronto, ON (Remote)",
    salary: { min: 75000, max: 95000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "React", "HTML5", "CSS3", "Git"],
    preferredSkills: ["Tailwind CSS", "Redux", "Jest", "REST APIs"],
    description: "Join Shopify's merchant checkout frontend team, crafting accessible customer experiences that handle millions of global transactions.",
    responsibilities: [
      "Build modular React UI components based on Figma design specifications.",
      "Write unit tests with Jest and React Testing Library to guarantee checkout reliability.",
      "Collaborate with senior developers to triage and patch front-end defects."
    ],
    qualifications: [
      "1+ years of practical React and modern JavaScript experience.",
      "Solid fundamentals in HTML semantics, responsive CSS, and browser DevTools."
    ],
    benefits: ["Mentorship program", "Home office budget", "Health benefits", "Learning stipend"],
    postedDaysAgo: 3
  },
  {
    id: "job-004",
    title: "Mid-Level Frontend Engineer",
    company: "Linear",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Remote Worldwide",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "CSS Architecture", "WebSockets", "State Management"],
    preferredSkills: ["Tailwind CSS", "IndexedDB", "Web Workers", "GraphQL"],
    description: "Help build the fastest project management software in the world with instant offline sync, snappy animations, and 60fps keyboard interactions.",
    responsibilities: [
      "Implement real-time sync UI workflows using local SQLite and WebSocket subscriptions.",
      "Build fluid keyboard navigation and command palette shortcuts.",
      "Optimize canvas and DOM rendering performance for large kanban boards."
    ],
    qualifications: [
      "3+ years of experience with React and complex client-side state.",
      "Passion for micro-interactions, smooth animation, and software craftsmanship."
    ],
    benefits: ["Unlimited time off", "Top-tier hardware", "International remote friendly"],
    postedDaysAgo: 2
  },
  {
    id: "job-005",
    title: "Staff Frontend Infrastructure Engineer",
    company: "Figma",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 215000, max: 275000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["JavaScript", "WebAssembly", "WebGL", "Web Performance", "React"],
    preferredSkills: ["Rust", "C++", "Vite", "Canvas Rendering", "Testing"],
    description: "Scale Figma's collaborative web canvas and browser-based rendering engine to support millions of simultaneous designers worldwide.",
    responsibilities: [
      "Optimize rendering pipelines bridging C++/Rust WebAssembly modules to React UI.",
      "Build developer tooling that reduces CI build times and fast-refreshes local builds.",
      "Architect multi-tab memory management and browser sandbox isolation."
    ],
    qualifications: [
      "8+ years engineering high-performance web applications.",
      "Deep understanding of browser engines, garbage collection, and WebGL."
    ],
    benefits: ["Competitive equity", "Catered daily meals", "Generous parental leave"],
    postedDaysAgo: 4
  },
  {
    id: "job-006",
    title: "Frontend UI/UX Developer",
    company: "Canva",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Austin, TX (Hybrid)",
    salary: { min: 120000, max: 155000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    preferredSkills: ["Framer Motion", "Storybook", "SVG Animation", "Figma"],
    description: "Bring design templates to life with delightful user interactions, vector graphic tools, and responsive layout editors.",
    responsibilities: [
      "Build creative design tool components using React and SVG.",
      "Implement fluid animations with CSS and Framer Motion.",
      "Partner with product designers to prototype creative workflows."
    ],
    qualifications: [
      "3+ years building customer-facing interfaces with React and modern CSS.",
      "High aesthetic standard and eye for visual details."
    ],
    benefits: ["Gym membership", "Wellness allowance", "401(k) matching"],
    postedDaysAgo: 5
  },
  {
    id: "job-007",
    title: "Senior Vue.js Engineer",
    company: "GitLab",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Vue", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    preferredSkills: ["Pinia", "Vuex", "GraphQL", "Jest", "Git"],
    description: "Contribute to GitLab's open-core DevOps platform, building collaborative code review tools with Vue and modern web standards.",
    responsibilities: [
      "Develop diff review and merge request interfaces in Vue.",
      "Migrate legacy pages to modern modular Vue 3 components.",
      "Ensure high accessibility standards across developer tools."
    ],
    qualifications: [
      "5+ years of professional front-end engineering with Vue.js.",
      "Experience working in open-source or distributed remote teams."
    ],
    benefits: ["All-remote culture", "Flexible hours", "Hardware budget"],
    postedDaysAgo: 6
  },
  {
    id: "job-008",
    title: "Junior Web Developer",
    company: "Square",
    category: "Frontend",
    type: "Onsite",
    experienceLevel: "Junior",
    location: "Atlanta, GA (Onsite)",
    salary: { min: 70000, max: 90000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "HTML5", "CSS3", "React", "Git"],
    preferredSkills: ["Tailwind CSS", "Unit Testing", "REST APIs"],
    description: "Build clean, accessible web interfaces for Square's merchant point-of-sale reporting and sales analytics portals.",
    responsibilities: [
      "Implement responsive tables and analytics charts using React.",
      "Write unit tests and verify cross-browser compatibility.",
      "Participate in daily standups and sprint planning."
    ],
    qualifications: [
      "1+ years of web development or strong coding bootcamp portfolio.",
      "Familiarity with modern JavaScript (ES6+), React hooks, and Git."
    ],
    benefits: ["Health coverage", "Onsite dining", "Commuter subsidies"],
    postedDaysAgo: 7
  },
  {
    id: "job-009",
    title: "Senior Web Performance Engineer",
    company: "Cloudflare",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Austin, TX (Remote)",
    salary: { min: 170000, max: 220000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 6,
    skillsRequired: ["JavaScript", "Web Performance", "React", "Network Protocols", "Browser APIs"],
    preferredSkills: ["HTTP/3", "Edge Workers", "Service Workers", "Lighthouse"],
    description: "Diagnose and optimize web performance bottlenecks across billions of monthly web requests on Cloudflare's customer dashboard.",
    responsibilities: [
      "Conduct in-depth profiling of browser rendering, main thread tasks, and network waterfalls.",
      "Implement aggressive code-splitting, resource preloading, and caching strategies.",
      "Build automated synthetic and real-user monitoring (RUM) dashboards."
    ],
    qualifications: [
      "6+ years of front-end experience with specialization in web performance.",
      "Thorough understanding of browser rendering engines and HTTP specifications."
    ],
    benefits: ["Stock grants", "Comprehensive health", "Continuous education"],
    postedDaysAgo: 1
  },
  {
    id: "job-010",
    title: "Frontend Accessibility (a11y) Specialist",
    company: "Atlassian",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Mountain View, CA (Hybrid)",
    salary: { min: 160000, max: 205000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Web Accessibility", "React", "JavaScript", "HTML5", "ARIA"],
    preferredSkills: ["Screen Readers (JAWS/NVDA)", "Storybook", "Jest", "CSS3"],
    description: "Champion digital accessibility across Jira, Confluence, and Atlassian Design System to guarantee equal access for all users.",
    responsibilities: [
      "Audit existing component libraries against WCAG 2.1 AA and Section 508 standards.",
      "Fix keyboard navigation, ARIA live regions, and screen reader compatibility issues.",
      "Educate engineering teams on inclusive frontend architecture practices."
    ],
    qualifications: [
      "5+ years of frontend experience with dedicated accessibility leadership.",
      "Deep knowledge of ARIA specifications and assistive technologies."
    ],
    benefits: ["Health care", "Volunteer leave", "Annual bonus"],
    postedDaysAgo: 3
  },
  {
    id: "job-011",
    title: "Senior Next.js Developer",
    company: "Notion",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 175000, max: 225000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Next.js", "React", "JavaScript", "Tailwind CSS", "REST APIs"],
    preferredSkills: ["GraphQL", "React Server Components", "Vite", "Jest"],
    description: "Scale Notion's web publishing infrastructure, enabling millions of users to turn Notion documents into instant public websites.",
    responsibilities: [
      "Build high-speed static generation (SSG) and incremental revalidation (ISR) pipelines.",
      "Optimize SEO metadata and client rendering performance.",
      "Collaborate with core editor teams to render complex block types cleanly."
    ],
    qualifications: [
      "5+ years with React and deep hands-on expertise with Next.js architecture.",
      "Experience building high-traffic, SEO-critical web applications."
    ],
    benefits: ["Generous equity", "Health stipend", "Remote equipment budget"],
    postedDaysAgo: 4
  },
  {
    id: "job-012",
    title: "Mid Frontend Engineer - Data Viz",
    company: "Datadog",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "New York, NY (Hybrid)",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "D3.js", "Data Visualization", "CSS3"],
    preferredSkills: ["Canvas", "WebGL", "Tailwind CSS", "Performance Profiling"],
    description: "Design and implement high-density metric charts, topology graphs, and interactive heatmaps for cloud monitoring.",
    responsibilities: [
      "Build dynamic charting components using D3 and React handling 100k+ data points.",
      "Ensure smooth pan, zoom, and time-range selection interactions.",
      "Optimize DOM recycling and canvas layers for multi-monitor dashboards."
    ],
    qualifications: [
      "3+ years building data-intensive frontends with React and charting libraries.",
      "Strong grasp of mathematical coordinate systems and SVG/Canvas performance."
    ],
    benefits: ["Catered lunches", "Transit pass", "401(k) match"],
    postedDaysAgo: 5
  },
  {
    id: "job-013",
    title: "Junior React Native & Web Developer",
    company: "Discord",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Junior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 80000, max: 100000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
    preferredSkills: ["React Native", "Tailwind CSS", "WebSockets"],
    description: "Help Discord create seamless chat and voice connection interfaces across web and embedded desktop webviews.",
    responsibilities: [
      "Implement interactive chat components, emoji pickers, and user status widgets.",
      "Write clean, maintainable JSX and unit tests.",
      "Fix bugs reported in community beta channels."
    ],
    qualifications: [
      "1+ years coding with React and modern JavaScript.",
      "Excitement for building friendly online community spaces."
    ],
    benefits: ["Free Discord Nitro", "Remote office setup", "Healthcare"],
    postedDaysAgo: 2
  },
  {
    id: "job-014",
    title: "Senior Micro-Frontends Engineer",
    company: "PayPal",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "San Jose, CA (Hybrid)",
    salary: { min: 160000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 6,
    skillsRequired: ["React", "JavaScript", "Module Federation", "Webpack", "CSS3"],
    preferredSkills: ["Vite", "Node.js", "Docker", "CI/CD"],
    description: "Architect distributed micro-frontend applications that allow dozens of autonomous checkout teams to deploy safely without downtime.",
    responsibilities: [
      "Implement Webpack Module Federation contracts across legacy and modern apps.",
      "Establish governance, shared dependency registries, and runtime sandbox boundaries.",
      "Reduce checkout latency across 200+ global markets."
    ],
    qualifications: [
      "6+ years in frontend development with large-scale enterprise micro-frontend experience.",
      "Expert knowledge of bundlers, asset caching, and semantic versioning."
    ],
    benefits: ["Stock purchase plan", "Tuition reimbursement", "Comprehensive health"],
    postedDaysAgo: 7
  },
  {
    id: "job-015",
    title: "Lead Frontend Systems Engineer",
    company: "Airbnb",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 200000, max: 260000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React", "JavaScript", "Design Systems", "Web Performance", "State Management"],
    preferredSkills: ["Tailwind CSS", "GraphQL", "Storybook", "Jest"],
    description: "Lead the evolution of Airbnb's guest checkout and host management web platforms, setting architectural benchmarks for product teams.",
    responsibilities: [
      "Drive architectural roadmaps for search result filtering, calendar booking, and payment flows.",
      "Establish cross-platform design token synchronization between Web, iOS, and Android.",
      "Mentor principal and senior engineers across multiple product pods."
    ],
    qualifications: [
      "7+ years leading frontend engineering in consumer-facing digital products.",
      "Exceptional communication and technical writing skills."
    ],
    benefits: ["Annual travel credits", "Health and wellness stipend", "401(k) matching"],
    postedDaysAgo: 3
  },
  {
    id: "job-016",
    title: "Frontend Engineer - Growth & Experimentation",
    company: "Dropbox",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Seattle, WA (Remote)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "A/B Testing", "HTML5", "CSS3"],
    preferredSkills: ["Analytics", "Tailwind CSS", "REST APIs", "Jest"],
    description: "Build, launch, and evaluate viral growth funnels, onboarding checklists, and conversion-optimized landing pages.",
    responsibilities: [
      "Implement high-velocity A/B tests using statistical experimentation platforms.",
      "Build lightweight, responsive landing pages that achieve sub-second load times.",
      "Collaborate with product managers and data scientists on conversion metrics."
    ],
    qualifications: [
      "3+ years building web applications with React.",
      "Proven experience running client-side and server-side growth experiments."
    ],
    benefits: ["Remote work stipend", "Mental health support", "Parental leave"],
    postedDaysAgo: 8
  },
  {
    id: "job-017",
    title: "Senior Angular Engineer",
    company: "Cisco",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Raleigh, NC (Hybrid)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Angular", "JavaScript", "RxJS", "CSS3", "HTML5"],
    preferredSkills: ["NgRx", "REST APIs", "Jest", "Micro-frontends"],
    description: "Build enterprise network monitoring and cloud security management portals used by thousands of IT administrators.",
    responsibilities: [
      "Develop modular Angular components utilizing RxJS reactive state streams.",
      "Integrate complex telemetry REST and WebSocket feeds into real-time tables.",
      "Maintain high unit test coverage with Karma and Jest."
    ],
    qualifications: [
      "5+ years with modern Angular (v12+) and reactive programming.",
      "Strong architectural discipline around dependency injection and lazy-loaded modules."
    ],
    benefits: ["Pension plan", "Flexible Fridays", "Healthcare"],
    postedDaysAgo: 6
  },
  {
    id: "job-018",
    title: "Junior UI Developer",
    company: "Etsy",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Brooklyn, NY (Remote)",
    salary: { min: 72000, max: 92000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "HTML5", "CSS3", "React", "Git"],
    preferredSkills: ["Sass", "Responsive Design", "Accessibility"],
    description: "Help Etsy empower millions of independent creators by polishing seller dashboard interfaces and product listing editors.",
    responsibilities: [
      "Implement responsive seller listing forms with real-time field validation.",
      "Audit seller pages for mobile responsiveness and color contrast compliance.",
      "Pair with senior engineers on component test automation."
    ],
    qualifications: [
      "1+ years hands-on frontend development experience.",
      "Strong grasp of semantic HTML, responsive CSS, and modern JavaScript."
    ],
    benefits: ["Crafting stipend", "Generous parental leave", "Health insurance"],
    postedDaysAgo: 5
  },
  {
    id: "job-019",
    title: "Senior Frontend Svelte Engineer",
    company: "Brave Software",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Svelte", "JavaScript", "HTML5", "CSS3", "Web APIs"],
    preferredSkills: ["SvelteKit", "Tailwind CSS", "Vite", "Cryptography"],
    description: "Build blazing-fast privacy dashboards and decentralized Web3 browser features utilizing lightweight Svelte components.",
    responsibilities: [
      "Design zero-overhead UI components that consume minimal browser memory.",
      "Integrate browser crypto and local storage privacy primitives.",
      "Ensure snappy 60fps interaction on low-powered mobile devices."
    ],
    qualifications: [
      "5+ years frontend experience with dedicated Svelte or reactive compiler mastery.",
      "Strong passion for user privacy, encryption, and open web standards."
    ],
    benefits: ["Crypto options", "Hardware stipend", "Flexible time off"],
    postedDaysAgo: 4
  },
  {
    id: "job-020",
    title: "Mid-Level Frontend Developer - Search UI",
    company: "Pinterest",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "CSS3", "REST APIs", "State Management"],
    preferredSkills: ["Tailwind CSS", "GraphQL", "Jest", "Infinite Scroll"],
    description: "Deliver smooth visual search exploration, dynamic image masonry grids, and personalized recommendation feeds for 500M users.",
    responsibilities: [
      "Build virtualized masonry grid layouts with smooth infinite scrolling.",
      "Implement debounced query suggestions and visual keyword filters.",
      "Profile and optimize memory consumption during long scroll sessions."
    ],
    qualifications: [
      "3+ years with React and modern state management libraries.",
      "Experience optimizing DOM reflows and virtualized lists."
    ],
    benefits: ["Catered lunches", "401(k) matching", "Health coverage"],
    postedDaysAgo: 2
  },
  {
    id: "job-021",
    title: "Staff Design Systems Architect",
    company: "Uber",
    category: "Frontend",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "Sunnyvale, CA (Onsite)",
    salary: { min: 210000, max: 270000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["React", "JavaScript", "Design Systems", "Web Accessibility", "Testing"],
    preferredSkills: ["Storybook", "TypeScript", "Tailwind CSS", "Figma API"],
    description: "Direct the global evolution of Uber's Base Web design system, powering rider, driver, and merchant portals across 70 countries.",
    responsibilities: [
      "Architect multi-brand theming engines and accessible UI component primitives.",
      "Establish automated visual regression test suites executing in CI.",
      "Partner with executive design leaders to align design tokens across platforms."
    ],
    qualifications: [
      "8+ years leading design systems engineering for complex global platforms.",
      "Deep expertise in WCAG AAA compliance, token pipelines, and component API design."
    ],
    benefits: ["Uber ride credits", "Onsite gym and meals", "Generous equity grant"],
    postedDaysAgo: 3
  },
  {
    id: "job-022",
    title: "Frontend Developer - Core App",
    company: "Slack",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Denver, CO (Remote)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "JavaScript", "State Management", "HTML5", "CSS3"],
    preferredSkills: ["Redux", "WebSockets", "Jest", "Electron"],
    description: "Craft everyday messaging features, threads, emoji reactions, and notification preferences inside Slack's core web application.",
    responsibilities: [
      "Build real-time message editing, formatting, and reaction workflows.",
      "Optimize client-side Redux store normalization for high-traffic channels.",
      "Write thorough integration tests with React Testing Library."
    ],
    qualifications: [
      "3+ years building desktop-class web applications with React.",
      "Strong understanding of asynchronous state synchronization and optimistic updates."
    ],
    benefits: ["Wellness reimbursement", "Comprehensive health", "Home office stipend"],
    postedDaysAgo: 1
  },
  {
    id: "job-023",
    title: "Junior Frontend Engineer - Component Library",
    company: "Zendesk",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Madison, WI (Hybrid)",
    salary: { min: 68000, max: 88000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
    preferredSkills: ["Storybook", "Jest", "Tailwind CSS"],
    description: "Help build and document Zendesk's Garden design system components used by customer service agents worldwide.",
    responsibilities: [
      "Develop button, modal, form input, and dropdown primitives in React.",
      "Write interactive Storybook documentation stories with live code examples.",
      "Verify keyboard navigation and focus management across components."
    ],
    qualifications: [
      "1+ years experience building web components with React.",
      "Commitment to clean code, component modularity, and testing."
    ],
    benefits: ["Mentorship program", "Health insurance", "Tuition assistance"],
    postedDaysAgo: 4
  },
  {
    id: "job-024",
    title: "Senior React Developer - E-Commerce",
    company: "Target",
    category: "Frontend",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Minneapolis, MN (Hybrid)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "JavaScript", "HTML5", "CSS3", "Web Performance"],
    preferredSkills: ["Next.js", "Redux", "Jest", "Tailwind CSS"],
    description: "Build ultra-reliable shopping cart, promotional banner, and same-day delivery pickup flows for Target.com.",
    responsibilities: [
      "Re-engineer shopping bag checkout flows to achieve sub-second transaction times.",
      "Implement real-time store inventory lookups with client-side caching.",
      "Monitor error budgets and resolve critical production defects."
    ],
    qualifications: [
      "5+ years engineering high-volume e-commerce web applications with React.",
      "Solid knowledge of web analytics, A/B testing, and client performance monitoring."
    ],
    benefits: ["Target employee discount", "401(k) matching", "Health coverage"],
    postedDaysAgo: 5
  },
  {
    id: "job-025",
    title: "Lead Frontend Engineer - Audio & Video",
    company: "Spotify",
    category: "Frontend",
    type: "Remote",
    experienceLevel: "Lead",
    location: "New York, NY (Remote)",
    salary: { min: 190000, max: 245000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React", "JavaScript", "Web Audio API", "Web Performance", "State Management"],
    preferredSkills: ["WebRTC", "Canvas", "Tailwind CSS", "Jest"],
    description: "Lead the frontend team responsible for the Spotify Web Player, lyrics synchronization, and collaborative listening sessions.",
    responsibilities: [
      "Architect low-latency Web Audio API playback pipelines and buffer management.",
      "Lead cross-functional engineering pods building synchronized lyrics and podcast video.",
      "Establish frontend telemetry and error reporting standards across web clients."
    ],
    qualifications: [
      "7+ years architecting complex multimedia web applications with React.",
      "Deep understanding of browser media buffering, DRM pipelines, and web vitals."
    ],
    benefits: ["Free Spotify Premium", "Global remote flexibility", "Parental leave"],
    postedDaysAgo: 2
  },

  // ==========================================
  // 2. FULL-STACK ROLES (25 jobs: 026 - 050)
  // ==========================================
  {
    id: "job-026",
    title: "Senior Full-Stack Engineer",
    company: "Coinbase",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 175000, max: 230000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "Node.js", "JavaScript", "PostgreSQL", "REST APIs"],
    preferredSkills: ["Docker", "Redis", "AWS", "GraphQL", "WebSockets"],
    description: "Build secure, compliant cryptocurrency trading, staking, and wallet management features processing billions in daily volume.",
    responsibilities: [
      "Design resilient backend REST endpoints and reactive frontend trading dashboards.",
      "Ensure strict cryptographic verification and idempotent transaction handling.",
      "Scale PostgreSQL database queries for concurrent real-time order books."
    ],
    qualifications: [
      "5+ years developing full-stack applications with React, Node.js, and SQL.",
      "Proven track record securing financial transactions and handling sensitive data."
    ],
    benefits: ["Crypto matching", "Home office stipend", "Full health coverage"],
    postedDaysAgo: 1
  },
  {
    id: "job-027",
    title: "Fullstack Cloud Engineer",
    company: "Datadog",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "New York, NY (Hybrid)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "Node.js", "SQL", "REST APIs", "Git"],
    preferredSkills: ["PostgreSQL", "Docker", "AWS", "Redis"],
    description: "Datadog is looking for a Fullstack Engineer to build real-time observability dashboards and telemetry stream processors.",
    responsibilities: [
      "Develop high-throughput dashboard widgets displaying streaming metrics.",
      "Design reliable REST and GraphQL endpoints backed by PostgreSQL and Redis.",
      "Optimize frontend data-table rendering for tens of thousands of data points."
    ],
    qualifications: [
      "3+ years of professional fullstack engineering experience.",
      "Proficiency with modern JavaScript, Node.js, and relational databases."
    ],
    benefits: ["Competitive base salary with equity", "Commuter benefits", "Continuous learning budget"],
    postedDaysAgo: 2
  },
  {
    id: "job-028",
    title: "Junior Full-Stack Web Developer",
    company: "HubSpot",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Boston, MA (Hybrid)",
    salary: { min: 78000, max: 98000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "React", "Node.js", "HTML5", "CSS3"],
    preferredSkills: ["PostgreSQL", "REST APIs", "Git", "Jest"],
    description: "Join HubSpot's CRM workflow automation team, helping small businesses build dynamic sales emails and customer journeys.",
    responsibilities: [
      "Develop interactive email drag-and-drop builders in React.",
      "Write Express.js API endpoints to trigger automated customer communications.",
      "Ensure relational database updates are transactional and well-tested."
    ],
    qualifications: [
      "1+ years of full-stack JavaScript (React & Node.js) development.",
      "Solid understanding of relational database models and REST fundamentals."
    ],
    benefits: ["Tuition reimbursement", "Unlimited vacation", "Healthcare"],
    postedDaysAgo: 4
  },
  {
    id: "job-029",
    title: "Lead Full-Stack Architect",
    company: "GitHub",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Remote Worldwide",
    salary: { min: 205000, max: 265000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React", "Node.js", "JavaScript", "PostgreSQL", "System Design"],
    preferredSkills: ["Ruby on Rails", "Docker", "Kubernetes", "GraphQL", "Redis"],
    description: "Lead technical architecture for GitHub Issues, Projects, and Discussions used by over 100 million software developers.",
    responsibilities: [
      "Lead cross-team technical architecture for real-time collaborative issue tracking.",
      "Drive database partitioning and caching strategies across global regions.",
      "Mentor senior engineers on reliable API versioning and zero-downtime migrations."
    ],
    qualifications: [
      "7+ years building and scaling large-scale web platforms.",
      "Demonstrated ability to balance deep backend distributed systems with rich frontend ergonomics."
    ],
    benefits: ["Health coverage", "Annual wellness stipend", "Retirement 401(k) match"],
    postedDaysAgo: 3
  },
  {
    id: "job-030",
    title: "Staff Full-Stack Engineer - Collaboration",
    company: "Miro",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Staff",
    location: "Austin, TX (Remote)",
    salary: { min: 210000, max: 270000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["React", "Node.js", "JavaScript", "WebSockets", "System Design"],
    preferredSkills: ["PostgreSQL", "Redis", "Docker", "Canvas", "Microservices"],
    description: "Scale Miro's live whiteboard collaboration infrastructure, supporting thousands of concurrent cursors, stickies, and diagram objects.",
    responsibilities: [
      "Design distributed CRDT/OT synchronization engines for live collaborative editing.",
      "Build lightweight React frontend widgets that interface smoothly with HTML5 Canvas.",
      "Architect Redis pub/sub routing layers handling millions of real-time events."
    ],
    qualifications: [
      "8+ years of full-stack engineering with real-time multi-user web systems.",
      "Deep understanding of conflict resolution algorithms and distributed state."
    ],
    benefits: ["Equity options", "WFH setup stipend", "Generous PTO"],
    postedDaysAgo: 5
  },
  {
    id: "job-031",
    title: "Full-Stack Python/React Developer",
    company: "Instacart",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Mid",
    location: "San Francisco, CA (Remote)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "React", "JavaScript", "PostgreSQL", "REST APIs"],
    preferredSkills: ["Django", "FastAPI", "Tailwind CSS", "Docker", "Redis"],
    description: "Build full-stack catalog navigation, smart replacement suggestions, and driver dispatch coordination portals.",
    responsibilities: [
      "Develop responsive customer grocery cart interfaces with React.",
      "Implement performant backend catalog search endpoints in Python (Django/FastAPI).",
      "Write automated tests and monitor API latency in production."
    ],
    qualifications: [
      "3+ years building web applications with Python backend and React frontend.",
      "Comfort with PostgreSQL query tuning and async API design."
    ],
    benefits: ["Instacart+ membership", "Health benefits", "401(k) match"],
    postedDaysAgo: 2
  },
  {
    id: "job-032",
    title: "Senior Full-Stack Next.js & Supabase Engineer",
    company: "Supabase",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Next.js", "React", "PostgreSQL", "JavaScript", "SQL"],
    preferredSkills: ["Node.js", "Tailwind CSS", "Docker", "Go", "Git"],
    description: "Develop open-source cloud database management portals, SQL query runners, and authentication dashboards for Supabase.",
    responsibilities: [
      "Build developer-friendly database schema editors and real-time log viewers in Next.js.",
      "Optimize complex PostgreSQL metadata inspection queries.",
      "Contribute to open-source UI libraries and developer documentation."
    ],
    qualifications: [
      "5+ years of full-stack engineering with deep relational database expertise.",
      "Active contributor to open-source developer tooling."
    ],
    benefits: ["100% remote worldwide", "Hardware allowance", "Unlimited vacation"],
    postedDaysAgo: 1
  },
  {
    id: "job-033",
    title: "Mid Full-Stack Engineer - Billing & Payments",
    company: "Twilio",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Denver, CO (Hybrid)",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Node.js", "React", "JavaScript", "SQL", "REST APIs"],
    preferredSkills: ["PostgreSQL", "Stripe API", "Docker", "Jest"],
    description: "Build robust invoice calculation, payment method management, and usage credit telemetry systems for enterprise Twilio accounts.",
    responsibilities: [
      "Implement automated invoice generation microservices in Node.js.",
      "Design intuitive billing dashboard interfaces and payment history views with React.",
      "Maintain PCI-DSS security compliance across all payment flows."
    ],
    qualifications: [
      "3+ years full-stack experience handling mission-critical business transactions.",
      "Strong discipline with unit and end-to-end test coverage."
    ],
    benefits: ["Twilio stock grants", "Wellness credits", "Health insurance"],
    postedDaysAgo: 6
  },
  {
    id: "job-034",
    title: "Junior MERN Stack Developer",
    company: "Vimeo",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Junior",
    location: "New York, NY (Remote)",
    salary: { min: 74000, max: 94000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["React", "Node.js", "JavaScript", "MongoDB", "REST APIs"],
    preferredSkills: ["Express.js", "HTML5", "CSS3", "Git"],
    description: "Support video upload portals, user permission management, and interactive video player overlays.",
    responsibilities: [
      "Build upload progress bars and video metadata forms in React.",
      "Write Express.js controllers and MongoDB aggregation pipelines.",
      "Fix user-reported issues in customer support feedback queues."
    ],
    qualifications: [
      "1+ years experience with the MERN stack (MongoDB, Express, React, Node.js).",
      "Familiarity with Git branching, pull requests, and responsive styling."
    ],
    benefits: ["Video subscription", "Health coverage", "Remote work stipend"],
    postedDaysAgo: 7
  },
  {
    id: "job-035",
    title: "Senior Full-Stack Go/React Engineer",
    company: "HashiCorp",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Seattle, WA (Remote)",
    salary: { min: 170000, max: 220000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Go", "React", "JavaScript", "REST APIs", "Docker"],
    preferredSkills: ["Kubernetes", "PostgreSQL", "Tailwind CSS", "Terraform"],
    description: "Build web control planes and API interfaces for cloud infrastructure provisioning products like Terraform Cloud and Vault.",
    responsibilities: [
      "Build high-throughput API microservices in Go.",
      "Develop responsive infrastructure topology and policy dashboards in React.",
      "Coordinate zero-downtime database migrations on PostgreSQL."
    ],
    qualifications: [
      "5+ years developing full-stack distributed systems with Go and React.",
      "Strong understanding of infrastructure-as-code principles and cloud security."
    ],
    benefits: ["Remote work culture", "Health and dental", "401(k) matching"],
    postedDaysAgo: 3
  },
  {
    id: "job-036",
    title: "Full-Stack Developer - Growth Pod",
    company: "Duolingo",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Pittsburgh, PA (Hybrid)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "React", "JavaScript", "SQL", "A/B Testing"],
    preferredSkills: ["PostgreSQL", "Tailwind CSS", "Docker", "REST APIs"],
    description: "Drive user retention and viral streaks on the world's most downloaded education platform through rapid product experimentation.",
    responsibilities: [
      "Create gamified learning reward interfaces using React and CSS animations.",
      "Implement backend user streak logic and notification triggers in Python.",
      "Analyze experiment cohorts to optimize learning conversion."
    ],
    qualifications: [
      "3+ years full-stack development experience with React and Python.",
      "Enthusiasm for gamification, rapid iteration, and user behavior metrics."
    ],
    benefits: ["Free language lessons", "Daily catered lunches", "Generous parental leave"],
    postedDaysAgo: 4
  },
  {
    id: "job-037",
    title: "Staff Full-Stack Engineer - Internal Tools",
    company: "Netflix",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "Los Gatos, CA (Hybrid)",
    salary: { min: 230000, max: 310000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["React", "Node.js", "JavaScript", "System Design", "PostgreSQL"],
    preferredSkills: ["GraphQL", "Docker", "Microservices", "AWS"],
    description: "Architect studio production management and digital asset delivery pipelines used by thousands of Hollywood filmmakers.",
    responsibilities: [
      "Design full-stack asset workflow orchestrators handling terabytes of raw video footage.",
      "Build complex visual timeline editors and asset metadata managers with React.",
      "Partner with studio executives to streamline production budgeting workflows."
    ],
    qualifications: [
      "8+ years architecting enterprise-grade full-stack web platforms.",
      "Outstanding system design capabilities and autonomy."
    ],
    benefits: ["Top-of-market compensation", "All-inclusive health", "Flexible vacation"],
    postedDaysAgo: 2
  },
  {
    id: "job-038",
    title: "Senior Full-Stack Ruby/React Developer",
    company: "Basecamp",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 160000, max: 200000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "JavaScript", "Ruby on Rails", "SQL", "HTML5"],
    preferredSkills: ["PostgreSQL", "Hotwire", "CSS3", "REST APIs"],
    description: "Build calm, straightforward project management and team collaboration tools with clean code and no corporate fluff.",
    responsibilities: [
      "Build responsive task boards, message boards, and file vaults.",
      "Optimize Rails backend database queries and caching layers.",
      "Maintain exceptional software stability and high automated test coverage."
    ],
    qualifications: [
      "5+ years of full-stack engineering with Rails and modern JavaScript/React.",
      "Deep appreciation for clean, maintainable architecture and clear prose."
    ],
    benefits: ["4-day summer workweeks", "Annual sabbatical", "Generous health"],
    postedDaysAgo: 5
  },
  {
    id: "job-039",
    title: "Junior Full-Stack Engineer",
    company: "Brex",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Junior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 82000, max: 102000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["React", "Node.js", "JavaScript", "SQL", "Git"],
    preferredSkills: ["PostgreSQL", "Tailwind CSS", "REST APIs"],
    description: "Help Brex build intuitive expense reimbursement and corporate credit card portals for high-growth tech startups.",
    responsibilities: [
      "Develop receipt capture and expense tagging interfaces in React.",
      "Implement transactional backend REST endpoints in Node.js.",
      "Write unit and integration tests to prevent billing regressions."
    ],
    qualifications: [
      "1+ years of full-stack JavaScript development.",
      "Attention to detail and appreciation for clean financial user experiences."
    ],
    benefits: ["Home office allowance", "Health coverage", "Equity grants"],
    postedDaysAgo: 3
  },
  {
    id: "job-040",
    title: "Lead Full-Stack Web Platform Engineer",
    company: "Zillow",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Seattle, WA (Remote)",
    salary: { min: 190000, max: 240000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React", "Node.js", "JavaScript", "PostgreSQL", "System Design"],
    preferredSkills: ["GraphQL", "AWS", "Docker", "Next.js"],
    description: "Lead technical direction for home search maps, mortgage calculators, and real-time tour booking systems.",
    responsibilities: [
      "Architect microservice APIs coordinating MLS real estate data feeds.",
      "Lead frontend engineers building interactive map filters and property listing pages.",
      "Establish engineering best practices and maintain 99.95% system uptime."
    ],
    qualifications: [
      "7+ years leading full-stack engineering initiatives on consumer web platforms.",
      "Strong background in geospatial queries, caching, and GraphQL federation."
    ],
    benefits: ["Comprehensive medical", "401(k) retirement matching", "Remote stipend"],
    postedDaysAgo: 6
  },
  {
    id: "job-041",
    title: "Mid-Level Full-Stack Developer",
    company: "Grammarly",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Mid",
    location: "New York, NY (Remote)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React", "Node.js", "JavaScript", "REST APIs", "CSS3"],
    preferredSkills: ["PostgreSQL", "WebSockets", "Docker", "Tailwind CSS"],
    description: "Build user-facing writing suggestion popovers, analytics reports, and enterprise team tone dashboards.",
    responsibilities: [
      "Develop rich text editor overlays and grammatical suggestion panels in React.",
      "Build high-throughput Node.js microservices processing language telemetry.",
      "Ensure ultra-low latency response times during real-time document typing."
    ],
    qualifications: [
      "3+ years full-stack development experience.",
      "Experience optimizing client-side DOM interactions and streaming APIs."
    ],
    benefits: ["Remote work setup", "Learning budget", "Health insurance"],
    postedDaysAgo: 1
  },
  {
    id: "job-042",
    title: "Full-Stack Engineer - Marketplace",
    company: "DoorDash",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 170000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "Node.js", "JavaScript", "PostgreSQL", "Redis"],
    preferredSkills: ["Go", "Kafka", "Docker", "Kubernetes"],
    description: "Build real-time restaurant menu management, live order tracking maps, and merchant analytics portals.",
    responsibilities: [
      "Build high-volume order ingestion microservices in Node.js and Go.",
      "Develop live map tracking interfaces displaying courier locations in React.",
      "Design database schema migrations for millions of restaurant menus."
    ],
    qualifications: [
      "5+ years developing full-stack web applications handling high transaction volumes.",
      "Solid knowledge of event-driven architectures and Redis caching."
    ],
    benefits: ["DoorDash food credits", "Health care", "Stock options"],
    postedDaysAgo: 4
  },
  {
    id: "job-043",
    title: "Junior Full-Stack Web Developer",
    company: "Automattic (WordPress.com)",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Remote Worldwide",
    salary: { min: 70000, max: 90000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "React", "PHP", "HTML5", "CSS3"],
    preferredSkills: ["MySQL", "REST APIs", "Git"],
    description: "Work on Gutenberg block editor features, site themes, and publishing tools powering 40% of the open web.",
    responsibilities: [
      "Build block components in React for WordPress.com users.",
      "Implement REST API endpoints in PHP for theme customization.",
      "Fix bugs and improve documentation for third-party plugin authors."
    ],
    qualifications: [
      "1+ years of web development experience with React and backend scripting.",
      "Passion for open-source software and remote communication."
    ],
    benefits: ["Work from anywhere", "Open vacation policy", "Home office stipend"],
    postedDaysAgo: 7
  },
  {
    id: "job-044",
    title: "Senior Full-Stack Developer - Security Tools",
    company: "Okta",
    category: "Full-Stack",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "San Jose, CA (Hybrid)",
    salary: { min: 165000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "Node.js", "JavaScript", "OAuth / OIDC", "PostgreSQL"],
    preferredSkills: ["Docker", "REST APIs", "AWS", "Jest"],
    description: "Build enterprise single sign-on (SSO), multi-factor authentication (MFA), and identity governance administrator consoles.",
    responsibilities: [
      "Develop security policy rule builders and user directory tables in React.",
      "Implement SAML/OAuth authorization flows and audit log microservices in Node.js.",
      "Ensure zero security vulnerabilities through rigorous code reviews and threat modeling."
    ],
    qualifications: [
      "5+ years full-stack experience with deep knowledge of authentication protocols.",
      "Strong understanding of web security fundamentals (CSRF, XSS, CSP)."
    ],
    benefits: ["Competitive equity", "Health and vision", "Commuter benefits"],
    postedDaysAgo: 2
  },
  {
    id: "job-045",
    title: "Staff Full-Stack Engineer - Cloud Portal",
    company: "Snowflake",
    category: "Full-Stack",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "Bellevue, WA (Onsite)",
    salary: { min: 220000, max: 280000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["React", "Node.js", "JavaScript", "SQL", "System Design"],
    preferredSkills: ["PostgreSQL", "Docker", "Kubernetes", "WebSockets"],
    description: "Architect Snowflake's Snowsight web portal, enabling data engineers to query petabytes of warehouse data with instant feedback.",
    responsibilities: [
      "Design web SQL worksheets, execution plan visualizers, and interactive dashboards.",
      "Build high-throughput backend services connecting browser sessions to warehouse clusters.",
      "Lead performance optimization for queries streaming hundreds of thousands of rows."
    ],
    qualifications: [
      "8+ years of full-stack engineering with deep database and systems architecture knowledge.",
      "Track record of shipping mission-critical enterprise cloud portals."
    ],
    benefits: ["Generous stock options", "Onsite dining", "Comprehensive medical"],
    postedDaysAgo: 5
  },
  {
    id: "job-046",
    title: "Mid Full-Stack Engineer - Integrations",
    company: "Zapier",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Remote Worldwide",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "React", "JavaScript", "REST APIs", "SQL"],
    preferredSkills: ["PostgreSQL", "Docker", "Node.js", "Git"],
    description: "Connect over 5,000 SaaS web applications through automated webhooks, trigger monitors, and visual workflow builders.",
    responsibilities: [
      "Build visual branching logic builders in React.",
      "Implement asynchronous webhook processing pipelines in Python.",
      "Maintain third-party API connector stability and automated rate-limiting."
    ],
    qualifications: [
      "3+ years full-stack experience integrating third-party APIs.",
      "Experience with asynchronous task queues and idempotent event processing."
    ],
    benefits: ["100% remote", "Annual company retreats", "Health & retirement"],
    postedDaysAgo: 3
  },
  {
    id: "job-047",
    title: "Lead Full-Stack Developer - FinTech",
    company: "Affirm",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Chicago, IL (Remote)",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Python", "React", "JavaScript", "PostgreSQL", "System Design"],
    preferredSkills: ["Docker", "AWS", "Redis", "Microservices"],
    description: "Lead engineering for Affirm's point-of-sale loan underwriting, merchant integration SDKs, and transparent customer repayment portals.",
    responsibilities: [
      "Architect full-stack lending workflows that evaluate credit risk in real time.",
      "Lead development of embeddable merchant checkout modals in React.",
      "Ensure regulatory compliance and high-availability database replication."
    ],
    qualifications: [
      "7+ years full-stack development experience, preferably in FinTech or e-commerce.",
      "Proven leadership in system design, database indexing, and fault-tolerant architecture."
    ],
    benefits: ["Remote work budget", "401(k) match", "Parental leave"],
    postedDaysAgo: 6
  },
  {
    id: "job-048",
    title: "Junior Full-Stack Engineer",
    company: "Asana",
    category: "Full-Stack",
    type: "Onsite",
    experienceLevel: "Junior",
    location: "San Francisco, CA (Onsite)",
    salary: { min: 80000, max: 100000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "React", "Node.js", "SQL", "HTML5"],
    preferredSkills: ["PostgreSQL", "CSS3", "Git", "REST APIs"],
    description: "Contribute to project task boards, calendar timelines, and automated rule builders on Asana's core product team.",
    responsibilities: [
      "Implement drag-and-drop task card interactions in React.",
      "Write clean Node.js endpoint handlers and database query helpers.",
      "Participate in agile sprints, code reviews, and architectural workshops."
    ],
    qualifications: [
      "1+ years of full-stack JavaScript experience.",
      "Eager to learn from seasoned engineers in an inclusive team culture."
    ],
    benefits: ["Catered lunches", "Gym reimbursement", "Healthcare"],
    postedDaysAgo: 4
  },
  {
    id: "job-049",
    title: "Senior Full-Stack Node/Vue Engineer",
    company: "Buffer",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Vue", "Node.js", "JavaScript", "MongoDB", "REST APIs"],
    preferredSkills: ["Docker", "Redis", "AWS", "Tailwind CSS"],
    description: "Build social media publishing schedulers, post analytics graphs, and audience engagement dashboards in a transparent 4-day workweek company.",
    responsibilities: [
      "Develop post composition and calendar scheduling interfaces with Vue.",
      "Build resilient social API publishing workers in Node.js.",
      "Maintain MongoDB data pipelines and caching layers."
    ],
    qualifications: [
      "5+ years full-stack experience with Node.js and modern Vue.",
      "Passionate about transparent salary formulas and 4-day workweeks."
    ],
    benefits: ["4-day workweek", "Profit sharing", "Complete remote autonomy"],
    postedDaysAgo: 8
  },
  {
    id: "job-050",
    title: "Full-Stack Engineer - AI Experiences",
    company: "Grammarly",
    category: "Full-Stack",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 175000, max: 225000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React", "Python", "JavaScript", "REST APIs", "PostgreSQL"],
    preferredSkills: ["FastAPI", "Docker", "Tailwind CSS", "Redis"],
    description: "Bridge frontier generative AI language models to interactive browser text editor interfaces and prompt suggestions.",
    responsibilities: [
      "Build streaming AI text generation interfaces with React and Server-Sent Events.",
      "Develop low-latency Python FastAPI backend orchestrators.",
      "Collaborate with ML engineers to evaluate LLM output quality and safety filters."
    ],
    qualifications: [
      "5+ years full-stack engineering with experience building AI-powered web features.",
      "Strong proficiency with Python backend services and modern React state."
    ],
    benefits: ["Stock grants", "Mental health stipend", "Work-from-home allowance"],
    postedDaysAgo: 1
  },

  // ==========================================
  // 3. BACKEND ROLES (25 jobs: 051 - 075)
  // ==========================================
  {
    id: "job-051",
    title: "Senior Backend Engineer - Microservices",
    company: "Linear",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 170000, max: 220000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 6,
    skillsRequired: ["Node.js", "Go", "PostgreSQL", "Microservices", "System Design"],
    preferredSkills: ["Kafka", "Redis", "Distributed Systems", "WebSockets"],
    description: "Help Linear power the fastest issue tracker and project management platform on the web with rock-solid sync and zero-latency pipelines.",
    responsibilities: [
      "Design and maintain distributed synchronization protocols.",
      "Scale real-time WebSocket backend infrastructure to handle millions of active connections.",
      "Ensure 99.99% uptime and sub-50ms API response times."
    ],
    qualifications: [
      "6+ years of backend engineering experience with Node.js or Go.",
      "Strong understanding of database indexing, ACID transactions, and query optimization."
    ],
    benefits: ["Work from anywhere", "Top-tier equipment", "Annual team offsites"],
    postedDaysAgo: 1
  },
  {
    id: "job-052",
    title: "Staff Distributed Systems Engineer",
    company: "Stripe",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Staff",
    location: "Seattle, WA (Remote)",
    salary: { min: 225000, max: 295000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Go", "Distributed Systems", "PostgreSQL", "System Design", "Kafka"],
    preferredSkills: ["Rust", "Redis", "Raft / Consensus", "Docker", "Kubernetes"],
    description: "Architect Stripe's ledger and financial data persistence layers, guaranteeing zero double-spending and five-nines reliability across trillions in transactions.",
    responsibilities: [
      "Design fault-tolerant distributed consensus protocols and replication topologies.",
      "Build real-time balance computation pipelines with strict idempotency.",
      "Lead cross-team incident investigations and disaster recovery simulations."
    ],
    qualifications: [
      "8+ years engineering distributed backend infrastructure.",
      "Deep expertise in consensus algorithms (Raft/Paxos), multi-master databases, and high availability."
    ],
    benefits: ["Top tier compensation", "Comprehensive health", "Retirement 401(k) match"],
    postedDaysAgo: 2
  },
  {
    id: "job-053",
    title: "Junior Backend Developer",
    company: "Twilio",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 80000, max: 100000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Node.js", "JavaScript", "SQL", "REST APIs", "Git"],
    preferredSkills: ["PostgreSQL", "Docker", "Jest", "Unit Testing"],
    description: "Build developer-facing REST APIs and telephony webhooks for Twilio's messaging and voice communications platform.",
    responsibilities: [
      "Write clean Express.js route handlers and API validation middleware.",
      "Implement automated unit tests with Jest for API regression prevention.",
      "Assist senior engineers with database migrations and documentation updates."
    ],
    qualifications: [
      "1+ years building backend web services with Node.js or Python.",
      "Understanding of HTTP status codes, JSON formatting, and SQL basics."
    ],
    benefits: ["Mentorship", "Health insurance", "Commuter benefits"],
    postedDaysAgo: 3
  },
  {
    id: "job-054",
    title: "Lead Backend Architect - Cloud Data",
    company: "Snowflake",
    category: "Backend",
    type: "Onsite",
    experienceLevel: "Lead",
    location: "San Mateo, CA (Onsite)",
    salary: { min: 215000, max: 280000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Java", "Distributed Systems", "SQL", "System Design", "Cloud Architecture"],
    preferredSkills: ["C++", "AWS", "Kubernetes", "Kafka"],
    description: "Direct the development of Snowflake's database query planner, resource allocation manager, and distributed execution engine.",
    responsibilities: [
      "Architect cost-based query optimization algorithms across large compute clusters.",
      "Design dynamic workload isolation algorithms to guarantee query SLAs.",
      "Mentor senior and staff engineers in database systems architecture."
    ],
    qualifications: [
      "7+ years architecting database query engines or distributed storage systems.",
      "Deep expertise in Java, memory management, and concurrent computing."
    ],
    benefits: ["Snowflake equity", "Catered gourmet meals", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-055",
    title: "Mid-Level Go Backend Engineer",
    company: "Cloudflare",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Austin, TX (Remote)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Go", "REST APIs", "PostgreSQL", "Docker", "Git"],
    preferredSkills: ["Kafka", "Redis", "Kubernetes", "Linux"],
    description: "Build control-plane microservices coordinating SSL certificate issuance, DNS record updates, and DDoS mitigation rules globally.",
    responsibilities: [
      "Develop high-throughput microservices in Go handling millions of daily API requests.",
      "Optimize PostgreSQL relational queries and implement Redis caching layers.",
      "Participate in on-call rotation with structured runbooks."
    ],
    qualifications: [
      "3+ years building production backend services with Go.",
      "Solid knowledge of networking (TCP/IP, DNS, HTTP/2) and relational databases."
    ],
    benefits: ["Stock grants", "Health benefits", "Remote work allowance"],
    postedDaysAgo: 2
  },
  {
    id: "job-056",
    title: "Senior Python Backend Engineer",
    company: "Reddit",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "PostgreSQL", "Redis", "REST APIs", "System Design"],
    preferredSkills: ["FastAPI", "Kafka", "Docker", "Kubernetes", "Cassandra"],
    description: "Scale Reddit's comment submission, karma calculation, and subreddit moderation feeds handling over 50k requests per second.",
    responsibilities: [
      "Refactor high-traffic comment tree storage models for speed and resilience.",
      "Build real-time anti-spam scoring microservices using Python and Redis.",
      "Optimize database partitioning across thousands of active community subreddits."
    ],
    qualifications: [
      "5+ years backend engineering experience with Python in high-traffic environments.",
      "Strong understanding of caching strategies, rate limiting, and eventual consistency."
    ],
    benefits: ["Unlimited PTO", "Home office budget", "Health and dental"],
    postedDaysAgo: 5
  },
  {
    id: "job-057",
    title: "Java / Spring Boot Senior Engineer",
    company: "JPMorgan Chase",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "New York, NY (Hybrid)",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Java", "Spring Boot", "SQL", "Microservices", "REST APIs"],
    preferredSkills: ["PostgreSQL", "Kafka", "Docker", "AWS", "JUnit"],
    description: "Modernize legacy transaction settlement engines into resilient event-driven microservices running on enterprise cloud infrastructure.",
    responsibilities: [
      "Develop transactional Spring Boot microservices processing wire transfers.",
      "Implement event streaming consumers with Apache Kafka.",
      "Ensure compliance with federal banking regulations and financial auditing standards."
    ],
    qualifications: [
      "5+ years backend engineering with Java, Spring Boot, and enterprise SQL.",
      "Solid foundation in design patterns, thread safety, and ACID transactions."
    ],
    benefits: ["Retirement pension", "Comprehensive medical", "Tuition support"],
    postedDaysAgo: 6
  },
  {
    id: "job-058",
    title: "Junior Node.js API Developer",
    company: "Plaid",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Salt Lake City, UT (Remote)",
    salary: { min: 75000, max: 95000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Node.js", "JavaScript", "REST APIs", "SQL", "Git"],
    preferredSkills: ["PostgreSQL", "TypeScript", "Jest", "Docker"],
    description: "Help connect financial institutions to modern fintech applications through clean, developer-friendly REST API endpoints.",
    responsibilities: [
      "Build bank transaction normalization endpoints in Node.js.",
      "Write thorough integration tests to verify API payload contracts.",
      "Diagnose connectivity issues with third-party banking integration feeds."
    ],
    qualifications: [
      "1+ years backend development experience with Node.js.",
      "Understanding of REST API design principles and SQL queries."
    ],
    benefits: ["Health coverage", "Remote stipend", "Mentorship program"],
    postedDaysAgo: 3
  },
  {
    id: "job-059",
    title: "Senior Rust Systems Engineer",
    company: "Discord",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 180000, max: 235000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Rust", "Distributed Systems", "WebSockets", "System Design", "Linux"],
    preferredSkills: ["C++", "Redis", "Kafka", "Docker"],
    description: "Build ultra-low-latency real-time voice routing and guild state synchronization servers in Rust handling billions of messages daily.",
    responsibilities: [
      "Develop multi-threaded voice packet routing daemons in Rust.",
      "Optimize memory footprints and eliminate garbage collection pauses.",
      "Scale distributed state synchronization across global server clusters."
    ],
    qualifications: [
      "5+ years backend systems engineering with deep proficiency in Rust.",
      "Deep understanding of memory safety, async runtimes (Tokio), and low-level networking."
    ],
    benefits: ["Free Nitro", "Health benefits", "Equipment allowance"],
    postedDaysAgo: 1
  },
  {
    id: "job-060",
    title: "Staff Backend Infrastructure Engineer",
    company: "Uber",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "Seattle, WA (Hybrid)",
    salary: { min: 220000, max: 285000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Go", "Distributed Systems", "Kafka", "PostgreSQL", "System Design"],
    preferredSkills: ["Java", "Docker", "Kubernetes", "Redis", "Microservices"],
    description: "Architect Uber's core dispatch and geospatial routing graph engines matching millions of riders and drivers in real time.",
    responsibilities: [
      "Design spatial indexing pipelines handling continuous GPS coordinate streams.",
      "Architect fallback routing algorithms that guarantee service availability during peak demand.",
      "Mentor staff and senior engineers across distributed systems orgs."
    ],
    qualifications: [
      "8+ years engineering distributed backend architectures.",
      "Proven success scaling services to millions of queries per second."
    ],
    benefits: ["Uber credits", "Health care", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-061",
    title: "Backend Engineer - Database Internals",
    company: "Cockroach Labs",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "New York, NY (Remote)",
    salary: { min: 175000, max: 225000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Go", "Distributed Systems", "SQL", "Database Internals", "System Design"],
    preferredSkills: ["Raft", "C++", "Linux", "Docker"],
    description: "Implement distributed SQL execution, multi-Raft consensus, and ACID transaction coordination for CockroachDB.",
    responsibilities: [
      "Design distributed transaction coordinators supporting serializable isolation.",
      "Optimize vectorized query execution and memory management in Go.",
      "Benchmark database throughput across multi-region cloud topologies."
    ],
    qualifications: [
      "5+ years working on database engines, storage engines, or distributed consensus.",
      "Exceptional Go programming skills and deep understanding of computer science fundamentals."
    ],
    benefits: ["100% remote", "Health insurance", "Learning stipend"],
    postedDaysAgo: 2
  },
  {
    id: "job-062",
    title: "Mid Backend Node.js Developer",
    company: "Canva",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Austin, TX (Hybrid)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Node.js", "JavaScript", "PostgreSQL", "REST APIs", "Git"],
    preferredSkills: ["Redis", "Docker", "AWS", "Jest"],
    description: "Power export rendering queues, template asset APIs, and collaboration notification feeds for Canva's creator suite.",
    responsibilities: [
      "Build high-throughput image and PDF export rendering queues.",
      "Design PostgreSQL schemas for millions of user design assets.",
      "Write automated integration tests and monitor service health."
    ],
    qualifications: [
      "3+ years backend development experience with Node.js and SQL databases.",
      "Experience working with asynchronous message queues (SQS, BullMQ, or RabbitMQ)."
    ],
    benefits: ["Gym membership", "Daily lunch", "401(k) match"],
    postedDaysAgo: 5
  },
  {
    id: "job-063",
    title: "Lead Backend Engineer - Payments",
    company: "Square",
    category: "Backend",
    type: "Onsite",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Onsite)",
    salary: { min: 200000, max: 255000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Java", "Go", "PostgreSQL", "System Design", "Microservices"],
    preferredSkills: ["Kafka", "Redis", "Distributed Systems", "AWS"],
    description: "Lead technical development of Square's merchant payment processing pipeline, handling millions of card swipes and taps daily.",
    responsibilities: [
      "Architect zero-data-loss payment settlement engines with bank networks.",
      "Drive system resilience strategies to achieve five-nines availability.",
      "Lead architectural reviews and mentor senior engineering staff."
    ],
    qualifications: [
      "7+ years architecting enterprise payment processing or financial ledger backends.",
      "Deep understanding of idempotency, PCI compliance, and distributed locking."
    ],
    benefits: ["Square equity", "Onsite dining", "Generous parental leave"],
    postedDaysAgo: 3
  },
  {
    id: "job-064",
    title: "Junior Python API Developer",
    company: "Pinterest",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 78000, max: 98000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Python", "REST APIs", "SQL", "Git", "Testing"],
    preferredSkills: ["Django", "PostgreSQL", "Docker"],
    description: "Develop backend API endpoints for creator pin analytics, board organization, and recommendation feeds.",
    responsibilities: [
      "Build RESTful API endpoints in Python for web and mobile clients.",
      "Write unit tests and verify database query execution plans.",
      "Collaborate with mobile client engineers to define response schemas."
    ],
    qualifications: [
      "1+ years Python backend experience.",
      "Understanding of relational databases, HTTP, and version control."
    ],
    benefits: ["Healthcare", "Catered meals", "Commuter pass"],
    postedDaysAgo: 6
  },
  {
    id: "job-065",
    title: "Senior Elixir Backend Engineer",
    company: "PagerDuty",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 165000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Elixir", "Distributed Systems", "PostgreSQL", "REST APIs", "System Design"],
    preferredSkills: ["Erlang", "OTP", "Kafka", "Docker", "Redis"],
    description: "Build mission-critical on-call alerting and automated incident escalation pipelines in Elixir/OTP where every second counts.",
    responsibilities: [
      "Design fault-tolerant supervisor trees for million-phone-call notification blasts.",
      "Ensure continuous operation even during major cloud regional outages.",
      "Optimize PostgreSQL time-series incident telemetry tables."
    ],
    qualifications: [
      "5+ years backend development experience with strong Elixir/OTP expertise.",
      "Deep understanding of actor models, concurrency, and fault tolerance."
    ],
    benefits: ["All-remote flexibility", "Home office stipend", "Full health benefits"],
    postedDaysAgo: 4
  },
  {
    id: "job-066",
    title: "Backend Engineer - Search & Indexing",
    company: "Etsy",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Brooklyn, NY (Remote)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Java", "Elasticsearch", "SQL", "REST APIs", "Git"],
    preferredSkills: ["Python", "Kafka", "Docker", "PostgreSQL"],
    description: "Help over 100M buyers find unique handmade goods through fast, relevant search queries powered by Elasticsearch clusters.",
    responsibilities: [
      "Optimize Elasticsearch inverted index mappings and ranking formulas.",
      "Build ingestion pipelines updating listing changes within seconds of edits.",
      "Write automated search relevance evaluation benchmarks."
    ],
    qualifications: [
      "3+ years backend experience with search engines (Elasticsearch, OpenSearch, Solr).",
      "Proficiency in Java or Python and relational database querying."
    ],
    benefits: ["Crafting budget", "Parental leave", "Health insurance"],
    postedDaysAgo: 2
  },
  {
    id: "job-067",
    title: "Senior Go / Kafka Streaming Engineer",
    company: "Shopify",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Ottawa, ON (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Go", "Kafka", "Distributed Systems", "PostgreSQL", "System Design"],
    preferredSkills: ["Docker", "Kubernetes", "Redis", "MySQL"],
    description: "Process billions of Black Friday and Cyber Monday merchant checkout events through Shopify's event streaming backbone.",
    responsibilities: [
      "Build high-throughput event consumers and producers in Go.",
      "Manage partition balancing, consumer lag, and schema evolution in Kafka.",
      "Ensure zero message loss during peak traffic bursts."
    ],
    qualifications: [
      "5+ years backend systems engineering with deep Apache Kafka experience.",
      "Strong Go programming skills and mastery of concurrent programming."
    ],
    benefits: ["Remote work stipend", "Retirement savings match", "Full health coverage"],
    postedDaysAgo: 3
  },
  {
    id: "job-068",
    title: "Staff Backend Architect - Media Pipelines",
    company: "Netflix",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "Los Gatos, CA (Hybrid)",
    salary: { min: 235000, max: 320000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Java", "Distributed Systems", "System Design", "Cloud Architecture", "AWS"],
    preferredSkills: ["Python", "C++", "Kafka", "Docker"],
    description: "Architect cloud video encoding, dynamic bitrate packaging, and global CDN origin delivery services for 260M subscribers.",
    responsibilities: [
      "Design distributed media encoding chunking pipelines across thousands of cloud VMs.",
      "Optimize manifest generation and subtitle synchronization microservices.",
      "Mentor senior engineers on system design and high-volume architecture."
    ],
    qualifications: [
      "8+ years architecting high-scale backend distributed systems.",
      "Deep understanding of network streaming, caching, and cloud cost optimization."
    ],
    benefits: ["Industry-leading compensation", "Flexible vacation", "Health care"],
    postedDaysAgo: 1
  },
  {
    id: "job-069",
    title: "Mid-Level C# / .NET Core Engineer",
    company: "Microsoft",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Redmond, WA (Hybrid)",
    salary: { min: 135000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["C#", ".NET", "SQL", "REST APIs", "Microservices"],
    preferredSkills: ["Azure", "Docker", "Entity Framework", "Redis"],
    description: "Build cloud identity services and subscription management microservices for Microsoft 365 enterprise customers.",
    responsibilities: [
      "Develop performant ASP.NET Core Web APIs deployed on Azure Kubernetes.",
      "Optimize SQL Server relational queries and entity relationships.",
      "Write automated integration tests and monitor service telemetry."
    ],
    qualifications: [
      "3+ years backend development experience with C# and .NET Core.",
      "Understanding of asynchronous programming, dependency injection, and REST."
    ],
    benefits: ["Product discounts", "Onsite clinic", "401(k) match"],
    postedDaysAgo: 5
  },
  {
    id: "job-070",
    title: "Junior Backend Go Engineer",
    company: "DigitalOcean",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Remote Worldwide",
    salary: { min: 76000, max: 96000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Go", "REST APIs", "SQL", "Git", "Linux"],
    preferredSkills: ["Docker", "PostgreSQL", "Testing"],
    description: "Develop cloud virtual machine provisioning APIs, billing telemetry workers, and network firewalls.",
    responsibilities: [
      "Write Go API handlers for managing cloud droplets and volumes.",
      "Implement unit tests and participate in design document reviews.",
      "Troubleshoot API errors reported in customer support channels."
    ],
    qualifications: [
      "1+ years programming in Go or strong academic foundation.",
      "Basic understanding of Linux system administration and REST APIs."
    ],
    benefits: ["Remote-first company", "Health benefits", "Equipment budget"],
    postedDaysAgo: 7
  },
  {
    id: "job-071",
    title: "Senior Backend Node.js / GraphQL Engineer",
    company: "Apollo GraphQL",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Node.js", "GraphQL", "JavaScript", "REST APIs", "System Design"],
    preferredSkills: ["Rust", "PostgreSQL", "Docker", "TypeScript"],
    description: "Build enterprise GraphQL Federation routers and schema composition engines processing millions of queries per second.",
    responsibilities: [
      "Design high-performance GraphQL schema parsing and query planning pipelines.",
      "Build distributed subgraph health monitoring and automated failover.",
      "Contribute to open-source Apollo Server and Federation tooling."
    ],
    qualifications: [
      "5+ years backend engineering with deep GraphQL schema design expertise.",
      "Strong understanding of AST manipulation, query complexity analysis, and caching."
    ],
    benefits: ["100% remote", "Health & vision", "Unlimited vacation"],
    postedDaysAgo: 3
  },
  {
    id: "job-072",
    title: "Backend Engineer - Real-Time Gaming Server",
    company: "Roblox",
    category: "Backend",
    type: "Onsite",
    experienceLevel: "Senior",
    location: "San Mateo, CA (Onsite)",
    salary: { min: 180000, max: 235000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["C++", "Go", "Distributed Systems", "Networking", "System Design"],
    preferredSkills: ["Lua", "Redis", "Linux", "Docker"],
    description: "Scale multiplayer physics coordination and real-time player matchmaking servers for over 70 million daily active users.",
    responsibilities: [
      "Develop low-latency UDP multiplayer server engines in C++ and Go.",
      "Optimize state replication and player interpolation algorithms.",
      "Ensure resilience against DDOS attacks and server crash spikes."
    ],
    qualifications: [
      "5+ years building high-performance networking or multiplayer game servers.",
      "Deep understanding of socket programming, UDP/TCP, and thread synchronization."
    ],
    benefits: ["Free lunches", "Onsite gym", "Roblox equity options"],
    postedDaysAgo: 4
  },
  {
    id: "job-073",
    title: "Lead Backend Developer - Authentication",
    company: "Auth0 / Okta",
    category: "Backend",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Remote Worldwide",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Node.js", "OAuth / OIDC", "PostgreSQL", "System Design", "Microservices"],
    preferredSkills: ["Redis", "Docker", "Kafka", "AWS"],
    description: "Lead technical development of Auth0's core login pipeline, processing over 2 billion authentication events monthly.",
    responsibilities: [
      "Architect multi-tenant identity token issuance services with zero downtime.",
      "Lead cross-functional reviews for new OIDC and Passkey biometric standards.",
      "Mentor senior engineers on secure API design and threat mitigation."
    ],
    qualifications: [
      "7+ years architecting enterprise authentication or security backends.",
      "Recognized expertise in OAuth 2.0, OpenID Connect, and cryptographic signing."
    ],
    benefits: ["Remote work flexibility", "401(k) match", "Generous health"],
    postedDaysAgo: 2
  },
  {
    id: "job-074",
    title: "Mid-Level Backend Python / FastAPI Engineer",
    company: "Notion",
    category: "Backend",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "New York, NY (Hybrid)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Git"],
    preferredSkills: ["Redis", "Docker", "AsyncIO", "Testing"],
    description: "Build Notion's third-party integration webhooks, database connector APIs, and automated backup services.",
    responsibilities: [
      "Develop asynchronous FastAPI endpoints for Notion database sync.",
      "Optimize PostgreSQL query execution plans and index utilization.",
      "Implement rate limiting and token authentication for public API endpoints."
    ],
    qualifications: [
      "3+ years backend development experience with Python (FastAPI/Django).",
      "Solid understanding of relational database indexing and async architecture."
    ],
    benefits: ["Health care", "Wellness allowance", "401(k) match"],
    postedDaysAgo: 6
  },
  {
    id: "job-075",
    title: "Staff Backend Architect - Ad Tech",
    company: "The Trade Desk",
    category: "Backend",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "Ventura, CA (Onsite)",
    salary: { min: 220000, max: 285000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["C#", "C++", "Distributed Systems", "System Design", "Low Latency"],
    preferredSkills: ["Kafka", "Redis", "Linux", "AWS"],
    description: "Architect real-time bidding engines evaluating millions of online ad auctions per second within a strict 10ms window.",
    responsibilities: [
      "Build zero-allocation real-time bidding engines in C# and C++.",
      "Design memory-mapped cache structures storing billions of user profiles.",
      "Drive infrastructure capacity planning across global server regions."
    ],
    qualifications: [
      "8+ years engineering ultra-low-latency backend systems.",
      "Mastery of high-throughput networking, lock-free data structures, and GC tuning."
    ],
    benefits: ["Stock options", "Beachfront office", "Comprehensive benefits"],
    postedDaysAgo: 1
  },

  // ==========================================
  // 4. MOBILE ROLES (15 jobs: 076 - 090)
  // ==========================================
  {
    id: "job-076",
    title: "Senior React Native Engineer",
    company: "Shopify",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 160000, max: 205000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["React Native", "JavaScript", "React", "Mobile Development", "REST APIs"],
    preferredSkills: ["iOS", "Android", "TypeScript", "Jest", "Tailwind CSS"],
    description: "Build Shopify's consumer Shop app used by tens of millions of shoppers for package tracking and merchant checkout.",
    responsibilities: [
      "Architect fluid mobile UI workflows using React Native and reanimated.",
      "Bridge native iOS (Swift) and Android (Kotlin) modules where needed for performance.",
      "Maintain 60fps animations and instant cold-launch times."
    ],
    qualifications: [
      "5+ years developing mobile applications, with 3+ years in production React Native.",
      "Deep understanding of mobile lifecycle, memory profiling, and gesture responders."
    ],
    benefits: ["Remote work stipend", "Comprehensive health", "401(k) matching"],
    postedDaysAgo: 2
  },
  {
    id: "job-077",
    title: "Lead iOS Engineer",
    company: "Airbnb",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 195000, max: 255000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Swift", "iOS", "SwiftUI", "Mobile Architecture", "System Design"],
    preferredSkills: ["Combine", "UIKit", "Unit Testing", "Core Data"],
    description: "Direct iOS technical architecture for Airbnb's booking flow, host calendar management, and offline itinerary caching.",
    responsibilities: [
      "Lead migration to modern SwiftUI and Swift Concurrency (async/await).",
      "Establish mobile architectural guidelines across dozens of distributed feature teams.",
      "Mentor senior iOS developers and drive continuous build time reductions."
    ],
    qualifications: [
      "7+ years native iOS development with deep mastery of Swift and Cocoa Touch.",
      "Proven track record architecting large-scale mobile apps shipped to millions of users."
    ],
    benefits: ["Annual travel credits", "Health insurance", "Home office budget"],
    postedDaysAgo: 3
  },
  {
    id: "job-078",
    title: "Junior Android Developer",
    company: "Duolingo",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Pittsburgh, PA (Hybrid)",
    salary: { min: 75000, max: 95000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Kotlin", "Android", "Mobile Development", "Git", "REST APIs"],
    preferredSkills: ["Jetpack Compose", "Coroutines", "JUnit"],
    description: "Help build accessible, delightful language learning exercises and gamified character animations on Android.",
    responsibilities: [
      "Build Android UI components using modern Jetpack Compose.",
      "Write unit tests for client-side lesson progression algorithms.",
      "Fix bugs reported in beta testing rings across diverse Android hardware."
    ],
    qualifications: [
      "1+ years Android development experience with Kotlin.",
      "Familiarity with Android Studio, Jetpack components, and Material Design."
    ],
    benefits: ["Language lessons", "Daily meals", "Health insurance"],
    postedDaysAgo: 5
  },
  {
    id: "job-079",
    title: "Senior Android Engineer",
    company: "Square",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Atlanta, GA (Hybrid)",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kotlin", "Android", "Jetpack Compose", "Coroutines", "Mobile Architecture"],
    preferredSkills: ["Dagger/Hilt", "Room", "Bluetooth BLE", "Testing"],
    description: "Develop Square's Point of Sale Android app connecting card readers and processing payments for millions of small business merchants.",
    responsibilities: [
      "Build reliable checkout and inventory management interfaces in Jetpack Compose.",
      "Maintain Bluetooth BLE communication pipelines with hardware card readers.",
      "Ensure zero transaction drops during spotty cellular connectivity."
    ],
    qualifications: [
      "5+ years professional native Android development with Kotlin.",
      "Deep understanding of Android architecture components, threading, and hardware interfaces."
    ],
    benefits: ["Square stock", "Catered lunch", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-080",
    title: "Mid React Native Developer",
    company: "Coinbase",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Remote Worldwide",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["React Native", "JavaScript", "React", "Mobile Development", "REST APIs"],
    preferredSkills: ["Redux", "Tailwind CSS", "iOS", "Android"],
    description: "Build clean, biometric-secured cryptocurrency portfolio screens and real-time asset price tracking charts.",
    responsibilities: [
      "Develop responsive mobile screens with smooth gesture interactions.",
      "Integrate WebSocket feeds for live cryptocurrency price charts.",
      "Maintain high code coverage and automated end-to-end testing with Detox."
    ],
    qualifications: [
      "3+ years developing React Native applications.",
      "Understanding of mobile security, biometric auth, and state management."
    ],
    benefits: ["Crypto bonuses", "Remote stipend", "Health insurance"],
    postedDaysAgo: 1
  },
  {
    id: "job-081",
    title: "Senior Flutter Engineer",
    company: "BMW Technology",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Chicago, IL (Hybrid)",
    salary: { min: 150000, max: 190000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Flutter", "Dart", "Mobile Development", "REST APIs", "State Management"],
    preferredSkills: ["iOS", "Android", "Bluetooth", "IoT"],
    description: "Build the My BMW companion app, enabling drivers to remotely lock doors, climate-control cabins, and view EV charging telemetry.",
    responsibilities: [
      "Develop cross-platform Flutter screens deployed simultaneously on iOS and Android.",
      "Build secure BLE and cloud communication layers with connected vehicles.",
      "Ensure pixel-perfect luxury brand design consistency across devices."
    ],
    qualifications: [
      "5+ years mobile development with 3+ years production Flutter experience.",
      "Deep familiarity with Dart language features and Flutter state management (Bloc/Provider)."
    ],
    benefits: ["Vehicle lease discounts", "Health benefits", "401(k) matching"],
    postedDaysAgo: 6
  },
  {
    id: "job-082",
    title: "Junior iOS Developer",
    company: "Strava",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Denver, CO (Remote)",
    salary: { min: 76000, max: 96000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Swift", "iOS", "Mobile Development", "Git", "REST APIs"],
    preferredSkills: ["SwiftUI", "CoreLocation", "MapKit"],
    description: "Help athletes record runs, rides, and workouts by building GPS tracking features and activity social feeds.",
    responsibilities: [
      "Implement social feed activity cards and comment views in Swift.",
      "Assist in testing CoreLocation background GPS tracking accuracy.",
      "Collaborate with backend engineers to integrate REST endpoints."
    ],
    qualifications: [
      "1+ years native iOS development experience with Swift.",
      "Enthusiasm for fitness, outdoor sports, and mobile user experiences."
    ],
    benefits: ["Fitness equipment stipend", "Remote work allowance", "Health coverage"],
    postedDaysAgo: 3
  },
  {
    id: "job-083",
    title: "Staff Mobile Platform Architect",
    company: "Uber",
    category: "Mobile",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "San Francisco, CA (Onsite)",
    salary: { min: 215000, max: 275000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Mobile Architecture", "Swift", "Kotlin", "System Design", "Mobile Development"],
    preferredSkills: ["RIBs Architecture", "CI/CD", "Performance Profiling"],
    description: "Architect Uber's core mobile platform foundation, build pipelines, and modular plug-in architecture used across Rider and Driver apps.",
    responsibilities: [
      "Architect modular mobile frameworks that allow 200+ engineers to commit concurrently.",
      "Reduce iOS and Android app cold-start times and overall binary sizes.",
      "Build automated mobile continuous integration (CI) and device testing farms."
    ],
    qualifications: [
      "8+ years leading mobile engineering for tier-1 consumer apps.",
      "Mastery of both iOS (Swift/Obj-C) and Android (Kotlin/Java) platforms."
    ],
    benefits: ["Uber credits", "Catered dining", "Comprehensive healthcare"],
    postedDaysAgo: 2
  },
  {
    id: "job-084",
    title: "Mid iOS Developer",
    company: "Robinhood",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Menlo Park, CA (Hybrid)",
    salary: { min: 140000, max: 180000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Swift", "iOS", "UIKit", "REST APIs", "Mobile Development"],
    preferredSkills: ["SwiftUI", "Combine", "Unit Testing", "Core Animation"],
    description: "Build delightful stock charting, options trading chains, and retirement account creation flows for everyday investors.",
    responsibilities: [
      "Implement buttery-smooth stock chart interactions and scrubbers.",
      "Ensure zero-error execution for stock order submission screens.",
      "Write unit tests with XCTest and maintain high code quality."
    ],
    qualifications: [
      "3+ years building native iOS apps with Swift.",
      "Strong understanding of UIKit/SwiftUI lifecycle and network error handling."
    ],
    benefits: ["Robinhood equity", "Health insurance", "401(k) match"],
    postedDaysAgo: 5
  },
  {
    id: "job-085",
    title: "Senior Android Engineer - Media Playback",
    company: "Spotify",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Senior",
    location: "New York, NY (Remote)",
    salary: { min: 165000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kotlin", "Android", "ExoPlayer", "Mobile Architecture", "Coroutines"],
    preferredSkills: ["Jetpack Compose", "C++", "Audio Processing", "Testing"],
    description: "Optimize audio playback buffering, offline download encryption, and Android Auto integration for Spotify's 500M+ mobile users.",
    responsibilities: [
      "Scale ExoPlayer audio buffering pipelines for spotty mobile connections.",
      "Architect offline caching and DRM decryptor services.",
      "Optimize Android background services to minimize battery consumption."
    ],
    qualifications: [
      "5+ years Android development experience with media playback or streaming focus.",
      "Deep understanding of Android audio services, ExoPlayer, and background execution."
    ],
    benefits: ["Free Spotify Premium", "Global remote options", "Parental leave"],
    postedDaysAgo: 4
  },
  {
    id: "job-086",
    title: "Lead React Native Mobile Architect",
    company: "Discord",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["React Native", "JavaScript", "React", "Mobile Architecture", "System Design"],
    preferredSkills: ["Swift", "Kotlin", "WebSockets", "C++"],
    description: "Lead the mobile engineering org bridging Discord's iOS and Android apps to unified React Native architecture.",
    responsibilities: [
      "Drive unified component development across iOS and Android.",
      "Optimize React Native bridge and JSI memory overhead for real-time channels.",
      "Mentor staff and senior mobile engineers across distributed teams."
    ],
    qualifications: [
      "7+ years mobile engineering leadership with deep React Native production experience.",
      "Demonstrated ability to deliver performant 60fps mobile applications at scale."
    ],
    benefits: ["Free Nitro", "Health benefits", "Equipment budget"],
    postedDaysAgo: 2
  },
  {
    id: "job-087",
    title: "Junior Cross-Platform Mobile Engineer",
    company: "Etsy",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Brooklyn, NY (Hybrid)",
    salary: { min: 74000, max: 94000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "React Native", "Mobile Development", "Git", "REST APIs"],
    preferredSkills: ["React", "iOS", "Android", "Testing"],
    description: "Help build Etsy's seller companion app, allowing shop owners to take photos, update listings, and reply to buyer messages.",
    responsibilities: [
      "Build mobile order fulfillment and packaging label screens.",
      "Assist in camera photo upload integration and thumbnail cropping.",
      "Write unit tests to verify mobile form validations."
    ],
    qualifications: [
      "1+ years experience building mobile apps with React Native.",
      "Appreciation for handcrafted maker communities and mobile design."
    ],
    benefits: ["Crafting stipend", "Health coverage", "Parental leave"],
    postedDaysAgo: 6
  },
  {
    id: "job-088",
    title: "Senior iOS Engineer - Bluetooth & IoT",
    company: "Oura",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Austin, TX (Remote)",
    salary: { min: 160000, max: 205000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Swift", "iOS", "CoreBluetooth", "SwiftUI", "Mobile Development"],
    preferredSkills: ["HealthKit", "Combine", "Core Data", "Testing"],
    description: "Develop the Oura Ring iOS app, syncing biometric sleep, readiness, and heart rate telemetry via Bluetooth Low Energy.",
    responsibilities: [
      "Build resilient CoreBluetooth background data synchronization pipelines.",
      "Design fluid sleep score charts and biometric trend graphs in SwiftUI.",
      "Integrate bi-directional data exchange with Apple HealthKit."
    ],
    qualifications: [
      "5+ years native iOS development with production Bluetooth/BLE experience.",
      "Passion for health metrics, biometric algorithms, and user privacy."
    ],
    benefits: ["Free Oura Ring", "Wellness allowance", "Full health coverage"],
    postedDaysAgo: 3
  },
  {
    id: "job-089",
    title: "Mid Android Engineer - Maps & Navigation",
    company: "DoorDash",
    category: "Mobile",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Sunnyvale, CA (Hybrid)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Kotlin", "Android", "Google Maps SDK", "Coroutines", "Mobile Development"],
    preferredSkills: ["Jetpack Compose", "Location APIs", "Testing"],
    description: "Build DoorDash's Dasher courier navigation app, optimizing turn-by-turn routing and delivery dropoff confirmations.",
    responsibilities: [
      "Implement real-time courier GPS tracking and route navigation in Kotlin.",
      "Optimize battery consumption during continuous background location monitoring.",
      "Build offline delivery dropoff photo verification."
    ],
    qualifications: [
      "3+ years Android development experience.",
      "Hands-on experience with Google Maps SDK or Mapbox and Android Location APIs."
    ],
    benefits: ["Food credits", "Health insurance", "401(k) match"],
    postedDaysAgo: 5
  },
  {
    id: "job-090",
    title: "Senior Mobile Engineer - Security & Crypto",
    company: "Block (Cash App)",
    category: "Mobile",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 170000, max: 220000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kotlin", "Swift", "Mobile Security", "Cryptography", "Mobile Architecture"],
    preferredSkills: ["Android", "iOS", "Biometrics", "Reverse Engineering Protection"],
    description: "Secure Cash App's mobile binaries against tampering, implement hardware secure enclave key generation, and prevent fraud.",
    responsibilities: [
      "Design cryptographic key generation mechanisms using Apple Secure Enclave and Android Keystore.",
      "Implement runtime application self-protection (RASP) and jailbreak detection.",
      "Collaborate with security researchers to triage vulnerability reports."
    ],
    qualifications: [
      "5+ years mobile engineering experience with specialized mobile security background.",
      "Deep understanding of public-key cryptography, TLS pinning, and mobile OS internals."
    ],
    benefits: ["Block equity grants", "Remote work allowance", "Health benefits"],
    postedDaysAgo: 1
  },

  // ==========================================
  // 5. CLOUD / DEVOPS ROLES (18 jobs: 091 - 108)
  // ==========================================
  {
    id: "job-091",
    title: "Senior DevOps / Platform Engineer",
    company: "GitLab",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 165000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kubernetes", "Docker", "Terraform", "CI/CD", "Linux"],
    preferredSkills: ["AWS", "GCP", "Go", "Helm", "Prometheus"],
    description: "Scale multi-tenant Kubernetes clusters and automate infrastructure-as-code deployments for GitLab.com SaaS infrastructure.",
    responsibilities: [
      "Manage large-scale Kubernetes clusters running hundreds of microservices.",
      "Automate multi-cloud infrastructure provisioning with Terraform and Ansible.",
      "Optimize continuous integration runners handling millions of customer jobs."
    ],
    qualifications: [
      "5+ years in DevOps, Site Reliability, or Cloud Platform Engineering.",
      "Deep expertise in Kubernetes, Linux kernel tuning, and Terraform."
    ],
    benefits: ["All-remote freedom", "Hardware budget", "Flexible vacation"],
    postedDaysAgo: 2
  },
  {
    id: "job-092",
    title: "Lead Site Reliability Engineer (SRE)",
    company: "Datadog",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Lead",
    location: "New York, NY (Hybrid)",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Kubernetes", "Terraform", "Linux", "SRE / Reliability", "System Design"],
    preferredSkills: ["Go", "Python", "AWS", "Datadog", "Chaos Engineering"],
    description: "Lead the reliability engineering organization ensuring four-nines uptime for Datadog's multi-petabyte observability telemetry pipelines.",
    responsibilities: [
      "Establish company-wide Service Level Objectives (SLOs) and Error Budgets.",
      "Design disaster recovery protocols and automated failover across cloud regions.",
      "Drive chaos engineering drills and blameless post-mortem investigations."
    ],
    qualifications: [
      "7+ years leading Site Reliability Engineering for large-scale distributed platforms.",
      "Demonstrated experience maintaining 99.99% availability under massive continuous load."
    ],
    benefits: ["Equity grants", "Health benefits", "401(k) matching"],
    postedDaysAgo: 3
  },
  {
    id: "job-093",
    title: "Junior Cloud Infrastructure Engineer",
    company: "DigitalOcean",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Austin, TX (Remote)",
    salary: { min: 78000, max: 98000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Linux", "Docker", "Git", "Networking", "Bash"],
    preferredSkills: ["Terraform", "Kubernetes", "Python"],
    description: "Support cloud datacenter operations, automated server provisioning, and virtualization hypervisor maintenance.",
    responsibilities: [
      "Write Bash and Python scripts to automate host provisioning tasks.",
      "Monitor datacenter alert queues and triage hardware component failures.",
      "Participate in Linux kernel patch deployments and security maintenance."
    ],
    qualifications: [
      "1+ years experience in systems administration or cloud operations.",
      "Solid knowledge of Linux command line, networking fundamentals, and Docker."
    ],
    benefits: ["Home office setup", "Health insurance", "Mentorship"],
    postedDaysAgo: 5
  },
  {
    id: "job-094",
    title: "Senior Kubernetes & Cloud Architect",
    company: "HashiCorp",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Seattle, WA (Remote)",
    salary: { min: 175000, max: 225000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kubernetes", "Terraform", "AWS", "Docker", "System Design"],
    preferredSkills: ["Go", "Vault", "Consul", "CI/CD"],
    description: "Architect multi-cloud control planes and secure service meshes using Terraform, Nomad, and Kubernetes.",
    responsibilities: [
      "Build declarative Terraform modules for multi-account AWS and Azure footprints.",
      "Automate cryptographic secret distribution with HashiCorp Vault.",
      "Lead cross-engineering cloud migration initiatives."
    ],
    qualifications: [
      "5+ years cloud architecture experience with extensive Kubernetes and Terraform focus.",
      "Strong background in zero-trust network design and secret management."
    ],
    benefits: ["100% remote", "Health & vision", "401(k) retirement match"],
    postedDaysAgo: 1
  },
  {
    id: "job-095",
    title: "Mid-Level Cloud Security & DevOps Engineer",
    company: "Cloudflare",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Austin, TX (Hybrid)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Terraform", "Linux", "Docker", "CI/CD", "Cloud Security"],
    preferredSkills: ["Kubernetes", "Go", "Python", "AWS"],
    description: "Automate security scanning in CI/CD pipelines, harden edge server operating systems, and audit infrastructure permissions.",
    responsibilities: [
      "Integrate automated container vulnerability scanning into GitHub Actions pipelines.",
      "Maintain infrastructure compliance as code using Terraform and Open Policy Agent.",
      "Audit IAM access controls across production cloud environments."
    ],
    qualifications: [
      "3+ years DevOps experience with security emphasis.",
      "Familiarity with container security, least-privilege IAM, and automated testing."
    ],
    benefits: ["Stock options", "Health care", "Commuter pass"],
    postedDaysAgo: 4
  },
  {
    id: "job-096",
    title: "Staff Platform Engineer - Developer Experience",
    company: "Vercel",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Staff",
    location: "San Francisco, CA (Remote)",
    salary: { min: 210000, max: 270000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Kubernetes", "Docker", "Terraform", "CI/CD", "System Design"],
    preferredSkills: ["Go", "AWS", "Edge Computing", "Node.js"],
    description: "Build the underlying global serverless execution runtime and edge routing infrastructure powering Vercel deployments.",
    responsibilities: [
      "Architect sub-millisecond edge routing layers across global cloud datacenters.",
      "Build developer staging environments provisioned in under 10 seconds.",
      "Optimize cloud infrastructure cost and compute resource allocation."
    ],
    qualifications: [
      "8+ years engineering high-scale cloud platforms and container runtimes.",
      "Mastery of modern cloud primitives, virtualization, and edge networks."
    ],
    benefits: ["Equity grant", "Annual company retreats", "Health benefits"],
    postedDaysAgo: 2
  },
  {
    id: "job-097",
    title: "Senior AWS Cloud Architect",
    company: "Capital One",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "McLean, VA (Hybrid)",
    salary: { min: 160000, max: 205000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["AWS", "Terraform", "Kubernetes", "CI/CD", "System Design"],
    preferredSkills: ["Python", "Docker", "Cloud Security", "FinOps"],
    description: "Lead AWS enterprise cloud architecture, automated disaster recovery, and serverless modernization for banking platforms.",
    responsibilities: [
      "Design multi-region AWS architectures with automated cross-region failover.",
      "Implement automated FinOps cost-governance policies with Terraform.",
      "Ensure regulatory compliance with SOC2, FedRAMP, and banking standards."
    ],
    qualifications: [
      "5+ years dedicated AWS enterprise architecture experience.",
      "AWS Certified Solutions Architect Professional or equivalent knowledge."
    ],
    benefits: ["Retirement plan", "Comprehensive health", "Tuition reimbursement"],
    postedDaysAgo: 6
  },
  {
    id: "job-098",
    title: "Junior Build & Release Engineer",
    company: "Electronic Arts (EA)",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Orlando, FL (Hybrid)",
    salary: { min: 72000, max: 92000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["CI/CD", "Git", "Python", "Linux", "Docker"],
    preferredSkills: ["Jenkins", "GitHub Actions", "Bash"],
    description: "Maintain continuous integration build pipelines, package game assets, and automate nightly testing for AAA game titles.",
    responsibilities: [
      "Maintain automated build and packaging jobs in Jenkins and GitHub Actions.",
      "Automate disk space cleanup and asset caching across build worker nodes.",
      "Triage broken build notifications and assist developers with compiler errors."
    ],
    qualifications: [
      "1+ years experience in continuous integration or software build automation.",
      "Solid understanding of Git, Python scripting, and Linux/Windows commands."
    ],
    benefits: ["Free EA games", "Health insurance", "Onsite gym"],
    postedDaysAgo: 5
  },
  {
    id: "job-099",
    title: "Senior Site Reliability Engineer - Observability",
    company: "Slack",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Denver, CO (Remote)",
    salary: { min: 165000, max: 210000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kubernetes", "Linux", "Prometheus", "SRE / Reliability", "Terraform"],
    preferredSkills: ["Grafana", "Go", "Python", "AWS"],
    description: "Scale Slack's centralized metrics, distributed tracing, and logging clusters handling tens of terabytes of operational telemetry daily.",
    responsibilities: [
      "Manage large-scale Prometheus and OpenTelemetry distributed tracing pipelines.",
      "Design auto-remediation runbooks triggered by alerting signals.",
      "Partner with product engineering teams to optimize application tracing overhead."
    ],
    qualifications: [
      "5+ years experience in Site Reliability Engineering with deep observability expertise.",
      "Mastery of Prometheus, Grafana, OpenTelemetry, and Linux internals."
    ],
    benefits: ["Wellness reimbursement", "Full health coverage", "Remote stipend"],
    postedDaysAgo: 3
  },
  {
    id: "job-100",
    title: "Lead Cloud Infrastructure Engineer",
    company: "Discord",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 200000, max: 260000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Kubernetes", "Terraform", "GCP", "Linux", "System Design"],
    preferredSkills: ["Rust", "Python", "Docker", "SRE / Reliability"],
    description: "Lead cloud capacity planning, bare-metal server integrations, and Google Cloud footprint optimizations for Discord.",
    responsibilities: [
      "Architect hybrid cloud infrastructure spanning bare-metal servers and GCP.",
      "Lead cross-team incident command during high-severity system outages.",
      "Drive multi-million dollar annual cloud cost reductions without compromising reliability."
    ],
    qualifications: [
      "7+ years leading cloud infrastructure or reliability engineering at scale.",
      "Strong background in high-throughput networking, Linux systems, and cloud economics."
    ],
    benefits: ["Free Nitro", "Equipment allowance", "Comprehensive healthcare"],
    postedDaysAgo: 2
  },
  {
    id: "job-101",
    title: "Mid-Level DevOps Engineer - CI/CD",
    company: "Shopify",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Toronto, ON (Remote)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Docker", "Kubernetes", "CI/CD", "Git", "Terraform"],
    preferredSkills: ["Buildkite", "Ruby", "Go", "GCP"],
    description: "Improve developer productivity by optimizing build pipelines, ephemeral test environments, and trunk-based deployment systems.",
    responsibilities: [
      "Reduce developer CI pipeline run times through distributed test parallelization.",
      "Maintain automated canary deployment controllers deployed to Kubernetes.",
      "Provide support to product developers experiencing build and release issues."
    ],
    qualifications: [
      "3+ years experience with DevOps tooling and modern CI/CD pipelines.",
      "Strong knowledge of Docker containerization and test runners."
    ],
    benefits: ["Remote work allowance", "Health benefits", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-102",
    title: "Senior Azure Cloud Engineer",
    company: "Accenture",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Chicago, IL (Hybrid)",
    salary: { min: 150000, max: 190000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Azure", "Terraform", "Kubernetes", "CI/CD", "Cloud Security"],
    preferredSkills: ["Docker", "PowerShell", "Python", "ARM Templates"],
    description: "Lead enterprise cloud migrations to Microsoft Azure, architecting secure landing zones, virtual networks, and hybrid connections.",
    responsibilities: [
      "Build automated Azure Landing Zone templates using Terraform.",
      "Implement Azure Active Directory / Entra ID identity governance.",
      "Conduct cloud security reviews aligned with NIST and ISO 27001 standards."
    ],
    qualifications: [
      "5+ years cloud engineering experience with deep Azure expertise.",
      "Azure Solutions Architect Expert certification preferred."
    ],
    benefits: ["Performance bonuses", "Health care", "Tuition reimbursement"],
    postedDaysAgo: 5
  },
  {
    id: "job-103",
    title: "Junior Site Reliability Engineer",
    company: "Etsy",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Brooklyn, NY (Remote)",
    salary: { min: 75000, max: 95000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Linux", "Python", "Git", "Networking", "Bash"],
    preferredSkills: ["Kubernetes", "Terraform", "Datadog"],
    description: "Monitor website availability, automate routine server maintenance, and participate in incident resolution rotations.",
    responsibilities: [
      "Investigate automated monitoring alerts and triage production issues.",
      "Write Python automation scripts to replace manual operations tasks.",
      "Document root causes and remediation steps in team knowledge bases."
    ],
    qualifications: [
      "1+ years experience in systems administration or operations support.",
      "Understanding of Linux OS concepts, networking, and scripting."
    ],
    benefits: ["Crafting budget", "Parental leave", "Health benefits"],
    postedDaysAgo: 7
  },
  {
    id: "job-104",
    title: "Staff Cloud Security Architect",
    company: "Palo Alto Networks",
    category: "Cloud/DevOps",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "Santa Clara, CA (Onsite)",
    salary: { min: 215000, max: 275000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Cloud Security", "Kubernetes", "Terraform", "System Design", "AWS"],
    preferredSkills: ["GCP", "Azure", "Python", "Go"],
    description: "Architect cloud-native security posture management (CSPM) and zero-trust container security controls for Fortune 500 enterprises.",
    responsibilities: [
      "Design zero-trust network microsegmentation policies for Kubernetes clusters.",
      "Build automated cloud compliance scanning engines evaluating millions of resources.",
      "Represent cloud security architecture in customer advisory boards."
    ],
    qualifications: [
      "8+ years experience in cloud infrastructure security and enterprise systems.",
      "Recognized expertise in cloud threat models, container security, and compliance."
    ],
    benefits: ["Competitive equity", "Health insurance", "Onsite dining"],
    postedDaysAgo: 1
  },
  {
    id: "job-105",
    title: "Senior Linux Systems Engineer",
    company: "Canonical (Ubuntu)",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Linux", "Bash", "Python", "Networking", "System Design"],
    preferredSkills: ["C", "Docker", "Kernel Tuning", "Debian Packaging"],
    description: "Maintain core Ubuntu server OS images, systemd services, and automated cloud initialization across major cloud providers.",
    responsibilities: [
      "Build and optimize minimal cloud-init Ubuntu cloud images.",
      "Diagnose complex Linux kernel performance regressions and memory leaks.",
      "Contribute patches upstream to open-source system software."
    ],
    qualifications: [
      "5+ years dedicated Linux systems engineering with deep OS internals knowledge.",
      "Expert knowledge of Bash, Python, Debian packaging, and systemd."
    ],
    benefits: ["100% remote worldwide", "Flexible hours", "Hardware allowance"],
    postedDaysAgo: 6
  },
  {
    id: "job-106",
    title: "Mid-Level Cloud Infrastructure Engineer",
    company: "Twilio",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Denver, CO (Remote)",
    salary: { min: 135000, max: 170000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["AWS", "Terraform", "Docker", "CI/CD", "Linux"],
    preferredSkills: ["Kubernetes", "Python", "Datadog"],
    description: "Build automated cloud provisioning pipelines and maintain high availability across Twilio's global AWS footprint.",
    responsibilities: [
      "Manage infrastructure code with Terraform for multi-account AWS environments.",
      "Build deployment automation in GitHub Actions and Spinnaker.",
      "Monitor cloud resource utilization and optimize monthly AWS spending."
    ],
    qualifications: [
      "3+ years cloud infrastructure experience with AWS and Terraform.",
      "Understanding of infrastructure-as-code, DNS, and cloud networking."
    ],
    benefits: ["Stock grants", "Wellness reimbursement", "Healthcare"],
    postedDaysAgo: 3
  },
  {
    id: "job-107",
    title: "Senior Kubernetes Reliability Engineer",
    company: "Target",
    category: "Cloud/DevOps",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Minneapolis, MN (Hybrid)",
    salary: { min: 150000, max: 190000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Kubernetes", "Docker", "Terraform", "Linux", "CI/CD"],
    preferredSkills: ["Golang", "Helm", "Prometheus", "GCP"],
    description: "Ensure resilience for Target's edge Kubernetes clusters deployed across nearly 2,000 retail stores nationwide.",
    responsibilities: [
      "Manage zero-touch edge Kubernetes cluster provisioning in physical stores.",
      "Build automated recovery controllers for store network interruptions.",
      "Optimize container storage performance on localized hardware."
    ],
    qualifications: [
      "5+ years DevOps or SRE experience with deep Kubernetes operations knowledge.",
      "Experience with edge computing, bare-metal container runtimes, or hybrid cloud."
    ],
    benefits: ["Target store discount", "Health benefits", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-108",
    title: "Lead Platform Security & SRE Architect",
    company: "Stripe",
    category: "Cloud/DevOps",
    type: "Remote",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Remote)",
    salary: { min: 210000, max: 275000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Kubernetes", "Cloud Security", "Terraform", "System Design", "SRE / Reliability"],
    preferredSkills: ["Go", "AWS", "Zero Trust", "Linux"],
    description: "Lead technical direction for Stripe's production compute isolation, zero-trust cloud network security, and infrastructure resilience.",
    responsibilities: [
      "Design hardware-enforced microvm workload isolation for sensitive financial tasks.",
      "Lead enterprise cloud reliability programs guaranteeing 99.999% uptime.",
      "Mentor senior and staff platform engineers on resilient systems design."
    ],
    qualifications: [
      "7+ years leading cloud platform engineering with deep security and SRE experience.",
      "Exceptional systems architecture skills under strict compliance requirements."
    ],
    benefits: ["Top compensation", "Full health coverage", "Remote stipend"],
    postedDaysAgo: 2
  },

  // ==========================================
  // 6. AI / MACHINE LEARNING ROLES (18 jobs: 109 - 126)
  // ==========================================
  {
    id: "job-109",
    title: "Senior Machine Learning Engineer - LLMs",
    company: "Scale AI",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 185000, max: 245000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "Machine Learning", "PyTorch", "LLMs", "NLP"],
    preferredSkills: ["LangChain", "Vector Databases", "Transformers", "Docker"],
    description: "Fine-tune foundation models, build evaluation benchmarks, and develop reinforcement learning from human feedback (RLHF) pipelines.",
    responsibilities: [
      "Implement multi-GPU fine-tuning pipelines using PyTorch and DeepSpeed.",
      "Build automated LLM evaluation benchmarks measuring hallucination and instruction following.",
      "Collaborate with data annotation teams to curate high-quality training datasets."
    ],
    qualifications: [
      "5+ years machine learning experience with deep specialization in modern NLP/LLMs.",
      "Hands-on experience fine-tuning large language models on distributed GPU clusters."
    ],
    benefits: ["Equity in high-growth AI unicorn", "Health care", "Equipment budget"],
    postedDaysAgo: 1
  },
  {
    id: "job-110",
    title: "Lead AI Research Scientist",
    company: "OpenAI Ecosystem Partner",
    category: "AI/ML",
    type: "Onsite",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Onsite)",
    salary: { min: 230000, max: 310000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Python", "PyTorch", "Machine Learning", "Deep Learning", "System Design"],
    preferredSkills: ["CUDA", "Distributed Training", "Mathematics", "Transformers"],
    description: "Lead research on next-generation reasoning architectures, multimodal understanding, and efficient model distillation.",
    responsibilities: [
      "Direct experimental research on novel neural network architectures and loss functions.",
      "Lead distributed model pre-training across multi-thousand H100 GPU clusters.",
      "Publish peer-reviewed research papers at top AI conferences (NeurIPS, ICML, CVPR)."
    ],
    qualifications: [
      "Ph.D. or 7+ years proven track record in advanced Machine Learning research.",
      "Recognized contributions to deep learning architectures, attention mechanisms, or optimization."
    ],
    benefits: ["Top AI market equity", "Comprehensive health", "Unlimited PTO"],
    postedDaysAgo: 2
  },
  {
    id: "job-111",
    title: "Junior Machine Learning Engineer",
    company: "Hugging Face Partner",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Junior",
    location: "New York, NY (Remote)",
    salary: { min: 85000, max: 110000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Python", "Machine Learning", "PyTorch", "Git", "Data Analysis"],
    preferredSkills: ["Transformers", "Pandas", "Scikit-Learn", "Docker"],
    description: "Prepare and clean training datasets, run automated model evaluation scripts, and package open-source models for deployment.",
    responsibilities: [
      "Process and filter multi-gigabyte text datasets using Python and Pandas.",
      "Write automated evaluation scripts to score model accuracy and latency.",
      "Package models with ONNX and Docker for inference testing."
    ],
    qualifications: [
      "1+ years practical Python ML experience or degree in CS/Data Science.",
      "Solid knowledge of machine learning fundamentals, PyTorch, and linear algebra."
    ],
    benefits: ["Remote work flexibility", "Learning budget", "Health insurance"],
    postedDaysAgo: 3
  },
  {
    id: "job-112",
    title: "Senior MLOps & Platform Engineer",
    company: "Databricks",
    category: "AI/ML",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Mountain View, CA (Hybrid)",
    salary: { min: 175000, max: 230000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "Kubernetes", "Docker", "Machine Learning", "CI/CD"],
    preferredSkills: ["MLflow", "Terraform", "PyTorch", "AWS"],
    description: "Build scalable model serving infrastructure, feature stores, and automated model registry tracking tools on the Databricks Lakehouse platform.",
    responsibilities: [
      "Scale real-time model inference clusters deployed on Kubernetes with GPU autoscaling.",
      "Build automated CI/CD retraining and shadow deployment pipelines.",
      "Maintain feature stores and telemetry tracking for drift detection."
    ],
    qualifications: [
      "5+ years experience in MLOps or ML Platform Engineering.",
      "Deep understanding of containerized model serving (Triton, vLLM, or Ray)."
    ],
    benefits: ["Databricks stock grants", "Catered meals", "401(k) matching"],
    postedDaysAgo: 2
  },
  {
    id: "job-113",
    title: "Mid-Level NLP & Search Engineer",
    company: "Grammarly",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Mid",
    location: "San Francisco, CA (Remote)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "NLP", "Machine Learning", "Transformers", "REST APIs"],
    preferredSkills: ["PyTorch", "FastAPI", "Vector Databases", "Docker"],
    description: "Improve grammatical error correction models and semantic synonym suggestions to enhance user writing in real time.",
    responsibilities: [
      "Train lightweight transformer models for real-time text error detection.",
      "Optimize model inference quantization (INT8/FP16) to achieve sub-50ms latency.",
      "Collaborate with frontend engineers to integrate model suggestions into web editors."
    ],
    qualifications: [
      "3+ years NLP experience with transformers and sequence-to-sequence models.",
      "Strong Python programming and deep learning framework mastery."
    ],
    benefits: ["Remote work allowance", "Wellness budget", "Full health coverage"],
    postedDaysAgo: 4
  },
  {
    id: "job-114",
    title: "Staff Generative AI Architect",
    company: "Canva",
    category: "AI/ML",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "Austin, TX (Hybrid)",
    salary: { min: 220000, max: 285000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Python", "Machine Learning", "Deep Learning", "System Design", "PyTorch"],
    preferredSkills: ["Diffusion Models", "Computer Vision", "CUDA", "AWS"],
    description: "Architect Canva's Magic Studio generative design tools, text-to-image synthesis, and automated video background removal.",
    responsibilities: [
      "Architect multi-modal generative pipelines combining diffusion models and LLMs.",
      "Design distributed GPU inference clusters serving millions of daily creative edits.",
      "Represent AI architectural vision to executive product leadership."
    ],
    qualifications: [
      "8+ years engineering production machine learning systems.",
      "Demonstrated success deploying frontier generative models (diffusion, GANs, LLMs) at scale."
    ],
    benefits: ["Generous equity", "Health insurance", "Gym stipend"],
    postedDaysAgo: 1
  },
  {
    id: "job-115",
    title: "Computer Vision ML Engineer",
    company: "Waymo",
    category: "AI/ML",
    type: "Onsite",
    experienceLevel: "Senior",
    location: "Mountain View, CA (Onsite)",
    salary: { min: 180000, max: 240000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "Computer Vision", "PyTorch", "C++", "Machine Learning"],
    preferredSkills: ["LiDAR", "CUDA", "TensorRT", "3D Object Detection"],
    description: "Develop 3D object detection, pedestrian intent prediction, and camera sensor fusion models for autonomous vehicles.",
    responsibilities: [
      "Design deep neural networks for 3D point cloud and camera sensor fusion.",
      "Optimize models for real-time inference on custom automotive hardware using TensorRT.",
      "Analyze edge cases and failure modes from millions of autonomous driving miles."
    ],
    qualifications: [
      "5+ years machine learning experience with computer vision and sensor fusion focus.",
      "Strong proficiency in PyTorch and C++."
    ],
    benefits: ["Competitive compensation", "Health coverage", "Onsite dining"],
    postedDaysAgo: 3
  },
  {
    id: "job-116",
    title: "Junior Data & ML Analyst",
    company: "Spotify",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Junior",
    location: "New York, NY (Remote)",
    salary: { min: 80000, max: 102000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Python", "SQL", "Data Analysis", "Machine Learning", "Git"],
    preferredSkills: ["Pandas", "Scikit-Learn", "Tableau", "Jupyter"],
    description: "Analyze music listening behavior, evaluate playlist recommendation algorithms, and compute user retention statistics.",
    responsibilities: [
      "Extract and aggregate large-scale listening event logs with SQL and Python.",
      "Build regression models to forecast podcast and music consumption trends.",
      "Create visualization dashboards for editorial playlist curators."
    ],
    qualifications: [
      "1+ years experience in data analysis, statistical modeling, or machine learning.",
      "Strong proficiency in SQL and Python data libraries (Pandas, NumPy)."
    ],
    benefits: ["Free Spotify Premium", "Healthcare", "Remote flexibility"],
    postedDaysAgo: 5
  },
  {
    id: "job-117",
    title: "Senior AI Prompt & Evaluation Engineer",
    company: "Anthropic Partner",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "LLMs", "NLP", "Prompt Engineering", "Testing"],
    preferredSkills: ["LangChain", "Vector Databases", "FastAPI", "JSON Schema"],
    description: "Design systematic prompt evaluation harnesses, guardrail pipelines, and synthetic dataset generation for enterprise LLMs.",
    responsibilities: [
      "Develop automated red-teaming benchmarks to discover jailbreaks and safety vulnerabilities.",
      "Optimize multi-step reasoning prompt templates for legal and financial document analysis.",
      "Build regression test suites measuring token efficiency and response consistency."
    ],
    qualifications: [
      "5+ years software development experience with deep prompt engineering and LLM tooling expertise.",
      "Strong analytical thinking and rigorous evaluation methodology."
    ],
    benefits: ["High-growth equity", "Health insurance", "Flexible time off"],
    postedDaysAgo: 2
  },
  {
    id: "job-118",
    title: "Lead ML Systems Engineer - Recommendation",
    company: "Pinterest",
    category: "AI/ML",
    type: "Hybrid",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 205000, max: 265000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Python", "Machine Learning", "Recommendation Systems", "System Design", "PyTorch"],
    preferredSkills: ["C++", "Graph Neural Networks", "Kubernetes", "Kafka"],
    description: "Lead the machine learning team powering home feed recommendations, visual similarity graphs, and shopping ad targeting.",
    responsibilities: [
      "Architect multi-stage recommendation retrieval and ranking funnels.",
      "Scale two-tower neural network embeddings across billions of image pins.",
      "Mentor senior ML engineers and collaborate with product leadership on engagement metrics."
    ],
    qualifications: [
      "7+ years machine learning experience with extensive recommendation systems leadership.",
      "Deep understanding of candidate generation, ranking algorithms, and distributed feature extraction."
    ],
    benefits: ["Catered lunches", "401(k) match", "Health coverage"],
    postedDaysAgo: 4
  },
  {
    id: "job-119",
    title: "Mid-Level Machine Learning Engineer - Audio",
    company: "Discord",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Seattle, WA (Remote)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "PyTorch", "Audio Processing", "Machine Learning", "C++"],
    preferredSkills: ["Deep Learning", "Signal Processing", "Docker"],
    description: "Develop noise suppression, echo cancellation, and real-time audio enhancement models deployed across Discord voice calls.",
    responsibilities: [
      "Train lightweight deep learning models for real-time background noise filtering (Krisp).",
      "Optimize audio model latency to run within a 10ms frame budget on user machines.",
      "Evaluate voice clarity and artifact suppression with acoustic metrics."
    ],
    qualifications: [
      "3+ years machine learning experience with audio, speech, or digital signal processing.",
      "Proficiency in PyTorch and C++ integration."
    ],
    benefits: ["Free Nitro", "Equipment allowance", "Health insurance"],
    postedDaysAgo: 6
  },
  {
    id: "job-120",
    title: "Senior AI Search & RAG Engineer",
    company: "Notion",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 175000, max: 225000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "Vector Databases", "LLMs", "NLP", "Information Retrieval"],
    preferredSkills: ["LangChain", "Elasticsearch", "PostgreSQL", "FastAPI"],
    description: "Build Notion Q&A: an intelligent search engine that uses retrieval-augmented generation (RAG) to answer questions across workspace docs.",
    responsibilities: [
      "Build high-accuracy semantic vector search and hybrid keyword retrieval pipelines.",
      "Design document chunking, embedding generation, and permission-aware search filters.",
      "Optimize LLM answer generation speed and citation accuracy."
    ],
    qualifications: [
      "5+ years software engineering with deep experience in vector search, RAG, and NLP.",
      "Hands-on expertise with vector databases (Pinecone, Qdrant, Milvus, or pgvector)."
    ],
    benefits: ["Generous equity", "Health stipend", "Home office budget"],
    postedDaysAgo: 1
  },
  {
    id: "job-121",
    title: "Junior AI Prompt & Dataset Curator",
    company: "Scale AI",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Remote Worldwide",
    salary: { min: 72000, max: 92000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Python", "Data Analysis", "NLP", "Git", "Writing"],
    preferredSkills: ["Pandas", "LLMs", "JSON"],
    description: "Curate, validate, and structure high-complexity code generation and conversational datasets used to train state-of-the-art frontier models.",
    responsibilities: [
      "Write and verify complex programming problem solutions across multiple languages.",
      "Evaluate model-generated reasoning traces for mathematical correctness.",
      "Use Python to cleanse and format training data according to schema specifications."
    ],
    qualifications: [
      "1+ years coding experience with Python and strong written analytical reasoning.",
      "Passion for cutting-edge generative AI technologies."
    ],
    benefits: ["Remote work flexibility", "Health insurance", "Learning stipend"],
    postedDaysAgo: 3
  },
  {
    id: "job-122",
    title: "Staff Autonomous Systems ML Engineer",
    company: "Cruise",
    category: "AI/ML",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 215000, max: 280000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Python", "PyTorch", "C++", "Machine Learning", "System Design"],
    preferredSkills: ["Reinforcement Learning", "Robotics", "CUDA", "Simulation"],
    description: "Lead behavioral prediction and motion planning neural network architectures for autonomous robotaxi fleets operating in dense cities.",
    responsibilities: [
      "Architect transformer-based motion planning models that reason about road agents.",
      "Build high-fidelity simulation environments testing autonomous edge cases.",
      "Lead cross-functional validation with safety and systems engineering teams."
    ],
    qualifications: [
      "8+ years experience in autonomous vehicles, robotics, or deep learning.",
      "Expertise in modern motion forecasting, reinforcement learning, and PyTorch."
    ],
    benefits: ["Cruise equity", "Full healthcare", "Onsite meals"],
    postedDaysAgo: 4
  },
  {
    id: "job-123",
    title: "Mid-Level Machine Learning Engineer - Fraud Detection",
    company: "Stripe",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Seattle, WA (Remote)",
    salary: { min: 150000, max: 190000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "Machine Learning", "SQL", "Scikit-Learn", "REST APIs"],
    preferredSkills: ["PyTorch", "Kafka", "Docker", "Feature Engineering"],
    description: "Build real-time fraud scoring models on Stripe Radar, preventing payment card fraud for hundreds of thousands of internet businesses.",
    responsibilities: [
      "Engineer behavioral and network features to identify credit card testing patterns.",
      "Train gradient boosted trees and neural networks operating under a 50ms latency SLA.",
      "Monitor false positive rates and model drift across international markets."
    ],
    qualifications: [
      "3+ years machine learning experience, preferably in fraud, risk, or cyber security.",
      "Strong Python and SQL skills with solid statistical foundations."
    ],
    benefits: ["Health care", "Remote office stipend", "401(k) matching"],
    postedDaysAgo: 2
  },
  {
    id: "job-124",
    title: "Senior Reinforcement Learning Engineer",
    company: "Tesla Autopilot Partner",
    category: "AI/ML",
    type: "Onsite",
    experienceLevel: "Senior",
    location: "Palo Alto, CA (Onsite)",
    salary: { min: 180000, max: 240000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Python", "PyTorch", "Reinforcement Learning", "Deep Learning", "C++"],
    preferredSkills: ["Robotics", "Simulation", "CUDA", "Computer Vision"],
    description: "Train end-to-end neural network driving policies utilizing large-scale self-supervised simulation and reinforcement learning.",
    responsibilities: [
      "Design reward functions and policy architectures for vehicle trajectory control.",
      "Scale simulation training across distributed GPU clusters.",
      "Benchmark driving smoothness, safety margins, and intervention rates."
    ],
    qualifications: [
      "5+ years experience in reinforcement learning or deep learning robotics.",
      "Proven track record training complex policy models in simulation."
    ],
    benefits: ["Equity options", "Health insurance", "Relocation assistance"],
    postedDaysAgo: 5
  },
  {
    id: "job-125",
    title: "Lead AI/ML Ethics & Safety Researcher",
    company: "Cohere",
    category: "AI/ML",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Toronto, ON (Remote)",
    salary: { min: 190000, max: 245000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Python", "NLP", "Machine Learning", "LLMs", "AI Safety"],
    preferredSkills: ["PyTorch", "Evaluation", "Red Teaming"],
    description: "Lead research on foundation model bias mitigation, toxic content filtering, and enterprise security guardrails.",
    responsibilities: [
      "Design benchmark suites measuring model toxicity, privacy leakage, and bias.",
      "Develop model fine-tuning techniques that preserve capabilities while enforcing safety.",
      "Publish research and collaborate with international AI safety consortiums."
    ],
    qualifications: [
      "7+ years in NLP, machine learning, or AI ethics research.",
      "Demonstrated thought leadership in responsible AI and safety evaluations."
    ],
    benefits: ["Equity", "Flexible remote work", "Health benefits"],
    postedDaysAgo: 6
  },
  {
    id: "job-126",
    title: "Mid ML Engineer - Graph Neural Networks",
    company: "LinkedIn",
    category: "AI/ML",
    type: "Hybrid",
    experienceLevel: "Mid",
    location: "Sunnyvale, CA (Hybrid)",
    salary: { min: 145000, max: 185000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Python", "PyTorch", "Graph Neural Networks", "Machine Learning", "SQL"],
    preferredSkills: ["Distributed Systems", "Docker", "Spark"],
    description: "Scale LinkedIn's economic graph embeddings to connect 1 billion professionals with relevant job openings, skills, and industry peers.",
    responsibilities: [
      "Train large-scale Graph Neural Network (GNN) embeddings on billions of network edges.",
      "Integrate graph embeddings into candidate ranking pipelines for Job Search.",
      "Run offline and online A/B testing evaluations."
    ],
    qualifications: [
      "3+ years machine learning experience with graph algorithms or embedding models.",
      "Proficiency in PyTorch Geometric (PyG) or DGL."
    ],
    benefits: ["LinkedIn Learning", "Onsite gym and meals", "401(k) match"],
    postedDaysAgo: 3
  },

  // ==========================================
  // 7. SECURITY ROLES (10 jobs: 127 - 136)
  // ==========================================
  {
    id: "job-127",
    title: "Senior Application Security Engineer",
    company: "GitHub",
    category: "Security",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Remote Worldwide",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Application Security", "Security", "Code Review", "Vulnerability Management", "Web Security"],
    preferredSkills: ["Python", "Go", "SAST / DAST", "OAuth / OIDC", "Docker"],
    description: "Protect the world's code repository by identifying vulnerabilities, performing secure code reviews, and building automated security tooling.",
    responsibilities: [
      "Perform architecture threat modeling and code reviews on new GitHub features.",
      "Triage security vulnerabilities submitted through GitHub's Bug Bounty program.",
      "Build custom Semgrep rules and automated static analysis checks for developer CI."
    ],
    qualifications: [
      "5+ years in application security, penetration testing, or product security.",
      "Deep understanding of web vulnerabilities (OWASP Top 10), authentication, and cryptography."
    ],
    benefits: ["All-remote freedom", "Health coverage", "Annual wellness stipend"],
    postedDaysAgo: 2
  },
  {
    id: "job-128",
    title: "Lead Cloud Security Architect",
    company: "Coinbase",
    category: "Security",
    type: "Remote",
    experienceLevel: "Lead",
    location: "Remote Worldwide",
    salary: { min: 200000, max: 260000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Cloud Security", "Security", "AWS", "Terraform", "System Design"],
    preferredSkills: ["Kubernetes", "Cryptography", "Zero Trust", "Go"],
    description: "Lead technical security architecture protecting cold and hot cryptocurrency storage vaults and distributed cloud networks.",
    responsibilities: [
      "Architect cryptographic key management and multi-party computation (MPC) environments.",
      "Define zero-trust network policies across AWS multi-account infrastructure.",
      "Lead purple team adversary simulation exercises and incident response plans."
    ],
    qualifications: [
      "7+ years in enterprise cloud security or financial infrastructure protection.",
      "Proven expertise in cryptography, cloud IAM security, and threat modeling."
    ],
    benefits: ["Crypto bonuses", "Full healthcare", "Home office stipend"],
    postedDaysAgo: 1
  },
  {
    id: "job-129",
    title: "Junior Security Operations / SOC Analyst",
    company: "CrowdStrike Partner",
    category: "Security",
    type: "Hybrid",
    experienceLevel: "Junior",
    location: "Austin, TX (Hybrid)",
    salary: { min: 72000, max: 92000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Security", "Network Protocols", "Linux", "Incident Response", "Git"],
    preferredSkills: ["Python", "SIEM", "Wireshark"],
    description: "Monitor security alert queues, analyze endpoint detection logs, and investigate potential intrusion attempts.",
    responsibilities: [
      "Investigate suspicious endpoint alerts and anomalous user network traffic.",
      "Triage phishing reports and isolate compromised workstations.",
      "Document incident timelines and assist senior analysts in root cause analysis."
    ],
    qualifications: [
      "1+ years experience in cybersecurity, SOC analysis, or IT security administration.",
      "Basic understanding of TCP/IP protocols, malware behavior, and security frameworks."
    ],
    benefits: ["Certification reimbursement (Security+, CySA+)", "Health benefits", "401(k)"],
    postedDaysAgo: 4
  },
  {
    id: "job-130",
    title: "Senior Penetration Tester & Red Teamer",
    company: "Uber",
    category: "Security",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 170000, max: 220000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Penetration Testing", "Security", "Web Security", "Network Protocols", "Python"],
    preferredSkills: ["Burp Suite", "Exploit Development", "Reverse Engineering", "Linux"],
    description: "Simulate advanced threat adversaries across Uber's global cloud, mobile applications, and internal infrastructure to discover zero-days.",
    responsibilities: [
      "Execute complex targeted penetration tests against web, mobile, and cloud environments.",
      "Author detailed proof-of-concept exploits and remediation recommendations.",
      "Collaborate with defensive blue teams to test detection coverage and alarm triggers."
    ],
    qualifications: [
      "5+ years professional penetration testing or offensive security research experience.",
      "OSCP, OSCE, or equivalent certifications or public vulnerability disclosures."
    ],
    benefits: ["Uber credits", "Health insurance", "Generous equity grant"],
    postedDaysAgo: 3
  },
  {
    id: "job-131",
    title: "Staff Product Security Engineer",
    company: "Figma",
    category: "Security",
    type: "Hybrid",
    experienceLevel: "Staff",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 215000, max: 275000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Application Security", "Security", "Web Security", "System Design", "JavaScript"],
    preferredSkills: ["C++", "WebAssembly", "OAuth / OIDC", "Threat Modeling"],
    description: "Embed security directly into Figma's design canvas, plugin runtime sandbox, and enterprise organization access controls.",
    responsibilities: [
      "Design secure browser sandbox boundaries for third-party Figma plugins.",
      "Lead cross-functional threat modeling on real-time canvas collaboration protocols.",
      "Establish engineering secure coding guidelines and automated security linting."
    ],
    qualifications: [
      "8+ years software security experience with focus on browser engines and web apps.",
      "Deep understanding of browser isolation primitives (Wasm, iframes, Web Workers, CSP)."
    ],
    benefits: ["Figma equity", "Daily catered meals", "Comprehensive medical"],
    postedDaysAgo: 5
  },
  {
    id: "job-132",
    title: "Mid-Level DevSecOps Engineer",
    company: "Datadog",
    category: "Security",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Boston, MA (Remote)",
    salary: { min: 140000, max: 175000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Cloud Security", "Security", "CI/CD", "Docker", "Terraform"],
    preferredSkills: ["Kubernetes", "Python", "Go", "Vulnerability Management"],
    description: "Automate security scanning in developer build pipelines, container image signing, and infrastructure vulnerability management.",
    responsibilities: [
      "Implement automated container scanning and cryptographic image signing (Cosign).",
      "Automate secret detection and token revocation in source control repositories.",
      "Assist product engineering teams in patching critical CVEs before production deploy."
    ],
    qualifications: [
      "3+ years experience bridging DevOps and security operations.",
      "Familiarity with container security tools (Trivy, Grype, Snyk) and CI/CD pipelines."
    ],
    benefits: ["Equity grants", "Health care", "401(k) match"],
    postedDaysAgo: 6
  },
  {
    id: "job-133",
    title: "Senior Cryptography & Blockchain Security Engineer",
    company: "Stripe",
    category: "Security",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 180000, max: 235000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Cryptography", "Security", "Go", "System Design", "Rust"],
    preferredSkills: ["Zero Knowledge Proofs", "PKI", "C++", "Linux"],
    description: "Build cryptographic verification libraries, tokenization primitives, and hardware security module (HSM) integrations.",
    responsibilities: [
      "Implement constant-time cryptographic primitives resistant to timing side-channels.",
      "Manage public key infrastructure (PKI) and automated certificate rotation.",
      "Review cryptographic protocols with third-party academic security auditors."
    ],
    qualifications: [
      "5+ years working with applied cryptography, secure enclaves, or security protocols.",
      "Strong proficiency in Go or Rust with solid mathematical background."
    ],
    benefits: ["Comprehensive medical", "Stipend for home office", "401(k) matching"],
    postedDaysAgo: 2
  },
  {
    id: "job-134",
    title: "Junior Application Security Analyst",
    company: "Shopify",
    category: "Security",
    type: "Remote",
    experienceLevel: "Junior",
    location: "Toronto, ON (Remote)",
    salary: { min: 74000, max: 94000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Security", "Web Security", "JavaScript", "HTML5", "Git"],
    preferredSkills: ["Python", "Burp Suite", "OWASP Top 10"],
    description: "Help review third-party Shopify app store submissions for privacy compliance and security vulnerabilities.",
    responsibilities: [
      "Scan partner app submissions for cross-site scripting (XSS) and insecure API endpoints.",
      "Provide actionable remediation guidance to independent app developers.",
      "Assist security engineers in building automated security scanning rules."
    ],
    qualifications: [
      "1+ years experience in web application security or code analysis.",
      "Good communication skills and understanding of web vulnerabilities."
    ],
    benefits: ["Remote work stipend", "Healthcare", "Mentorship program"],
    postedDaysAgo: 7
  },
  {
    id: "job-135",
    title: "Lead Identity & Access Management (IAM) Engineer",
    company: "Okta",
    category: "Security",
    type: "Hybrid",
    experienceLevel: "Lead",
    location: "San Jose, CA (Hybrid)",
    salary: { min: 195000, max: 250000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["OAuth / OIDC", "Security", "System Design", "Microservices", "REST APIs"],
    preferredSkills: ["Java", "Node.js", "Docker", "Cloud Security"],
    description: "Lead technical development of enterprise identity governance, adaptive multi-factor authentication, and privileged access management.",
    responsibilities: [
      "Architect fine-grained access control policy engines (ABAC / RBAC) for millions of corporate accounts.",
      "Drive adoption of passkey biometric standards and FIDO2 hardware authentication.",
      "Represent Okta in industry standards bodies (OpenID Foundation, FIDO Alliance)."
    ],
    qualifications: [
      "7+ years in identity architecture, enterprise security, and authentication protocol design.",
      "Mastery of OAuth 2.0, OpenID Connect, SCIM, and SAML."
    ],
    benefits: ["Stock grants", "Comprehensive health", "Commuter subsidies"],
    postedDaysAgo: 3
  },
  {
    id: "job-136",
    title: "Senior Incident Response & Threat Hunter",
    company: "Mandiant / Google Cloud",
    category: "Security",
    type: "Remote",
    experienceLevel: "Senior",
    location: "Reston, VA (Remote)",
    salary: { min: 165000, max: 215000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Incident Response", "Security", "Forensics", "Linux", "Network Protocols"],
    preferredSkills: ["Python", "Malware Analysis", "Memory Forensics"],
    description: "Lead critical cybersecurity incident investigations, live memory forensics, and threat actor tracking for Fortune 100 enterprise breaches.",
    responsibilities: [
      "Conduct digital forensics on compromised enterprise networks and cloud environments.",
      "Reverse engineer malware and extract indicators of compromise (IOCs).",
      "Author executive threat intelligence briefings and technical remediation roadmaps."
    ],
    qualifications: [
      "5+ years in digital forensics, incident response (DFIR), or threat hunting.",
      "Deep understanding of adversary tactics, techniques, and procedures (MITRE ATT&CK)."
    ],
    benefits: ["Google benefits package", "Health care", "401(k) matching"],
    postedDaysAgo: 1
  },

  // ==========================================
  // 8. QA / SDET ROLES (10 jobs: 137 - 146)
  // ==========================================
  {
    id: "job-137",
    title: "Senior SDET - Frontend Automation",
    company: "Stripe",
    category: "QA",
    type: "Remote",
    experienceLevel: "Senior",
    location: "San Francisco, CA (Remote)",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Playwright", "Cypress", "JavaScript", "Testing", "React"],
    preferredSkills: ["TypeScript", "CI/CD", "Docker", "Jest"],
    description: "Build robust, flakiness-resistant end-to-end automation frameworks for Stripe's checkout forms and merchant dashboard portals.",
    responsibilities: [
      "Architect scalable automated test suites using Playwright running in parallel on CI.",
      "Eliminate test flakiness and reduce full regression execution times under 10 minutes.",
      "Build visual regression testing pipelines catching CSS and layout shifts."
    ],
    qualifications: [
      "5+ years in software test automation with modern frameworks (Playwright, Cypress).",
      "Strong JavaScript programming skills and deep understanding of web fundamentals."
    ],
    benefits: ["Stripe equity", "Remote work budget", "Comprehensive medical"],
    postedDaysAgo: 2
  },
  {
    id: "job-138",
    title: "Lead Quality Engineering Architect",
    company: "Salesforce",
    category: "QA",
    type: "Hybrid",
    experienceLevel: "Lead",
    location: "San Francisco, CA (Hybrid)",
    salary: { min: 190000, max: 240000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 7,
    skillsRequired: ["Testing", "Test Automation", "Java", "CI/CD", "System Design"],
    preferredSkills: ["Selenium", "Playwright", "Performance Testing", "Python"],
    description: "Lead quality engineering strategy across Salesforce Core Cloud, defining quality gates, release criteria, and automated test pipelines.",
    responsibilities: [
      "Define global test automation standards and quality metrics across hundreds of engineering squads.",
      "Lead enterprise shift-left testing initiatives and contract testing for microservices.",
      "Mentor senior SDETs and champion test-driven development (TDD) best practices."
    ],
    qualifications: [
      "7+ years leading software quality engineering and automation frameworks at enterprise scale.",
      "Strong programming background in Java or Python with deep architectural vision."
    ],
    benefits: ["Salesforce stock", "Health and dental", "401(k) matching"],
    postedDaysAgo: 4
  },
  {
    id: "job-139",
    title: "Junior QA Automation Engineer",
    company: "Vimeo",
    category: "QA",
    type: "Remote",
    experienceLevel: "Junior",
    location: "New York, NY (Remote)",
    salary: { min: 70000, max: 90000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["JavaScript", "Cypress", "Testing", "Git", "HTML5"],
    preferredSkills: ["Playwright", "REST APIs", "CSS3"],
    description: "Write automated end-to-end regression tests for video upload forms, player controls, and viewer comment threads.",
    responsibilities: [
      "Develop and maintain automated UI tests using Cypress.",
      "Perform manual exploratory testing on new video feature releases.",
      "Report detailed bug tickets with reproduction steps and network logs."
    ],
    qualifications: [
      "1+ years experience in software testing or automated QA.",
      "Familiarity with JavaScript, Cypress, browser developer tools, and Git."
    ],
    benefits: ["Free Vimeo subscription", "Health benefits", "Remote work allowance"],
    postedDaysAgo: 3
  },
  {
    id: "job-140",
    title: "Senior Performance & Load Testing SDET",
    company: "PayPal",
    category: "QA",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "San Jose, CA (Hybrid)",
    salary: { min: 155000, max: 195000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Performance Testing", "Testing", "JMeter / k6", "Java", "REST APIs"],
    preferredSkills: ["Python", "Distributed Systems", "Datadog", "Docker"],
    description: "Simulate massive cyber-week transaction loads on PayPal payment APIs to identify database locks, memory leaks, and throughput limits.",
    responsibilities: [
      "Design distributed load testing scenarios with k6 and JMeter generating 100k+ RPS.",
      "Analyze CPU, memory, and database connection pooling bottlenecks during peak loads.",
      "Collaborate with backend architects to establish capacity limits and auto-scaling rules."
    ],
    qualifications: [
      "5+ years specialized in performance engineering, load testing, and system capacity planning.",
      "Proficiency with load testing tools (k6, JMeter, Locust, or Gatling)."
    ],
    benefits: ["Stock purchase plan", "Tuition reimbursement", "Comprehensive health"],
    postedDaysAgo: 5
  },
  {
    id: "job-141",
    title: "Mid-Level Mobile QA Automation Engineer",
    company: "Discord",
    category: "QA",
    type: "Remote",
    experienceLevel: "Mid",
    location: "San Francisco, CA (Remote)",
    salary: { min: 130000, max: 165000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Testing", "Mobile Development", "JavaScript", "Git", "REST APIs"],
    preferredSkills: ["Detox", "Appium", "React Native", "iOS", "Android"],
    description: "Build automated mobile test suites for voice calls, video streaming, and chat messaging across iOS and Android device farms.",
    responsibilities: [
      "Develop mobile end-to-end tests using Detox and Appium.",
      "Manage cloud device testing farms executing automated builds before App Store submission.",
      "Analyze mobile memory consumption and battery drain during active voice sessions."
    ],
    qualifications: [
      "3+ years in mobile test automation (iOS & Android).",
      "Hands-on experience with mobile testing frameworks (Detox, Appium, or Espresso)."
    ],
    benefits: ["Free Nitro", "Equipment budget", "Healthcare"],
    postedDaysAgo: 1
  },
  {
    id: "job-142",
    title: "Senior Backend & API SDET",
    company: "Datadog",
    category: "QA",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "New York, NY (Hybrid)",
    salary: { min: 160000, max: 200000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Testing", "REST APIs", "Python", "Go", "Docker"],
    preferredSkills: ["PostgreSQL", "Kafka", "CI/CD", "Jest"],
    description: "Build automated contract testing, chaos testing, and API integration test suites for high-throughput telemetry endpoints.",
    responsibilities: [
      "Develop automated integration test frameworks validating REST and gRPC API contracts.",
      "Simulate network partitions and degraded backend dependencies in CI testing rings.",
      "Track and report on API reliability metrics across sprint releases."
    ],
    qualifications: [
      "5+ years experience as a software engineer in test with backend focus.",
      "Strong coding abilities in Python, Go, or Java with deep REST/gRPC knowledge."
    ],
    benefits: ["Equity grants", "Catered lunch", "401(k) matching"],
    postedDaysAgo: 2
  },
  {
    id: "job-143",
    title: "Staff Quality Systems Engineer",
    company: "Uber",
    category: "QA",
    type: "Onsite",
    experienceLevel: "Staff",
    location: "Sunnyvale, CA (Onsite)",
    salary: { min: 210000, max: 270000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 8,
    skillsRequired: ["Testing", "Test Automation", "System Design", "Python", "CI/CD"],
    preferredSkills: ["Go", "Kubernetes", "Mobile Architecture", "Docker"],
    description: "Architect automated hardware-in-the-loop and software test simulation platforms for rider dispatch and autonomous safety gates.",
    responsibilities: [
      "Design large-scale simulation testing platforms modeling citywide traffic and surge scenarios.",
      "Architect release gating pipelines deployed across hundreds of microservices.",
      "Mentor staff and senior SDETs across the organization."
    ],
    qualifications: [
      "8+ years leading quality engineering or automated testing systems.",
      "Extensive experience architecting distributed testing infrastructure and simulation."
    ],
    benefits: ["Uber credits", "Onsite dining", "Comprehensive medical"],
    postedDaysAgo: 3
  },
  {
    id: "job-144",
    title: "Junior Manual & Exploratory QA Tester",
    company: "Epic Games Partner",
    category: "QA",
    type: "Onsite",
    experienceLevel: "Junior",
    location: "Cary, NC (Onsite)",
    salary: { min: 65000, max: 85000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 1,
    skillsRequired: ["Testing", "Bug Tracking", "Git", "Writing", "Attention to Detail"],
    preferredSkills: ["Jira", "Unreal Engine", "Test Cases"],
    description: "Test gameplay mechanics, user interface layouts, and store microtransactions across PC, consoles, and mobile builds.",
    responsibilities: [
      "Execute functional test passes following structured test cases and checklists.",
      "Document clear, reproducible bug reports with video captures and system logs.",
      "Verify resolved bug fixes across multiple hardware configurations."
    ],
    qualifications: [
      "1+ years experience in quality assurance or game testing.",
      "Exceptional written communication skills and sharp attention to visual detail."
    ],
    benefits: ["Gaming perks", "Health care", "Paid time off"],
    postedDaysAgo: 6
  },
  {
    id: "job-145",
    title: "Senior SDET - Cloud & Microservices",
    company: "Netflix",
    category: "QA",
    type: "Hybrid",
    experienceLevel: "Senior",
    location: "Los Gatos, CA (Hybrid)",
    salary: { min: 185000, max: 240000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 5,
    skillsRequired: ["Testing", "Java", "Python", "Microservices", "REST APIs"],
    preferredSkills: ["Chaos Engineering", "Docker", "AWS", "Kafka"],
    description: "Build automated chaos injection test suites and end-to-end playback quality verification frameworks for global video streaming.",
    responsibilities: [
      "Build automated resilience test harnesses injecting cloud network faults and latency.",
      "Validate consumer video playback streaming quality across diverse network conditions.",
      "Partner with product engineering teams to eliminate single points of failure."
    ],
    qualifications: [
      "5+ years backend test automation experience in large-scale distributed systems.",
      "Strong programming skills in Java or Python with deep networking understanding."
    ],
    benefits: ["Top compensation", "Flexible vacation", "Health care"],
    postedDaysAgo: 1
  },
  {
    id: "job-146",
    title: "Mid-Level QA Automation Engineer - Web",
    company: "Shopify",
    category: "QA",
    type: "Remote",
    experienceLevel: "Mid",
    location: "Montreal, QC (Remote)",
    salary: { min: 125000, max: 155000, currency: "USD", period: "yearly" },
    experienceYearsRequired: 3,
    skillsRequired: ["Cypress", "Playwright", "JavaScript", "Testing", "Git"],
    preferredSkills: ["React", "HTML5", "CSS3", "CI/CD"],
    description: "Develop automated UI regression suites for Shopify's merchant inventory and order management administration portal.",
    responsibilities: [
      "Author maintainable test scripts using Playwright and Cypress for web admin portals.",
      "Integrate automated test runs into pull request review workflows.",
      "Collaborate with developers to improve testability and semantic HTML locators."
    ],
    qualifications: [
      "3+ years automated web testing experience.",
      "Strong JavaScript skills and familiarity with modern front-end architectures."
    ],
    benefits: ["Home office stipend", "Health insurance", "Learning budget"],
    postedDaysAgo: 4
  }
];

// Normalize and attach backward-compatible aliases to every job record
export const mockJobs = RAW_JOBS.map((job) => {
  const postedDate = new Date(Date.now() - (job.postedDaysAgo || 1) * 24 * 3600 * 1000).toISOString();

  return {
    ...job,
    // Required fields: id, title, company, location, type, experienceLevel, skillsRequired, description, salary
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    experienceLevel: job.experienceLevel,
    skillsRequired: job.skillsRequired,
    description: job.description,
    salary: job.salary,

    // Backward-compatible aliases for existing components
    workMode: job.type,
    seniority: job.experienceLevel,
    requiredSkills: job.skillsRequired,
    preferredSkills: job.preferredSkills || [],
    techStack: Array.from(new Set([...(job.skillsRequired || []), ...(job.preferredSkills || [])])),
    overview: job.description,
    postedDate,
    responsibilities: job.responsibilities || [
      `Design and build reliable software features for ${job.title}.`,
      "Collaborate with cross-functional team members on code reviews and architecture.",
      "Maintain high test coverage and system stability."
    ],
    qualifications: job.qualifications || [
      `${job.experienceYearsRequired}+ years professional software development experience.`,
      `Demonstrated mastery with ${job.skillsRequired.slice(0, 3).join(", ")}.`
    ],
    benefits: job.benefits || [
      "Competitive base salary with equity options",
      "Comprehensive medical, dental, and vision insurance",
      "Flexible remote work policies and retirement matching"
    ]
  };
});

export const initialMockJobs = mockJobs;
export default mockJobs;
