import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useFocusTrap } from "../lib/useFocusTrap";

const MAIL_TO = "hema18deena@gmail.com";

// Contact sheet — a liquid-glass dialog that rises from below like an
// iOS sheet. FormSubmit.co with a mailto: fallback.
export default function ContactModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sending, setSending] = useState(false);
    const dialogRef = useRef(null);

    useFocusTrap(isOpen, dialogRef, onClose, "input:not([tabindex='-1']), textarea");

    const mailtoFallback = () => {
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );
        window.open(`mailto:${MAIL_TO}?subject=${subject}&body=${body}`, "_blank");
        toast.info("Opening your email client as a fallback...");
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${MAIL_TO}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `Portfolio Contact from ${formData.name}`,
                    _captcha: "false",
                    _honey: formData.honey ?? "",
                    _template: "table",
                }),
            });

            const data = await response.json().catch(() => null);

            if (response.ok && data?.success !== "false") {
                toast.success("Message sent! Thanks for reaching out! 🚀");
                setFormData({ name: "", email: "", message: "" });
                onClose();
            } else {
                // FormSubmit might need email activation — fall back to mailto
                mailtoFallback();
            }
        } catch {
            // Network error — fall back to mailto
            mailtoFallback();
        } finally {
            setSending(false);
        }
    };

    // Reset the spinner if the sheet is closed mid-send
    useEffect(() => {
        if (!isOpen) setSending(false);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="sheet-root">
                    <motion.div
                        className="sheet-scrim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.18 } }}
                        onClick={onClose}
                    />
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-title"
                        className="glass glass-card sheet"
                        initial={{ opacity: 0, y: 60, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.18 } }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                        <div className="sheet-grabber" aria-hidden="true" />
                        <div className="sheet-head">
                            <h2 id="contact-title" className="sheet-title">Send a message</h2>
                            <button onClick={onClose} className="glass glass-round icon-btn" aria-label="Close">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="sheet-sub">It lands straight in my inbox — I'll get back to you soon.</p>
                        <form onSubmit={handleSubmit} className="sheet-form">
                            {/* Honeypot — bots fill it, FormSubmit drops those submissions */}
                            <input
                                type="text"
                                name="_honey"
                                value={formData.honey ?? ""}
                                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />
                            <label className="field">
                                <span className="field-label">Name</span>
                                <input
                                    autoFocus
                                    id="contact-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your name"
                                    autoComplete="name"
                                    required
                                />
                            </label>
                            <label className="field">
                                <span className="field-label">Email</span>
                                <input
                                    id="contact-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    required
                                />
                            </label>
                            <label className="field">
                                <span className="field-label">Message</span>
                                <textarea
                                    id="contact-message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={4}
                                />
                            </label>
                            <button type="submit" disabled={sending} className="btn btn-primary w-full">
                                {sending ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                ) : (
                                    <><Send className="w-4 h-4" /> Send message</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
