import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects, profile } from "../data/portfolio";
import MediumIcon from "../components/ui/MediumIcon";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export default function ProjectsPage() {
    return (
        <div className="max-w-[760px] mx-auto px-5 sm:px-7 pt-12 pb-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-12"
            >
                <div className="sec-label">work · {String(projects.length).padStart(2, "0")} entries</div>
                <h1 className="page-title mb-4">Selected work</h1>
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[58ch]">
                    Projects I've built along the way, shaped by curiosity, AI, and a focus
                    on building things that actually work and create real-world impact.
                </p>
            </motion.div>

            {/* Numbered list */}
            <motion.div variants={container} initial="hidden" animate="show">
                {projects.map((project, idx) => (
                    <motion.article key={project.id} variants={item} className="proj group">
                        <span className="proj-num">{String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>

                        {project.image && (
                            <div className="aspect-video overflow-hidden rounded-xl bg-muted my-4 border border-border">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        )}

                        <div className="proj-head">
                            <div>
                                <h2 className="proj-title">{project.title}</h2>
                                {project.subtitle && <div className="proj-sub">{project.subtitle}</div>}
                            </div>
                            <span className="proj-date">{project.date}</span>
                        </div>

                        <p className="proj-desc">{project.description}</p>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="token-chip">{tag}</span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-5">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn !py-2 !px-4">
                                    <ExternalLink className="w-3.5 h-3.5" /> Live link
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-4">
                                    <Github className="w-3.5 h-3.5" /> GitHub
                                </a>
                            )}
                            {project.mediumUrl && (
                                <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !px-4">
                                    <MediumIcon className="w-3.5 h-3.5" /> Read more
                                </a>
                            )}
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            <footer className="site-footer">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]} <span className="sep">·</span> built with love, AI &amp; coffee ☕</p>
            </footer>
        </div>
    );
}
