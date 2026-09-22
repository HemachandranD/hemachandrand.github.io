import { motion } from "framer-motion";
import { Database, Sparkles, BrainCircuit, ScanEye, Layers, Cloud } from "lucide-react";
import { industries, stackSkills, yearsOfExperience } from "../data/portfolio";
import ExpertiseCards from "../components/ExpertiseCards";
import Footer from "../components/Footer";

const STACK_ICONS = { rag: Database, llm: Sparkles, ml: BrainCircuit, perception: ScanEye, data: Layers, cloud: Cloud };

export default function SkillsPage() {
    return (
        <div className="page-wide">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-10"
            >
                <div className="eyebrow-row">
                    <span className="eyebrow-label">Skills</span>
                </div>
                <h1 className="page-title">AI engineering, end to end.</h1>
                <p className="page-intro">
                    {yearsOfExperience}+ years building the parts of AI that have to work every day:
                    agents, the observability to trust them, and the MLOps to ship them, plus
                    everything underneath, from retrieval and fine-tuning to data and cloud.
                </p>
            </motion.div>

            <h2 className="skills-sub">Core expertise</h2>
            <ExpertiseCards detailed />

            <motion.div
                className="glass glass-pill industries"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
            >
                <span className="industries-label">Built for</span>
                {industries.map((name) => (
                    <span key={name} className="industries-item">{name}</span>
                ))}
            </motion.div>

            {/* The rest of the AI engineering stack */}
            <h2 className="skills-sub">Across the AI stack</h2>
            <div className="stack-grid">
                {stackSkills.map((area, i) => {
                    const Icon = STACK_ICONS[area.icon] ?? Sparkles;
                    return (
                        <motion.article
                            key={area.category}
                            className="glass glass-card stack-tile"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="stack-head">
                                <Icon className="stack-icon" aria-hidden="true" />
                                <h3 className="stack-title">{area.category}</h3>
                            </div>
                            <p className="stack-summary">{area.summary}</p>
                            <div className="stack-tools">
                                {area.items.map((tool) => (
                                    <span key={tool} className="chip chip-sm">{tool}</span>
                                ))}
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
}
