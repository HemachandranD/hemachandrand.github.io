// ============================================================
// Portfolio Configuration — Edit this file to update your data
// ============================================================

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
        "Building the future with Agents and LLMs",
        "Peeking at Agents' internal state",
        "Turning coffee into tokens",
        "Making machines think, one prompt at a time",
    ],
    about: [
        "I'm an Enterprise AI Engineer with 7+ years of experience building Agentic AI systems, observability platforms, and battle-tested MLOps & LLMOps frameworks across CPG, retail, and healthcare.",
        "I enjoy working at the intersection of AI and real-world impact — whether it's building production-grade systems, experimenting with LLMs, or turning ideas into something tangible that creates value.",
        "At my core, I'm driven by curiosity — not just about technology, but about how it shapes industries and empowers people. That curiosity fuels my work in pushing the boundaries of what AI can do in practice.",
    ],
    quote: {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay",
    },
};

export const links = {
    github: "https://github.com/HemachandranD",
    linkedin: "https://www.linkedin.com/in/hemachandran-dhinakaran-20900b13b",
    medium: "https://hemz.medium.com",
    mail: "mailto:hema18deena@gmail.com",
    resume: "https://drive.google.com/file/d/YOUR_GDRIVE_FILE_ID/view?usp=sharing", // Replace YOUR_GDRIVE_FILE_ID with your Google Drive resume file ID
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
                description: "Building enterprise AI products — Agentic AI systems, LLM-powered observability platforms, and production-grade MLOps & LLMOps frameworks across CPG, retail, and healthcare.",
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
                description: "Designed and implemented MLOps platforms on Databricks with monitoring solutions. Built Data Centric AI handling end-user claims with CI/CD for a health-tech giant. Reverse-engineered statistics SQL models into ML pipelines, helping mitigate business losses through claims.",
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
                description: "Developed a Self-Heal Automation API using Python and a Random Forest ML algorithm that analyses ticket parameters from the ticketing tool. The end-to-end automation reduced human efforts by 40%.",
            },
        ],
        tags: ["Python", "Machine Learning", "Automation", "Random Forest"],
    },
];

export const education = [
    {
        institution: "Stanford Online",
        institutionUrl: "https://online.stanford.edu/",
        degree: "Online Degree · Machine Learning",
        period: "2020 — 2021",
    },
    {
        institution: "Sri Sairam Institute of Technology",
        institutionUrl: null,
        degree: "Bachelor of Engineering · Electronics & Communication",
        period: "2014 — 2018",
    },
];

export const skills = [
    {
        category: "AI & Agents",
        icon: "🤖",
        items: [
            { name: "Agentic AI & Multi-Agent Systems", level: 95, color: "#ef4444" },
            { name: "Generative AI & Observability", level: 90, color: "#38bdf8" },
            { name: "LLM Fine-tuning & Prompt Engineering", level: 92, color: "#a78bfa" },
        ],
    },
    {
        category: "MLOps & Engineering",
        icon: "⚙️",
        items: [
            { name: "LLMOps & MLOps", level: 90, color: "#34d399" },
            { name: "Machine Learning & Deep Learning", level: 93, color: "#f472b6" },
            { name: "Python & Data Engineering", level: 92, color: "#fb923c" },
        ],
    },
    {
        category: "Cloud & DevOps",
        icon: "☁️",
        items: [
            { name: "Azure (AI Services, DevOps, ML)", level: 90, color: "#60a5fa" },
            { name: "AWS & GCP", level: 82, color: "#fbbf24" },
            { name: "CI/CD & Containerization", level: 88, color: "#2dd4bf" },
        ],
    },
    {
        category: "Frameworks & Tools",
        icon: "🛠️",
        items: [
            { name: "LangChain / LlamaIndex / CrewAI", level: 91, color: "#c084fc" },
            { name: "Databricks & Spark", level: 89, color: "#f87171" },
            { name: "Vector DBs (Qdrant, Pinecone, FAISS)", level: 87, color: "#4ade80" },
        ],
    },
];

export const projects = [
    {
        id: 1,
        title: "Harness MCP",
        subtitle: "Reusable Private AI Toolkit",
        date: "2025",
        description:
            "Building reusable and private AI toolkits using Model Context Protocol (MCP). Enables seamless integration of AI capabilities across applications.",
        tags: ["AI", "MCP", "Python", "Tools"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://hemz.medium.com/harnessing-mcp-building-a-reusable-and-private-ai-toolkit-33f5ffc53d62",
    },
    {
        id: 2,
        title: "Amazon Bedrock AgentCore",
        subtitle: "For AI Agents",
        date: "2025",
        description:
            "Amazon Bedrock AgentCore is a platform for building and deploying AI agents. It provides a set of tools and APIs for building and deploying AI agents.",
        tags: ["Amazon Bedrock", "AgentCore", "AI Agents"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://hemz.medium.com/amazon-bedrock-agentcore-for-ai-agents-33f5ffc53d62",
    },
    {
        id: 3,
        title: "LLMOps Platform",
        subtitle: "On Databricks",
        date: "2024",
        description:
            "Comprehensive LLMOps platform for managing Large Language Model lifecycles. Includes monitoring, versioning, and deployment automation on Databricks.",
        tags: ["LLMOps", "GenAI", "Databricks", "Python"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://hemz.medium.com/mastering-llmops-building-a-powerful-llmops-platform-with-databricks-954f77060948",
    },
    {
        id: 4,
        title: "Local RAG Application",
        subtitle: "Secure RAG with LangChain",
        date: "2024",
        description:
            "Production-grade RAG chatbot with chat history. Built with LangChain, llama3, Qdrant vector DB, and Redis. Handles sensitive data securely on local infrastructure.",
        tags: ["LLM", "RAG", "LangChain", "Qdrant", "Redis"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://hemz.medium.com/build-a-secure-local-rag-application-with-chat-history-using-langchain-llama3-qdrant-redis-986be3628a94",
    },
    {
        id: 5,
        title: "FoodSight",
        subtitle: "AI Food Recognition",
        date: "2024",
        description:
            "AI-powered food classification app trained on EfficientNetV2b0 using Food101 dataset. Deployed as a web app with real-time image recognition capabilities.",
        tags: ["Deep Learning", "Computer Vision", "Streamlit"],
        image: null,
        liveUrl: "https://foodsight.streamlit.app",
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl: null,
    },
    {
        id: 6,
        title: "MLOps Platform",
        subtitle: "Complete MLOps Framework",
        date: "2023",
        description:
            "A powerful plug-and-play MLOps platform with CI/CD on Azure DevOps. Handles continuous retraining, deployment, and monitoring. Built for enterprise-scale ML operations.",
        tags: ["MLOps", "Databricks", "CI/CD", "Azure DevOps"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://medium.com/@hemz/mastering-mlops-building-a-powerful-mlops-platform-with-databricks-5ec4b43f6aa5",
    },
    {
        id: 7,
        title: "Ask Audio",
        subtitle: "AI Audio Analysis",
        date: "2023",
        description:
            "Revolutionizing audio content analysis with AI. Converts audio to text, extracts key insights, and provides intelligent summaries. Built to handle hours of recordings efficiently.",
        tags: ["AI", "NLP", "Audio", "Python"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/HemachandranD",
        mediumUrl:
            "https://www.linkedin.com/pulse/ask-audio-hemachandran-dhinakaran",
    },
];
