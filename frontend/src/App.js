import { useState } from "react";
import { motion } from "framer-motion";
import "@/App.css";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Github, Linkedin, Mail, Sparkles, Zap, Heart, Code, Rocket, Star, Brain } from "lucide-react";
import { toast } from "sonner";

function App() {
  const [coins, setCoins] = useState(42);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const skills = [
    { name: "Machine Learning & Deep Learning", level: 95, color: "--sky-blue", icon: "⚡" },
    { name: "MLOps & LLMOps", level: 90, color: "--mint-green", icon: "🔋" },
    { name: "Cloud & Infrastructure", level: 85, color: "--coin-gold", icon: "✨" },
    { name: "GenAI & LLM Applications", level: 88, color: "--heart-red", icon: "💪" },
    { name: "Python & Data Science", level: 92, color: "--primary", icon: "🎯" }
  ];

  const projects = [
    {
      id: 1,
      title: "Ask Audio",
      description: "AI-powered audio content analysis and summarization",
      tags: ["AI", "NLP", "Audio"],
      coins: 25,
      details: "Revolutionizing audio content analysis with AI. Converts audio to text, extracts key insights, and provides intelligent summaries. Built to handle hours of recordings efficiently.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://www.linkedin.com/pulse/ask-audio-hemachandran-dhinakaran"
    },
    {
      id: 2,
      title: "MLOps Platform",
      description: "Complete MLOps framework on Databricks",
      tags: ["MLOps", "Databricks", "CI/CD"],
      coins: 30,
      details: "A powerful plug-and-play MLOps platform with CI/CD on Azure DevOps. Handles continuous retraining, deployment, and monitoring. Built for enterprise-scale ML operations.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://medium.com/@hemz/mastering-mlops-building-a-powerful-mlops-platform-with-databricks-5ec4b43f6aa5"
    },
    {
      id: 3,
      title: "FoodSight",
      description: "Image classification AI for food recognition",
      tags: ["Deep Learning", "Computer Vision", "Streamlit"],
      coins: 20,
      details: "AI-powered food classification app trained on EfficientNetV2b0 using Food101 dataset. Deployed as a web app with real-time image recognition capabilities.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://foodsight.streamlit.app"
    },
    {
      id: 4,
      title: "Local RAG Application",
      description: "Secure RAG with LangChain, llama3, Qdrant & Redis",
      tags: ["LLM", "RAG", "LangChain"],
      coins: 28,
      details: "Production-grade RAG chatbot with chat history. Built with LangChain, llama3, Qdrant vector DB, and Redis. Handles sensitive data securely on local infrastructure.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://hemz.medium.com/build-a-secure-local-rag-application-with-chat-history-using-langchain-llama3-qdrant-redis-986be3628a94"
    },
    {
      id: 5,
      title: "LLMOps Platform",
      description: "LLM operations platform on Databricks",
      tags: ["LLMOps", "GenAI", "Databricks"],
      coins: 32,
      details: "Comprehensive LLMOps platform for managing Large Language Model lifecycles. Includes monitoring, versioning, and deployment automation on Databricks.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://hemz.medium.com/mastering-llmops-building-a-powerful-llmops-platform-with-databricks-954f77060948"
    },
    {
      id: 6,
      title: "MCP: AI Toolkit",
      description: "Reusable and private AI toolkit with MCP",
      tags: ["AI", "MCP", "Tools"],
      coins: 22,
      details: "Building reusable and private AI toolkits using Model Context Protocol (MCP). Enables seamless integration of AI capabilities across applications.",
      link: "https://github.com/HemachandranD",
      mediumLink: "https://hemz.medium.com/harnessing-mcp-building-a-reusable-and-private-ai-toolkit-33f5ffc53d62"
    }
  ];

  const handleCoinCollect = () => {
    setCoins(coins + 1);
    toast.success("+1 Coin Collected!", {
      duration: 2000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! Thanks for reaching out! 🎮", {
      duration: 3000,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] font-body">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-white border-b-[3px] border-[color:hsl(var(--pixel-outline))] shadow-md"
        data-testid="header"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-[hsl(var(--primary))] border-[3px] border-[color:hsl(var(--pixel-outline))] flex items-center justify-center"
                data-testid="logo"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              <span className="font-pixel text-lg font-bold" data-testid="logo-text">DEV</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6" data-testid="desktop-nav">
              <button
                onClick={() => scrollToSection('about')}
                className="font-press-start text-xs hover:text-[hsl(var(--primary))] transition-colors"
                data-testid="nav-about"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="font-press-start text-xs hover:text-[hsl(var(--primary))] transition-colors"
                data-testid="nav-skills"
              >
                SKILLS
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="font-press-start text-xs hover:text-[hsl(var(--primary))] transition-colors"
                data-testid="nav-projects"
              >
                PROJECTS
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-press-start text-xs hover:text-[hsl(var(--primary))] transition-colors"
                data-testid="nav-contact"
              >
                CONTACT
              </button>
            </nav>

            {/* Coin Counter */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={handleCoinCollect}
              className="flex items-center gap-2 px-3 py-2 bg-white border-[3px] rounded-none border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] cursor-pointer hover-shake"
              data-testid="coin-counter"
            >
              <div className="w-5 h-5 bg-[hsl(var(--coin-gold))] rounded-full border-2 border-[color:hsl(var(--pixel-outline))]" />
              <span className="font-press-start text-xs">{coins}</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        id="about"
        className="relative py-12 sm:py-16 lg:py-24 overflow-hidden"
        data-testid="hero-section"
      >
        <div className="absolute inset-0 pixel-grid opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(197 92% 96%) 0%, hsl(160 64% 96%) 55%, hsl(48 100% 96%) 100%)'
          }}
        />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex justify-center"
              data-testid="hero-avatar"
            >
              <div className="relative">
                <div className="w-64 h-64 bg-[hsl(var(--primary))] border-[4px] border-[color:hsl(var(--pixel-outline))] shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] flex items-center justify-center animate-float">
                  <Brain className="w-32 h-32 text-white" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4"
                >
                  <Star className="w-12 h-12 text-[hsl(var(--coin-gold))] fill-[hsl(var(--coin-gold))]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Content */}
            <div className="space-y-6" data-testid="hero-content">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="font-pixel text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="hero-title">
                  HEMACHANDRAN DHINAKARAN
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-press-start text-base sm:text-lg text-[hsl(var(--primary))] tracking-wide" data-testid="hero-subtitle">
                  SENIOR AI/ML ENGINEER
                </h2>
              </motion.div>

              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]"
                data-testid="hero-description"
              >
                Crafting AI systems and algorithms for tomorrow's innovations. Level 99 AI/ML Engineer with max XP in GenAI, MLOps, LLMOps, and building production-grade machine learning solutions on cloud platforms.
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
                data-testid="hero-cta-container"
              >
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] active:shadow-[0_0_0_0_hsl(var(--pixel-outline))] active:translate-x-[4px] active:translate-y-[4px] bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--sky-blue))] font-press-start text-xs px-6 py-6"
                  data-testid="hero-primary-cta"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  VIEW PROJECTS
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="outline"
                  className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] active:shadow-[0_0_0_0_hsl(var(--pixel-outline))] active:translate-x-[4px] active:translate-y-[4px] bg-white text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] font-press-start text-xs px-6 py-6"
                  data-testid="hero-secondary-cta"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  HIRE ME
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-12 sm:py-16 lg:py-24 bg-white"
        data-testid="skills-section"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold mb-4" data-testid="skills-title">
              AI POWER STATS
            </h2>
            <p className="text-base text-[hsl(var(--muted-foreground))]" data-testid="skills-subtitle">
              ML capabilities leveled up through countless AI quests
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6" data-testid="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`skill-item-${index}`}
              >
                <Card className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] bg-white shadow-[6px_6px_0_0_hsl(var(--pixel-outline))] hover:shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] transition-shadow p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-pixel text-lg" data-testid={`skill-name-${index}`}>{skill.name}</h3>
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-press-start text-xs text-[hsl(var(--muted-foreground))]">LVL</span>
                      <span className="font-press-start text-xs" data-testid={`skill-level-${index}`}>{skill.level}</span>
                    </div>
                    <div
                      className="h-6 border-[3px] rounded-none border-[color:hsl(var(--pixel-outline))] bg-[hsl(var(--muted))] overflow-hidden"
                      data-testid={`skill-stat-bar-${index}`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className="h-full"
                        style={{ backgroundColor: `hsl(var(${skill.color}))` }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-12 sm:py-16 lg:py-24 bg-[hsl(var(--muted))/30]"
        data-testid="projects-section"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold mb-4" data-testid="projects-title">
              AI QUEST LOG
            </h2>
            <p className="text-base text-[hsl(var(--muted-foreground))]" data-testid="projects-subtitle">
              Epic AI/ML projects completed on the journey
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                data-testid={`project-card-${index}`}
              >
                <Card
                  className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] bg-white shadow-[6px_6px_0_0_hsl(var(--pixel-outline))] hover:shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] transition-shadow cursor-pointer h-full"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-pixel text-lg" data-testid={`project-title-${index}`}>{project.title}</h3>
                      <div className="flex items-center gap-1 px-2 py-1 bg-[hsl(var(--coin-gold))] border-2 border-[color:hsl(var(--pixel-outline))]">
                        <div className="w-3 h-3 bg-[hsl(var(--coin-gold))] rounded-full border border-[color:hsl(var(--pixel-outline))]" />
                        <span className="font-press-start text-xs" data-testid={`project-coins-${index}`}>{project.coins}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]" data-testid={`project-description-${index}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          className="rounded-none border-2 border-[color:hsl(var(--pixel-outline))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-white font-press-start text-xs px-2 py-1"
                          data-testid={`project-tag-${index}-${tagIndex}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-24 bg-white"
        data-testid="contact-section"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-3xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-pixel text-4xl sm:text-5xl font-bold mb-4" data-testid="contact-title">
              START AN AI QUEST
            </h2>
            <p className="text-base text-[hsl(var(--muted-foreground))]" data-testid="contact-subtitle">
              Let's team up and build intelligent AI solutions together
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] bg-white shadow-[6px_6px_0_0_hsl(var(--pixel-outline))] p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label className="font-press-start text-xs block mb-2" htmlFor="name">
                    NAME
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] focus:ring-2 focus:ring-[hsl(var(--primary))] font-body"
                    required
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="font-press-start text-xs block mb-2" htmlFor="email">
                    EMAIL
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] focus:ring-2 focus:ring-[hsl(var(--primary))] font-body"
                    required
                    data-testid="contact-email-input"
                  />
                </div>
                <div>
                  <label className="font-press-start text-xs block mb-2" htmlFor="message">
                    MESSAGE
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] focus:ring-2 focus:ring-[hsl(var(--primary))] min-h-[120px] font-body"
                    required
                    data-testid="contact-message-textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] active:shadow-[0_0_0_0_hsl(var(--pixel-outline))] active:translate-x-[4px] active:translate-y-[4px] bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--sky-blue))] font-press-start text-xs py-6"
                  data-testid="contact-submit-button"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[hsl(var(--pixel-outline))] text-white py-12"
        data-testid="footer"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div data-testid="footer-about">
              <h3 className="font-pixel text-xl mb-4">ALEX DEVSON</h3>
              <p className="text-sm text-gray-300">
                Full-stack developer crafting pixel-perfect experiences. Always ready for the next challenge.
              </p>
            </div>

            {/* Quick Links */}
            <div data-testid="footer-links">
              <h3 className="font-pixel text-xl mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection('about')}
                  className="block text-sm text-gray-300 hover:text-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="block text-sm text-gray-300 hover:text-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-link-skills"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="block text-sm text-gray-300 hover:text-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-link-projects"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-sm text-gray-300 hover:text-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Social */}
            <div data-testid="footer-social">
              <h3 className="font-pixel text-xl mb-4">CONNECT</h3>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ y: -4 }}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-social-github"
                >
                  <Github className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4 }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-social-linkedin"
                >
                  <Linkedin className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border-[3px] border-white flex items-center justify-center hover:bg-[hsl(var(--coin-gold))] transition-colors"
                  data-testid="footer-social-twitter"
                >
                  <Twitter className="w-6 h-6 text-[hsl(var(--pixel-outline))]" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t-[3px] border-white/20 pt-8 text-center">
            <p className="font-press-start text-xs text-gray-300" data-testid="footer-copyright">
              © 2025 ALEX DEVSON. BUILT WITH <Heart className="inline w-3 h-3 text-[hsl(var(--heart-red))] fill-[hsl(var(--heart-red))]" /> & REACT
            </p>
          </div>
        </div>
      </footer>

      {/* Project Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] max-w-2xl" data-testid="project-dialog">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-pixel text-2xl" data-testid="project-dialog-title">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-base" data-testid="project-dialog-description">
                  {selectedProject.details}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="rounded-none border-2 border-[color:hsl(var(--pixel-outline))] bg-[hsl(var(--primary))] text-white font-press-start text-xs px-3 py-1"
                      data-testid="project-dialog-tag"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-2 bg-[hsl(var(--coin-gold))] border-2 border-[color:hsl(var(--pixel-outline))]">
                    <div className="w-4 h-4 bg-[hsl(var(--coin-gold))] rounded-full border-2 border-[color:hsl(var(--pixel-outline))]" />
                    <span className="font-press-start text-xs">{selectedProject.coins} COINS EARNED</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--sky-blue))] font-press-start text-xs"
                    data-testid="project-dialog-github-btn"
                  >
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      VIEW CODE
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] font-press-start text-xs"
                    data-testid="project-dialog-demo-btn"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Sparkles className="w-4 h-4 mr-2" />
                      LIVE DEMO
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
