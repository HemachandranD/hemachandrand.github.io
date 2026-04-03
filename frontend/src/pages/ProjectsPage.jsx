import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects, profile } from "../data/portfolio";
import MediumIcon from "../components/ui/MediumIcon";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectsPage() {
    return (
        <div className="max-w-[640px] mx-auto px-5 sm:px-6 py-10 sm:py-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10"
            >
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                    Projects
                </h1>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                    Projects I've built along the way, shaped by curiosity, AI, and a focus
                    on building things that actually work and create real-world impact.
                </p>
            </motion.div>

            {/* Projects List */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-5"
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={item}>
                        <div className="timeline-card group">
                            {/* Project Image */}
                            {project.image && (
                                <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-4 -mx-1">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                            )}

                            {/* Title Row */}
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <h2 className="text-[15px] font-semibold leading-snug">
                                    {project.title}
                                </h2>
                                <span className="text-xs text-muted-foreground flex-shrink-0 tabular-nums mt-0.5">
                                    {project.date}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex flex-wrap gap-2">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Live link
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="connect-pill !py-1.5 !px-3.5 !text-xs !gap-1.5"
                                    >
                                        <Github className="w-3 h-3" />
                                        GitHub
                                    </a>
                                )}
                                {project.mediumUrl && (
                                    <a
                                        href={project.mediumUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="connect-pill !py-1.5 !px-3.5 !text-xs !gap-1.5"
                                    >
                                        <MediumIcon className="w-3 h-3" />
                                        Read More
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer */}
            <footer className="site-footer mt-10">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]}</p>
                <p className="mt-1">Built with love, AI and Coffee ☕</p>
            </footer>
        </div>
    );
}
