// ============================================================
// Portfolio Configuration — Edit this file to update your data
// ============================================================

// Career started June 2018 — every "years of experience" figure on the
// site derives from this so the numbers never drift out of date.
const CAREER_START = new Date(2018, 5); // June 2018
export const yearsOfExperience = Math.floor(
    (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000)
);

export const profile = {
    name: "Hemachandran Dhinakaran",
    shortName: "Hemz",
    title: "Enterprise AI Engineer",
    age: null, // set your age or leave null to hide
    status: "Building the future with AI",
    statusEmoji: "🚀",
    avatarUrl: "/profile.png", // Local image in public/ folder
    taglines: [
        "Enterprise AI Engineer",
        "Shipping agents that survive production",
        "Watching every thought an agent has",
        "Turning coffee into tokens since 2018",
        "Making machines think, one prompt at a time",
    ],
    about: [
        `I build the machinery behind production AI. ${yearsOfExperience}+ years of agentic systems, LLM observability platforms, and MLOps & LLMOps frameworks that hold up under enterprise load across CPG, retail, and healthcare.`,
        "My favorite territory is the gap between a promising demo and a dependable product. That's where the hard problems live: evaluation, observability, guardrails, and the unglamorous engineering that turns a clever model into something a business can trust.",
        "Under it all is plain curiosity about the technology, and about how it reshapes the industries and people around it. It's what keeps me experimenting, writing, and shipping.",
    ],
};

export const links = {
    github: "https://github.com/HemachandranD",
    linkedin: "https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b",
    medium: "https://hemz.medium.com",
    mail: "mailto:hema18deena@gmail.com",
    // Set to your real resume URL to show the Resume button, e.g.
    // "https://drive.google.com/file/d/<file-id>/view" — leaving it null
    // hides the button instead of shipping a broken link.
    resume: null,
};

export const experience = [
    {
        company: "Tredence Inc",
        companyUrl: "https://www.tredence.com/",
        roles: [
            {
                title: "Enterprise AI Engineer",
                type: "Full-time",
                period: "Aug 2023 — Present",
                description: "Building enterprise AI products end to end multi-agent systems, LLM-powered observability platforms, and production-grade MLOps & LLMOps frameworks serving CPG, retail, and healthcare clients.",
            },
        ],
        tags: ["Agentic AI", "LLMOps", "MLOps", "Python", "Azure", "Databricks"],
    },
    {
        company: "Atos",
        companyUrl: "https://atos.net/",
        roles: [
            {
                title: "Machine Learning Engineer",
                type: "Full-time",
                period: "Dec 2021 — Aug 2023",
                description: "Designed MLOps platforms on Databricks with end-to-end monitoring. Built data-centric AI pipelines with CI/CD handling end-user claims for a health-tech giant, and reverse-engineered legacy statistical SQL models into ML pipelines that cut business losses from claims.",
            },
        ],
        tags: ["MLOps", "Databricks", "Azure ML", "CI/CD", "Python"],
    },
    {
        company: "Tata Consultancy Services",
        companyUrl: "https://www.tcs.com/",
        roles: [
            {
                title: "Machine Learning Practitioner",
                type: "Full-time",
                period: "Jun 2018 — Dec 2021",
                description: "Built a self-heal automation API in Python — a Random Forest model that reads ticket parameters straight from the ticketing tool and triggers end-to-end remediation, cutting manual effort by 40%.",
            },
        ],
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

// Skill colors follow the site's inferno ramp: violet → rose → orange → amber
export const skills = [
    {
        category: "AI & Agents",
        icon: "◆",
        items: [
            { name: "Agentic AI & Multi-Agent Systems", level: 95, color: "#FFB224" },
            { name: "Generative AI & Observability", level: 90, color: "#FF7847" },
            { name: "LLM Fine-tuning & Prompt Engineering", level: 92, color: "#F0527C" },
        ],
    },
    {
        category: "MLOps & Engineering",
        icon: "◇",
        items: [
            { name: "LLMOps & MLOps", level: 90, color: "#FFB224" },
            { name: "Machine Learning & Deep Learning", level: 93, color: "#B266FF" },
            { name: "Python & Data Engineering", level: 92, color: "#FF7847" },
        ],
    },
    {
        category: "Cloud & DevOps",
        icon: "▲",
        items: [
            { name: "Azure (AI Services, DevOps, ML)", level: 90, color: "#F0527C" },
            { name: "AWS & GCP", level: 82, color: "#FFD166" },
            { name: "CI/CD & Containerization", level: 88, color: "#B266FF" },
        ],
    },
    {
        category: "Frameworks & Tools",
        icon: "●",
        items: [
            { name: "LangChain / LlamaIndex / CrewAI", level: 91, color: "#F0527C" },
            { name: "Databricks & Spark", level: 89, color: "#FF7847" },
            { name: "Vector DBs (Qdrant, Pinecone, FAISS)", level: 87, color: "#FFB224" },
        ],
    },
];

export const projects = [
    {
        id: 8,
        title: "Observent",
        subtitle: "Claude Code Plugin for AI Observability",
        date: "2026",
        description:
            "A Claude Code plugin and Agent Skills that wires observability into multi-agent AI apps in one command — it detects your agent framework, instruments traces to backends like Phoenix, Langfuse, or SigNoz, and validates the span hierarchy end to end.",
        tags: ["AI Observability", "Claude Code", "OpenTelemetry", "Agents"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD/observent",
        mediumUrl:
            "https://medium.com/towardsdev/observent-claude-code-plugin-for-ai-observability-c8f022ced63e",
    },
    {
        id: 1,
        title: "Harness MCP",
        subtitle: "Reusable Private AI Toolkit",
        date: "2025",
        description:
            "A private, reusable AI toolkit built on the Model Context Protocol — write a capability once and plug it into any MCP-aware client, without your data ever leaving your walls.",
        tags: ["AI", "MCP", "Python", "Tools"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://hemz.medium.com/harnessing-mcp-building-a-reusable-and-private-ai-toolkit-33f5ffc53d62",
    },
    {
        id: 2,
        title: "Amazon Bedrock AgentCore",
        subtitle: "For AI Agents",
        date: "2025",
        description:
            "A hands-on tour of Amazon Bedrock AgentCore — the managed runtime for deploying AI agents with memory, identity, and tool access — and what it takes to move an agent from laptop to production on AWS.",
        tags: ["Amazon Bedrock", "AgentCore", "AI Agents"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://hemz.medium.com/quickstart-amazon-bedrock-agentcore-for-agents-7c439252f7e0",
    },
    {
        id: 3,
        title: "LLMOps Platform",
        subtitle: "On Databricks",
        date: "2024",
        description:
            "A full lifecycle platform for LLMs on Databricks: model versioning, evaluation gates, deployment automation, and monitoring — the paved road from experiment to production.",
        tags: ["LLMOps", "GenAI", "Databricks", "Python"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://hemz.medium.com/mastering-llmops-building-a-powerful-llmops-platform-with-databricks-954f77060948",
    },
    {
        id: 4,
        title: "Local RAG Application",
        subtitle: "Secure RAG with LangChain",
        date: "2024",
        description:
            "A production-grade RAG chatbot that never phones home. LangChain + Llama 3 + Qdrant + Redis, with full chat history — built for sensitive data that must stay on local infrastructure.",
        tags: ["LLM", "RAG", "LangChain", "Qdrant", "Redis"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://hemz.medium.com/build-a-secure-local-rag-application-with-chat-history-using-langchain-llama3-qdrant-redis-986be3628a94",
    },
    {
        id: 5,
        title: "FoodSight",
        subtitle: "AI Food Recognition",
        date: "2024",
        description:
            "A food-recognition web app fine-tuned on EfficientNetV2 with the Food101 dataset — point it at a plate and it names the dish in real time.",
        tags: ["Deep Learning", "Computer Vision", "Streamlit"],
        image: null,
        liveUrl: "https://foodsight.streamlit.app",
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl: null,
    },
    {
        id: 6,
        title: "MLOps Platform",
        subtitle: "Complete MLOps Framework",
        date: "2023",
        description:
            "A plug-and-play MLOps framework with CI/CD on Azure DevOps: continuous retraining, automated deployment, and drift monitoring, built for enterprise-scale ML operations.",
        tags: ["MLOps", "Databricks", "CI/CD", "Azure DevOps"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://hemz.medium.com/mastering-mlops-building-a-powerful-mlops-platform-with-databricks-5ec4b43f6aa5",
    },
    {
        id: 7,
        title: "Ask Audio",
        subtitle: "AI Audio Analysis",
        date: "2023",
        description:
            "Feed it hours of recordings and get back the parts that matter — transcription, key insights, and intelligent summaries distilled from raw audio.",
        tags: ["AI", "NLP", "Audio", "Python"],
        image: null,
        liveUrl: null,
        githubUrl: null, // set the project repo URL (not your profile) to show a GitHub button
        mediumUrl:
            "https://www.linkedin.com/pulse/ask-audio-hemachandran-dhinakaran",
    },
];
