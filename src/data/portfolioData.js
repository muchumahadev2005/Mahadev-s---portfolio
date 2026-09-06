/**
 * Centralized Portfolio Configuration for Muchu Mahadev
 * Software Developer | Full-Stack Engineer | Backend Architect
 */

export const personalData = {
  name: "Muchu Mahadev",
  shortName: "Mahadev",
  initials: "MM",
  role: "Software Developer",
  tagline: "Engineering resilient full-stack systems, hardened backend APIs, and AI-integrated workflows.",
  bio: {
    lead: "Computer Science undergraduate at SRKR Engineering College (CGPA 8.30/10) specializing in scalable full-stack web platforms, hardened backend APIs, and modern system architectures.",
    short: "Full-Stack & Backend Systems Developer engineering resilient Node.js backends, optimized PostgreSQL databases, and AI-integrated workflows.",
  },
  location: "Bhimavaram, India",
  timezone: "Asia/Kolkata", // IST (UTC+5:30)
  status: "Available for Software Engineering Roles & Collaborations",
  email: "mahadevmuchu9977@gmail.com",
  phone: "+91 9392539153",
  avatar: "/profile.jpg",
  resumeUrl: "/resume.pdf",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muchumahadev", handle: "in/muchumahadev" },
    { name: "GitHub", url: "https://github.com/MuchuMahadev", handle: "MuchuMahadev" },
    { name: "Email", url: "mailto:mahadevmuchu9977@gmail.com", handle: "mahadevmuchu9977@gmail.com" },
    { name: "Phone", url: "tel:+919392539153", handle: "+91 9392539153" },
  ],
  stats: [
    { label: "Internships Completed", value: 2, suffix: "+" },
    { label: "Flagship Projects", value: 4, suffix: "+" },
    { label: "B.Tech CGPA", value: 8.3, suffix: "" },
    { label: "AI Research Iterations", value: 2, suffix: "×" },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (Design)",
      institution: "SRKR Engineering College",
      period: "2023 — Expected Apr 2027",
      grade: "CGPA: 8.30 / 10.0",
      location: "Bhimavaram, India",
      details: "Curriculum focused on software engineering, database architectures, system design, and AI algorithms.",
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      period: "2021 — 2023",
      grade: "Percentage: 93.6%",
      location: "Andhra Pradesh, India",
      details: "Rigorous analytical training in Mathematics, Physics, and Chemistry.",
    },
  ],
  certifications: [
    {
      name: "Privacy and Security in Online Social Media",
      issuer: "NPTEL",
      type: "Certification",
      year: "2025",
    },
    {
      name: "Java (Basics)",
      issuer: "HackerRank",
      type: "Skill Certification",
      year: "2024",
    },
  ],
};

export const projects = [
  {
    id: "digital-khata",
    title: "DIGITAL KHATA // VOICE LEDGER",
    subtitle: "Voice-Powered Merchant Bookkeeping System",
    category: "Full-Stack / Voice UI / Web Speech API",
    year: "2026",
    description: "A modern digital khata system with voice commands built for shopkeepers to track customer debts, manage transactions, and maintain ledger records effortlessly — replacing traditional paper ledgers with a voice-driven digital workflow.",
    longDescription: "Engineered specifically for local retail shopkeepers to streamline debit and credit accounting. Features natural voice command recognition via the Web Speech API, instant transaction logging, automated customer balance calculations, and a high-contrast responsive interface optimized for mobile and desktop counters.",
    metrics: "Live on Vercel • Voice Recognition • Zero Paper Friction",
    tags: ["Voice UI", "Web Speech API", "React.js", "Ledger Management", "Shopkeeper Tools", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    color: "#06B6D4",
    liveUrl: "https://khata-pi.vercel.app/login",
    githubUrl: "https://github.com/MuchuMahadev",
  },
  {
    id: "securesend",
    title: "SECURESEND // ENCRYPTED COMMS",
    subtitle: "Zero-Knowledge Ephemeral Messaging Platform",
    category: "Security / Cryptography / Full-Stack",
    year: "2026",
    description: "Zero-knowledge platform supporting encrypted text, image, voice, and file messaging. Built RSA-AES encryption workflows with browser-side encryption, JWT authentication, secure link generation, message expiration, rate-limiting, and alias-based identity management.",
    longDescription: "Architected around client-side end-to-end cryptographic principles. Implemented hybrid RSA-AES encryption pipelines in the browser before payload transmission, ensuring the backend server never stores plain-text secrets. Features expiring self-destruct links, IP rate limiting via Express middleware, MongoDB TTL collections, and alias-based anonymous routing.",
    metrics: "Zero-Knowledge Encryption • RSA-AES Workflows • Ephemeral Links",
    tags: ["Node.js", "Express.js", "MongoDB", "React.js", "Tailwind CSS", "RSA-AES Encryption", "JWT Auth"],
    image: "/securesend.jpg",
    color: "#8B5CF6",
    liveUrl: "https://message.securesend.co.in/",
    githubUrl: "https://github.com/MuchuMahadev",
  },
  {
    id: "ai-exam-system",
    title: "AI EXAM CONDUCTING SYSTEM",
    subtitle: "Autonomous Evaluation & Question Generator",
    category: "AI Automation / n8n / Docker / RAG",
    year: "2026",
    description: "AI-powered exam platform supporting 3 user roles with automated question generation. RESTful APIs for exam creation, answer submission, and evaluation. JWT authentication and RBAC for role-based access. Automated AI workflows using n8n and Ollama for syllabus-based question generation and evaluation. Containerized with Docker, using PostgreSQL with pgvector.",
    longDescription: "Enterprise-grade academic assessment infrastructure. Incorporates local LLM inference with Ollama and autonomous agentic workflow orchestration through n8n. Utilizes PostgreSQL paired with the pgvector extension for retrieval-augmented generation (RAG) against institutional syllabi. Complete containerization with Docker ensures reproducible microservice deployment.",
    metrics: "3 User Roles • n8n + Ollama AI • Docker & PostgreSQL pgvector",
    tags: ["Ollama", "n8n", "Docker", "PostgreSQL", "pgvector", "RAG", "RBAC", "REST APIs"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    liveUrl: "https://github.com/MuchuMahadev",
    githubUrl: "https://github.com/MuchuMahadev",
  },
  {
    id: "temple-management",
    title: "DIVINE CONNECTION // TEMPLE PORTAL",
    subtitle: "Enterprise Devotee & Service Workflow Platform",
    category: "Backend Engineering / Twilio / MongoDB",
    year: "2025",
    description: "Scalable backend for managing users, temple operations, and service workflows. RESTful APIs with secure CRUD operations and RBAC. Twilio OTP authentication for user verification. MongoDB data models with environment-based configuration. APIs for event scheduling, booking management, and devotee communication.",
    longDescription: "Engineered a high-concurrency backend service automating temple rituals, devotee registrations, and seva scheduling. Implemented Twilio Verify OTP integration for fraud-free SMS verification. Designed relational and document-based indexing strategies across MongoDB collections to ensure sub-15ms response times under festival peak traffic.",
    metrics: "Twilio OTP Verification • Scalable CRUD • Event Scheduling",
    tags: ["Node.js", "Express.js", "MongoDB", "Twilio OTP", "RBAC", "Booking System", "RESTful APIs"],
    image: "/temple-portal.jpg",
    color: "#F59E0B",
    liveUrl: "https://divine-connection-portal.vercel.app/",
    githubUrl: "https://github.com/MuchuMahadev",
  },
];

export const experience = [
  {
    period: "Apr 2026 — Jun 2026",
    role: "MERN Stack Intern",
    company: "SOCIOCLUB SUPERAPP // NO BALL ENTERTAINMENTS PVT LTD",
    location: "Internship",
    description: "Developed scalable full-stack applications using React.js, Node.js, Express.js, and PostgreSQL for an expansive children's learning and superapp ecosystem.",
    highlights: [
      "Developed scalable full-stack applications using React.js, Node.js, Express.js, and PostgreSQL",
      "Designed and implemented RESTful APIs, backend microservices, and optimized database schemas",
      "Built AI-powered interactions and interactive gamification features for a children's learning platform",
      "Implemented role-based access control (RBAC), JWT authentication, and secure application workflows",
    ],
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "RBAC", "REST APIs"],
  },
  {
    period: "Dec 2025 — Feb 2026",
    role: "AI/ML Research Intern",
    company: "AICTE IDEALAB // SRKR ENGINEERING COLLEGE",
    location: "Research Lab • Bhimavaram",
    description: "Engineered an intelligent credit card fraud detection pipeline through 2 iterative development stages utilizing scikit-learn, Pandas, and feature engineering.",
    highlights: [
      "Engineered a credit card fraud detection pipeline through 2 iterative stages using scikit-learn and Pandas",
      "Conducted extensive data preprocessing, imbalance mitigation, and model evaluation benchmarks",
      "Presented the final project at Technology Centre I-Hub, Chinnamiram to faculty and industry evaluators; received official certification",
    ],
    tech: ["Python", "scikit-learn", "Pandas", "Machine Learning", "Data Science"],
  },
];

export const skills = {
  marquee1: [
    "Node.js", "Express.js", "React.js", "PostgreSQL", "MongoDB",
    "Docker", "Python", "Java", "SQL", "Tailwind CSS", "REST APIs",
  ],
  marquee2: [
    "JWT & OAuth", "RBAC Security", "n8n Automation", "Ollama LLM",
    "pgvector & RAG", "scikit-learn", "Pandas", "Twilio OTP", "Git & GitHub", "Postman",
  ],
  categories: [
    {
      title: "Backend & Security",
      icon: "Cpu",
      items: [
        "Node.js & Express.js",
        "RESTful API Architecture",
        "JWT, OAuth & bcrypt",
        "Role-Based Access Control (RBAC)",
        "API Rate Limiting & Auth Workflows",
        "Twilio SMS & OTP Verification",
      ],
    },
    {
      title: "Databases & Storage",
      icon: "Activity",
      items: [
        "PostgreSQL (Relational)",
        "MongoDB & Mongoose (Document)",
        "SQL Query Optimization",
        "PostgreSQL with pgvector",
        "Schema Design & Indexing",
        "Database Migrations & TTL",
      ],
    },
    {
      title: "Frontend & Architecture",
      icon: "Sparkles",
      items: [
        "React.js & Component Design",
        "Tailwind CSS & Responsive UI",
        "Web Speech API (Voice UI)",
        "State Management & Hooks",
        "Framer Motion & Micro-Interactions",
        "Clean Modular Architecture",
      ],
    },
    {
      title: "DevOps, Tools & AI",
      icon: "Award",
      items: [
        "Docker Containerization",
        "n8n Workflow Automation",
        "Ollama Local LLM & RAG",
        "scikit-learn & Pandas (ML)",
        "Git, GitHub & Postman",
        "VS Code & Linux Environment",
      ],
    },
  ],
  detailedSkills: [
    {
      id: "docker",
      name: "Docker",
      category: "devops",
      categoryName: "DevOps & Infrastructure",
      level: "Production-Grade",
      color: "cyan",
      description: "Containerizing backend Node.js microservices, isolating database instances, and configuring reproducible multi-stage production builds.",
      appliedIn: [
        { name: "SecureSend Messaging", type: "Project", link: "#projects" },
        { name: "Local Microservices", type: "Infrastructure" }
      ],
      capabilities: [
        "Multi-stage Dockerfiles",
        "Container Networking & Volumes",
        "Docker Compose Stacks",
        "Dev/Prod Environment Parity"
      ],
      related: ["Linux", "Git", "Node.js", "CI/CD Workflows"]
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      categoryName: "Backend & Systems",
      level: "Core Mastery",
      color: "emerald",
      description: "Engineering scalable asynchronous backend architectures, event-driven microservices, and sub-second RESTful APIs.",
      appliedIn: [
        { name: "SocioClub SuperApp", type: "Internship", link: "#timeline" },
        { name: "Digital Khata", type: "Project", link: "#projects" },
        { name: "SecureSend", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Asynchronous Event Loop",
        "RESTful API Engineering",
        "Microservices Architecture",
        "Secure Middleware Pipelines"
      ],
      related: ["Express.js", "PostgreSQL", "JWT", "REST APIs"]
    },
    {
      id: "expressjs",
      name: "Express.js",
      category: "backend",
      categoryName: "Backend & Systems",
      level: "Core Mastery",
      color: "emerald",
      description: "Building robust HTTP web services, modular routing hierarchies, middleware security pipelines, and custom error boundaries.",
      appliedIn: [
        { name: "SocioClub SuperApp", type: "Internship", link: "#timeline" },
        { name: "Digital Khata", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Modular Route Architecture",
        "CORS & Security Middleware",
        "Request Validation & Sanitization",
        "Centralized Error Handling"
      ],
      related: ["Node.js", "REST APIs", "JWT"]
    },
    {
      id: "reactjs",
      name: "React.js",
      category: "frontend",
      categoryName: "Frontend & UI",
      level: "Production-Grade",
      color: "cyan",
      description: "Architecting modern, responsive user interfaces with modular component trees, custom hooks, and high-performance animation flows.",
      appliedIn: [
        { name: "Digital Khata (Voice Ledger)", type: "Project", link: "#projects" },
        { name: "SecureSend", type: "Project", link: "#projects" },
        { name: "Divine Connection Portal", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Custom Hooks & State Management",
        "Voice Web Speech API Integration",
        "Framer Motion Micro-Interactions",
        "Responsive Component Architecture"
      ],
      related: ["Tailwind CSS", "Vite", "JavaScript", "Web Speech API"]
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "database",
      categoryName: "Databases & Storage",
      level: "Core Mastery",
      color: "cyan",
      description: "Architecting relational database schemas, foreign key integrity, index optimization, and semantic search integration with pgvector.",
      appliedIn: [
        { name: "SocioClub SuperApp", type: "Internship", link: "#timeline" },
        { name: "Digital Khata", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "ACID Relational Schemas",
        "B-Tree & GIN Index Tuning",
        "pgvector Semantic Search",
        "Sub-second Query Optimization"
      ],
      related: ["SQL", "Node.js", "Schema Design", "pgvector"]
    },
    {
      id: "mongodb",
      name: "MongoDB",
      category: "database",
      categoryName: "Databases & Storage",
      level: "Production-Grade",
      color: "emerald",
      description: "Document-oriented data modeling with Mongoose schemas, compound indexes, aggregation pipelines, and TTL data expiry collections.",
      appliedIn: [
        { name: "SecureSend Messaging", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Mongoose Document Schemas",
        "Aggregation Pipelines",
        "TTL Ephemeral Data Expiry",
        "Zero-Knowledge Payload Storage"
      ],
      related: ["Node.js", "Express.js", "NoSQL"]
    },
    {
      id: "python",
      name: "Python",
      category: "ai",
      categoryName: "AI & Data Science",
      level: "Research & Applied",
      color: "amber",
      description: "Data preprocessing, automated ML pipelines, algorithm benchmarks, and machine learning feature engineering.",
      appliedIn: [
        { name: "AICTE IDEALab Fraud Detection", type: "Internship", link: "#timeline" }
      ],
      capabilities: [
        "scikit-learn ML Pipelines",
        "Pandas Data Wrangling",
        "Class Imbalance Handling (SMOTE)",
        "Model Metric Benchmarking"
      ],
      related: ["scikit-learn", "Pandas", "Machine Learning"]
    },
    {
      id: "java",
      name: "Java",
      category: "backend",
      categoryName: "Core Systems & OOP",
      level: "Certified (HackerRank)",
      color: "amber",
      description: "Strong object-oriented architecture, data structures, algorithms, memory management, and concurrent computing foundations.",
      appliedIn: [
        { name: "HackerRank Java Certified", type: "Certification", link: "#timeline" }
      ],
      capabilities: [
        "Object-Oriented Design (OOP)",
        "Data Structures & Algorithms",
        "JVM Memory Mechanics",
        "Robust Exception Handling"
      ],
      related: ["OOP", "Data Structures", "System Design"]
    },
    {
      id: "jwt-rbac",
      name: "JWT & RBAC",
      category: "backend",
      categoryName: "Backend & Security",
      level: "Hardened Security",
      color: "violet",
      description: "Cryptographic token issuance, refresh rotation, role-based access control matrices, and zero-trust verification pipelines.",
      appliedIn: [
        { name: "SocioClub SuperApp", type: "Internship", link: "#timeline" },
        { name: "SecureSend", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Cryptographic Token Signing",
        "RBAC Permission Matrices",
        "Secure Token Expiration & Refresh",
        "Bcrypt Password Hashing"
      ],
      related: ["OAuth", "Node.js", "Security Protocols"]
    },
    {
      id: "ollama-rag",
      name: "Ollama LLM & RAG",
      category: "ai",
      categoryName: "AI & Automation",
      level: "Applied AI",
      color: "violet",
      description: "Local LLM orchestration, semantic vector retrieval using pgvector, and privacy-preserving retrieval-augmented generation.",
      appliedIn: [
        { name: "Local AI Workflows", type: "Research" },
        { name: "SocioClub AI Gamification", type: "Internship", link: "#timeline" }
      ],
      capabilities: [
        "Local Model Orchestration",
        "Vector Embeddings (pgvector)",
        "RAG Retrieval Pipelines",
        "Prompt Engineering"
      ],
      related: ["Python", "pgvector", "n8n"]
    },
    {
      id: "scikit-learn",
      name: "scikit-learn & Pandas",
      category: "ai",
      categoryName: "AI & Data Science",
      level: "Research Lab",
      color: "violet",
      description: "Supervised ML training, feature selection, random forests, confusion matrix evaluation, and dataset class rebalancing.",
      appliedIn: [
        { name: "AICTE IDEALab Research", type: "Internship", link: "#timeline" }
      ],
      capabilities: [
        "Feature Engineering & Scaling",
        "Random Forest Classifiers",
        "Class Imbalance Handling",
        "ROC-AUC Evaluation"
      ],
      related: ["Python", "Machine Learning", "Data Analysis"]
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "frontend",
      categoryName: "Frontend & UI",
      level: "Design System",
      color: "cyan",
      description: "Building modern glassmorphic design systems, responsive micro-layouts, custom gradients, and design token integration.",
      appliedIn: [
        { name: "All Flagship Web Portals", type: "Design System", link: "#projects" }
      ],
      capabilities: [
        "Utility-First Responsive Grids",
        "Custom Design Tokens & HSL",
        "Glassmorphic Blur Layers",
        "Micro-Interactions"
      ],
      related: ["React.js", "Framer Motion", "UI/UX"]
    },
    {
      id: "n8n",
      name: "n8n Automation",
      category: "devops",
      categoryName: "DevOps & Automation",
      level: "Workflow Engineering",
      color: "rose",
      description: "Designing node-based visual workflow automation, webhook routing, data transformations, and automated AI pipelines.",
      appliedIn: [
        { name: "Automated Backend Workflows", type: "Tooling" }
      ],
      capabilities: [
        "Webhook Triggers & Listeners",
        "REST API Data Mapping",
        "Multi-Service Orchestration",
        "Automated Error Alerts"
      ],
      related: ["Docker", "REST APIs", "Node.js"]
    },
    {
      id: "web-speech",
      name: "Web Speech API",
      category: "frontend",
      categoryName: "Frontend & Voice UI",
      level: "Specialized Voice UI",
      color: "cyan",
      description: "Voice-driven user interfaces allowing hands-free transaction logging, natural language debit/credit commands, and instant voice feedback.",
      appliedIn: [
        { name: "Digital Khata Voice Ledger", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Speech-to-Text Recognition",
        "Voice Command Parsing",
        "Zero-Touch Transaction Entry",
        "Browser Audio Interfaces"
      ],
      related: ["React.js", "Voice UI", "JavaScript"]
    },
    {
      id: "sql",
      name: "SQL & Query Tuning",
      category: "database",
      categoryName: "Databases & Storage",
      level: "Core Mastery",
      color: "cyan",
      description: "Writing complex relational joins, subqueries, indexing strategies (B-tree, GIN), and transaction isolation levels.",
      appliedIn: [
        { name: "SocioClub Datastores", type: "Internship", link: "#timeline" },
        { name: "Digital Khata", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Complex JOINs & Aggregations",
        "B-Tree & Hash Indexing",
        "Transaction Management (ACID)",
        "Query Execution Analysis"
      ],
      related: ["PostgreSQL", "Database Design", "Backend"]
    },
    {
      id: "rest-apis",
      name: "REST APIs",
      category: "backend",
      categoryName: "Backend & Systems",
      level: "Core Mastery",
      color: "emerald",
      description: "Clean RESTful resource design, HTTP status codes, idempotency, versioning, request validation, and comprehensive Postman documentation.",
      appliedIn: [
        { name: "SocioClub SuperApp", type: "Internship", link: "#timeline" },
        { name: "Digital Khata", type: "Project", link: "#projects" },
        { name: "SecureSend", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "Resource Modeling & Pagination",
        "Request Validation & Sanitization",
        "Rate Limiting & Throttling",
        "Postman Collections"
      ],
      related: ["Node.js", "Express.js", "JWT"]
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "devops",
      categoryName: "DevOps & Tools",
      level: "Daily Production",
      color: "slate",
      description: "Branching workflows, atomic commits, pull requests, code reviews, and version control best practices.",
      appliedIn: [
        { name: "All Projects & Repositories", type: "Version Control" }
      ],
      capabilities: [
        "Branch Management & PRs",
        "Merge Conflict Resolution",
        "Semantic Versioning",
        "GitHub Workflows"
      ],
      related: ["VS Code", "Linux", "Team Collaboration"]
    },
    {
      id: "twilio",
      name: "Twilio OTP",
      category: "backend",
      categoryName: "Backend & Security",
      level: "Production Integration",
      color: "rose",
      description: "Two-factor authentication (2FA), automated SMS one-time password dispatch, and secure phone verification.",
      appliedIn: [
        { name: "Digital Khata Verification", type: "Project", link: "#projects" }
      ],
      capabilities: [
        "SMS Gateway Dispatch",
        "Time-Based OTP Validation",
        "Anti-Abuse Rate Throttling",
        "Webhook Delivery Confirmation"
      ],
      related: ["Node.js", "Security", "REST APIs"]
    }
  ]
};

export const testimonials = [
  {
    quote: "Engineered scalable REST APIs, secure RBAC auth, and optimized PostgreSQL schemas for SocioClub with exceptional speed.",
    author: "Engineering Lead",
    role: "Technical Lead",
    company: "No Ball Entertainments Pvt Ltd",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    badge: "SocioClub SuperApp Lead",
  },
  {
    quote: "Engineered a high-precision ML fraud detection pipeline with remarkable rigor. Commended by evaluators at Technology Centre I-Hub.",
    author: "Lab Coordinator",
    role: "Project Director",
    company: "AICTE IDEALab, SRKR",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    badge: "AICTE IDEALab Certification",
  },
];
