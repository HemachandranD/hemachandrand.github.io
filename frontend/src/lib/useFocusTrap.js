import { useEffect, useRef } from "react";

const FOCUSABLE = 'button:not([disabled]), [href], input:not([tabindex="-1"]), textarea, [tabindex]:not([tabindex="-1"])';

// Modal plumbing shared by the contact sheet and the spotlight palette:
// Escape closes, focus moves in (to `initialSelector` if given) and stays
// trapped, the page behind stops scrolling, and focus returns to the
// opener on close.
export function useFocusTrap(isOpen, ref, onClose, initialSelector) {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    // Remember the opener while rendering the open state: by the time
    // effects run, an autoFocus field inside has already taken focus.
    const openerRef = useRef(null);
    const wasOpen = useRef(false);
    if (isOpen && !wasOpen.current && typeof document !== "undefined") {
        openerRef.current = document.activeElement;
    }
    wasOpen.current = isOpen;

    useEffect(() => {
        if (!isOpen) return;
        const opener = openerRef.current;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusables = () => ref.current?.querySelectorAll(FOCUSABLE) ?? [];

        // Focus once the dialog is in the DOM
        const raf = requestAnimationFrame(() => {
            const first =
                (initialSelector && ref.current?.querySelector(initialSelector)) ||
                focusables()[0];
            first?.focus();
        });

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onCloseRef.current();
                return;
            }
            if (e.key !== "Tab") return;
            const items = focusables();
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
            // Don't leave focus on a field that's animating out (it would
            // swallow the next shortcut) if there's no opener to return to
            if (ref.current?.contains(document.activeElement)) document.activeElement.blur();
            opener?.focus?.({ preventScroll: true });
        };
    }, [isOpen, ref, initialSelector]);
}
