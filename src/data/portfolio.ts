// ============================================================
// Portfolio content — edit this file to update the site.
// Everything on every page is rendered from these exports.
// ============================================================

export const site = {
  url: "https://hemachandrand.github.io",
  title: "Hemachandran Dhinakaran — Enterprise AI Engineer",
  description:
    "Hemachandran Dhinakaran — Enterprise AI Engineer building agentic systems, LLM observability, and MLOps platforms that hold up in production.",
};

// Career started June 2018. Every "years of experience" figure derives
// from this. The site is rebuilt monthly (see the deploy workflow), so
// the number stays current without anyone touching it.
const CAREER_START = new Date(2018, 5);
export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000),
);

export const profile = {
  name: "Hemachandran Dhinakaran",
  firstName: "Hemachandran",
  lastName: "Dhinakaran",
  shortName: "Hemz",
  title: "Enterprise AI Engineer",
  avatarUrl: "/profile.webp",
  timeZone: "America/New_York",
  taglines: [
    "shipping agents that survive production.",
    "watching every thought an agent has.",
    "turning coffee into tokens since 2018.",
    "making machines think, one prompt at a time.",
  ],
  summary:
    "I build the machinery behind production AI: agentic systems, the observability that makes them trustworthy, and the MLOps & LLMOps that keep them running at enterprise scale.",
  about: [
    `For ${yearsOfExperience}+ years I've shipped agentic AI systems, the observability platforms that make them trustworthy, and the MLOps & LLMOps frameworks that keep them running at enterprise scale across retail, healthcare, and CPG.`,
    "My favorite territory is the gap between a promising demo and a dependable product. That's where the hard problems live: evaluation, observability, guardrails, and the unglamorous engineering that turns a clever model into something a business can trust.",
    "Under it all is plain curiosity about the technology, and about how it reshapes the industries and people around it. It's what keeps me experimenting, writing, and shipping.",
  ],
};

export const email = "hema18deena@gmail.com";

export const links = {
  github: "https://github.com/HemachandranD",
  linkedin: "https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b",
  medium: "https://hemz.medium.com",
  // Set to a real resume URL to show a Resume button; null hides it.
  resume: null as string | null,
};

export type Experience = {
  company: string;
  companyUrl?: string;
  title: string;
  type: string;
  start: string; // "YYYY-MM"
  end: string | null; // null = present
  description: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Tredence Inc",
    companyUrl: "https://www.tredence.com/",
    title: "Enterprise AI Engineer",
    type: "Full-time",
    start: "2023-08",
    end: null,
    description:
      "Building enterprise AI products end to end: multi-agent systems, LLM-powered observability platforms, and production-grade MLOps & LLMOps frameworks serving CPG, retail, and healthcare clients.",
    tags: ["Agentic AI", "LLMOps", "MLOps", "Python", "Azure", "Databricks"],
  },
  {
    company: "Atos",
    companyUrl: "https://atos.net/",
    title: "Machine Learning Engineer",
    type: "Full-time",
    start: "2021-12",
    end: "2023-08",
    description:
      "Designed MLOps platforms on Databricks with end-to-end monitoring. Built data-centric AI pipelines with CI/CD handling end-user claims for a health-tech giant, and reverse-engineered legacy statistical SQL models into ML pipelines that cut business losses from claims.",
    tags: ["MLOps", "Databricks", "Azure ML", "CI/CD", "Python"],
  },
  {
    company: "Tata Consultancy Services",
    companyUrl: "https://www.tcs.com/",
    title: "Machine Learning Practitioner",
    type: "Full-time",
    start: "2018-06",
    end: "2021-12",
    description:
      "Built a self-heal automation API in Python: a Random Forest model that reads ticket parameters straight from the ticketing tool and triggers end-to-end remediation, cutting manual effort by 40%.",
    tags: ["Python", "Machine Learning", "Automation", "Random Forest"],
  },
];

export const education = [
  {
    institution: "Stanford Online",
    institutionUrl: "https://online.stanford.edu/",
    degree: "Certificate · Machine Learning",
    period: "2020 — 2021",
  },
  {
    institution: "Sri Sairam Institute of Technology",
    institutionUrl: null,
    degree: "Bachelor of Engineering · Electronics & Communication",
    period: "2014 — 2018",
  },
];

export type SkillIcon =
  | "agents"
  | "observability"
  | "mlops"
  | "rag"
  | "llm"
  | "ml"
  | "perception"
  | "data"
  | "cloud";

export type SkillArea = {
  category: string;
  icon: SkillIcon;
  summary: string;
  items: string[];
};

// Core expertise — the three areas of AI engineering I work in.
export const skills: SkillArea[] = [
  {
    category: "Agentic Solutions",
    icon: "agents",
    summary:
      "Multi-agent systems that plan, use tools, and hold up in production, not just in the demo.",
    items: [
      "LangChain",
      "LlamaIndex",
      "CrewAI",
      "MCP",
      "Bedrock AgentCore",
      "Tool use",
      "Multi-agent orchestration",
    ],
  },
  {
    category: "Observability Platforms",
    icon: "observability",
    summary:
      "Tracing, evaluation, and guardrails that make every step an agent takes visible and debuggable.",
    items: ["OpenTelemetry", "Arize Phoenix", "Langfuse", "SigNoz", "LLM evaluation", "Guardrails"],
  },
  {
    category: "MLOps & LLMOps",
    icon: "mlops",
    summary:
      "Paved roads from experiment to production: CI/CD, retraining, deployment, and drift monitoring.",
    items: [
      "Databricks",
      "Azure ML",
      "Azure DevOps",
      "CI/CD",
      "Model versioning",
      "Evaluation gates",
      "Drift monitoring",
    ],
  },
];

// The rest of the AI engineering stack.
export const stackSkills: SkillArea[] = [
  {
    category: "RAG & Retrieval",
    icon: "rag",
    summary: "Retrieval pipelines that ground LLMs in private data, with memory and chat history.",
    items: ["LangChain", "LlamaIndex", "Qdrant", "Pinecone", "FAISS", "Redis"],
  },
  {
    category: "LLMs & Fine-tuning",
    icon: "llm",
    summary: "Choosing, prompting, and fine-tuning models to fit the task and the budget.",
    items: ["Fine-tuning", "Prompt engineering", "Llama 3", "Claude", "Local LLMs"],
  },
  {
    category: "ML & Deep Learning",
    icon: "ml",
    summary: "From classical models to deep nets, trained and shipped as real services.",
    items: ["Classical ML", "Deep learning", "Transfer learning", "Random Forest"],
  },
  {
    category: "Vision & Audio",
    icon: "perception",
    summary: "Models that see and listen: image recognition, transcription, and summarization.",
    items: ["Image classification", "EfficientNetV2", "Speech-to-text", "Summarization", "Streamlit"],
  },
  {
    category: "Data Engineering",
    icon: "data",
    summary: "Data-centric pipelines that feed models clean, trustworthy data at scale.",
    items: ["Python", "Spark", "Databricks", "SQL", "Data pipelines"],
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    summary: "Azure first, AWS and GCP when the problem calls for them, all automated.",
    items: ["Azure AI Services", "AWS", "GCP", "Containers", "CI/CD"],
  },
];

export const industries = ["Retail", "Healthcare", "CPG"];

export const projectCategories = [
  "Agents & Tools",
  "Observability",
  "MLOps & LLMOps",
  "RAG & LLMs",
  "Vision & Audio",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image?: string; // path under /public; generated cover art when omitted
  liveUrl?: string;
  githubUrl?: string; // the project repo, not the profile
  articleUrl?: string;
};

// Newest first. The first three are featured on the home page.
export const projects: Project[] = [
  {
    id: "notionwiki",
    title: "NotionWiki",
    subtitle: "A Notion wiki your AI assistant can understand",
    year: 2026,
    category: "Agents & Tools",
    description:
      "An open-source CLI that turns a Notion workspace into a flat, indexed markdown wiki an AI assistant can actually reason over: immutable raw sources, agent-curated synthesis on top, OS-native scheduled sync, and a force-directed graph view.",
    tags: ["AI Assistants", "Notion API", "Python", "CLI"],
    githubUrl: "https://github.com/HemachandranD/notionwiki",
    articleUrl:
      "https://hemz.medium.com/notionwiki-a-notion-workspace-wiki-your-ai-assistant-can-understand-5a822ce0cdc4",
  },
  {
    id: "observent",
    title: "Observent",
    subtitle: "Claude Code plugin for AI observability",
    year: 2026,
    category: "Observability",
    description:
      "A Claude Code plugin and Agent Skills that wire observability into multi-agent AI apps in one command: it detects your agent framework, instruments traces to Phoenix, Langfuse, or SigNoz, and validates the span hierarchy end to end.",
    tags: ["AI Observability", "Claude Code", "OpenTelemetry", "Agents"],
    githubUrl: "https://github.com/HemachandranD/observent",
    articleUrl:
      "https://medium.com/towardsdev/observent-claude-code-plugin-for-ai-observability-c8f022ced63e",
  },
  {
    id: "harness-mcp",
    title: "Harness MCP",
    subtitle: "Reusable private AI toolkit",
    year: 2025,
    category: "Agents & Tools",
    description:
      "A private, reusable AI toolkit built on the Model Context Protocol: write a capability once and plug it into any MCP-aware client, without your data ever leaving your walls.",
    tags: ["MCP", "AI Tools", "Python"],
    articleUrl:
      "https://hemz.medium.com/harnessing-mcp-building-a-reusable-and-private-ai-toolkit-33f5ffc53d62",
  },
  {
    id: "bedrock-agentcore",
    title: "Amazon Bedrock AgentCore",
    subtitle: "Taking AI agents to production on AWS",
    year: 2025,
    category: "Agents & Tools",
    description:
      "A hands-on tour of Amazon Bedrock AgentCore, the managed runtime for deploying AI agents with memory, identity, and tool access, and what it takes to move an agent from laptop to production.",
    tags: ["Amazon Bedrock", "AgentCore", "AI Agents"],
    articleUrl:
      "https://hemz.medium.com/quickstart-amazon-bedrock-agentcore-for-agents-7c439252f7e0",
  },
  {
    id: "llmops-platform",
    title: "LLMOps Platform",
    subtitle: "Full LLM lifecycle on Databricks",
    year: 2024,
    category: "MLOps & LLMOps",
    description:
      "A full lifecycle platform for LLMs on Databricks: model versioning, evaluation gates, deployment automation, and monitoring. The paved road from experiment to production.",
    tags: ["LLMOps", "GenAI", "Databricks", "Python"],
    articleUrl:
      "https://hemz.medium.com/mastering-llmops-building-a-powerful-llmops-platform-with-databricks-954f77060948",
  },
  {
    id: "local-rag",
    title: "Local RAG Application",
    subtitle: "Secure RAG with LangChain",
    year: 2024,
    category: "RAG & LLMs",
    description:
      "A production-grade RAG chatbot that never phones home. LangChain, Llama 3, Qdrant, and Redis with full chat history, built for sensitive data that must stay on local infrastructure.",
    tags: ["RAG", "LangChain", "Llama 3", "Qdrant", "Redis"],
    articleUrl:
      "https://hemz.medium.com/build-a-secure-local-rag-application-with-chat-history-using-langchain-llama3-qdrant-redis-986be3628a94",
  },
  {
    id: "foodsight",
    title: "FoodSight",
    subtitle: "AI food recognition",
    year: 2024,
    category: "Vision & Audio",
    description:
      "A food-recognition web app fine-tuned on EfficientNetV2 with the Food101 dataset. Point it at a plate and it names the dish in real time.",
    tags: ["Deep Learning", "Computer Vision", "Streamlit"],
    liveUrl: "https://foodsight.streamlit.app",
  },
  {
    id: "mlops-platform",
    title: "MLOps Platform",
    subtitle: "Plug-and-play MLOps framework",
    year: 2023,
    category: "MLOps & LLMOps",
    description:
      "A plug-and-play MLOps framework with CI/CD on Azure DevOps: continuous retraining, automated deployment, and drift monitoring, built for enterprise-scale ML operations.",
    tags: ["MLOps", "Databricks", "CI/CD", "Azure DevOps"],
    articleUrl:
      "https://hemz.medium.com/mastering-mlops-building-a-powerful-mlops-platform-with-databricks-5ec4b43f6aa5",
  },
  {
    id: "ask-audio",
    title: "Ask Audio",
    subtitle: "AI audio analysis",
    year: 2023,
    category: "Vision & Audio",
    description:
      "Feed it hours of recordings and get back the parts that matter: transcription, key insights, and intelligent summaries distilled from raw audio.",
    tags: ["NLP", "Speech-to-text", "Audio", "Python"],
    articleUrl: "https://www.linkedin.com/pulse/ask-audio-hemachandran-dhinakaran",
  },
];

// The toolbox marquee on the home and skills pages.
export const toolbox = [
  "Python",
  "LangChain",
  "LlamaIndex",
  "CrewAI",
  "MCP",
  "Claude",
  "Amazon Bedrock",
  "OpenTelemetry",
  "Arize Phoenix",
  "Langfuse",
  "SigNoz",
  "Databricks",
  "Spark",
  "Azure ML",
  "Azure DevOps",
  "AWS",
  "GCP",
  "Qdrant",
  "Pinecone",
  "FAISS",
  "Redis",
  "Llama 3",
  "EfficientNetV2",
  "Streamlit",
];
