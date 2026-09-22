import { profile } from "../data/portfolio";
import { useUI } from "../lib/ui";

export default function Footer() {
    const { openSpotlight } = useUI();
    return (
        <footer className="site-footer">
            <p>
                © {new Date().getFullYear()} {profile.shortName || profile.name.split(" ")[0]}
                <span className="sep">·</span> mapped in latent space, seen through glass
                <span className="sep">·</span>
                <button type="button" className="footer-link" onClick={openSpotlight}>
                    press <kbd className="kbd">/</kbd> to search
                </button>
            </p>
        </footer>
    );
}
