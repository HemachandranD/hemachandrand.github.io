import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects, profile } from "../data/portfolio";
import MediumIcon from "../components/ui/MediumIcon";
import TiltCard from "../components/TiltCard";
import ProjectCover from "../components/ProjectCover";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
    hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

function ProjectCard({ project, featured }) {
    return (
        <TiltCard className={featured ? "proj-card proj-card-featured" : "proj-card"}>
            <div className="proj-card-top">
                <span className="proj-date">{project.date}</span>
                {featured && <span className="proj-flag">latest</span>}
            </div>

            <div className="proj-img">
                {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" />
                ) : (
                    <ProjectCover seed={project.id} label={project.title} />
                )}
            </div>

            <h2 className="proj-title">{project.title}</h2>
            {project.subtitle && <div className="proj-sub">{project.subtitle}</div>}

            <p className="proj-desc">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                {project.tags.map((tag) => (
                    <span key={tag} className="token-chip">{tag}</span>
                ))}
            </div>

            <div className="proj-links">
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-primary">
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                )}
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                )}
                {project.mediumUrl && (
                    <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <MediumIcon className="w-3.5 h-3.5" /> Read the write-up
                    </a>
                )}
            </div>
        </TiltCard>
    );
}

export default function ProjectsPage() {
    return (
        <div className="page-wide">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-12"
            >
                <div className="coord">
                    <span className="coord-xy">[ 0.847, 0.312 ]</span>
                    <span className="coord-sep">·</span>
                    <span className="coord-label">Work · {String(projects.length).padStart(2, "0")} Entries</span>
                </div>
                <h1 className="page-title">Selected work</h1>
                <p className="page-intro">
                    Things I've shipped, chasing one question: how do you make AI hold up
                    outside the demo? Each card links to code or a write-up on how it was built.
                </p>
            </motion.div>

            {/* Card grid — newest first, latest gets the full row */}
            <motion.div className="projects-grid" variants={container} initial="hidden" animate="show">
                {projects.map((project, idx) => (
                    <motion.article
                        key={project.id}
                        variants={item}
                        className={idx === 0 ? "proj-cell proj-cell-featured" : "proj-cell"}
                    >
                        <ProjectCard project={project} featured={idx === 0} />
                    </motion.article>
                ))}
            </motion.div>

            <footer className="site-footer">
                <p>© {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]} <span className="sep">·</span> mapped in latent space <span className="sep">·</span> caffeine → tokens ☕</p>
            </footer>
        </div>
    );
}
