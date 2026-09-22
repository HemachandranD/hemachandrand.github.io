import { motion } from "framer-motion";
import { Bot, Activity, Workflow } from "lucide-react";
import { skills } from "../data/portfolio";

const ICONS = { agents: Bot, observability: Activity, mlops: Workflow };

// The three areas of expertise as glass cards. `detailed` adds the
// tools list (Skills page); the homepage shows just the summary.
export default function ExpertiseCards({ detailed = false }) {
    return (
        <div className="expertise-grid">
            {skills.map((area, i) => {
                const Icon = ICONS[area.icon] ?? Bot;
                return (
                    <motion.article
                        key={area.category}
                        className="glass glass-card expertise-card"
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="expertise-top">
                            <span className="expertise-icon" aria-hidden="true">
                                <Icon className="w-5 h-5" />
                            </span>
                            <span className="expertise-num">0{i + 1}</span>
                        </div>
                        <h3 className="expertise-title">{area.category}</h3>
                        <p className="expertise-summary">{area.summary}</p>
                        {detailed && (
                            <div className="expertise-tools">
                                {area.items.map((tool) => (
                                    <span key={tool} className="chip chip-sm">{tool}</span>
                                ))}
                            </div>
                        )}
                    </motion.article>
                );
            })}
        </div>
    );
}
