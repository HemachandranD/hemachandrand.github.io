"use client";

import { useRef, useState, type FormEvent } from "react";
import { Copy, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyEmail } from "@/lib/copy-email";
import { email } from "@/data/portfolio";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (!f.name.trim()) errors.name = "Please add your name.";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "That email doesn't look right.";
  if (f.message.trim().length < 10) errors.message = "A few more words, please (10+ characters).";
  return errors;
}

// Contact sheet: posts to FormSubmit (no backend needed on GitHub Pages)
// and falls back to the visitor's mail app if that fails.
export function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mailtoFallback = (f: Fields) => {
    const subject = encodeURIComponent(`Portfolio contact from ${f.name}`);
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    toast.info("Opening your email app instead…", {
      description: "The form service didn't respond, so your message is ready to send from there.",
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const honey = new FormData(e.currentTarget).get("_honey");
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    };

    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          _subject: `Portfolio contact from ${payload.name}`,
          _replyto: payload.email,
          _captcha: "false",
          _template: "table",
          _honey: honey ?? "",
        }),
      });
      const data: { success?: string | boolean } | null = await res.json().catch(() => null);
      if (!res.ok || data?.success === "false" || data?.success === false) {
        throw new Error("FormSubmit rejected the message");
      }
      toast.success("Message sent", { description: "Thanks for reaching out — I'll reply soon." });
      setFields(EMPTY);
      onOpenChange(false);
    } catch {
      mailtoFallback(payload);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setErrors({});
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <p className="font-mono text-[11px] text-muted-foreground">tool · send_message(name, email, message)</p>
          <DialogTitle className="font-serif text-4xl leading-none font-normal">Send a message</DialogTitle>
          <DialogDescription>
            It lands straight in my inbox. I usually reply within a day or two.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
          {/* Honeypot: invisible to people, irresistible to bots */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="grid gap-2">
            <Label htmlFor="contact-name" className="font-mono text-xs font-normal">
              name<span className="text-muted-foreground">: string</span>
            </Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={fields.name}
              onChange={(e) => set("name")(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact-email" className="font-mono text-xs font-normal">
              email<span className="text-muted-foreground">: email</span>
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={fields.email}
              onChange={(e) => set("email")(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact-message" className="font-mono text-xs font-normal">
              message<span className="text-muted-foreground">: text</span>
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Tell me about the problem you're solving…"
              className="min-h-28 resize-y"
              value={fields.message}
              onChange={(e) => set("message")(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="text-xs text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="brand" size="lg" disabled={sending} className="mt-1 w-full">
            {sending ? (
              <>
                <Loader2 className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send /> Send message
              </>
            )}
          </Button>
        </form>

        <p className="flex flex-wrap items-center justify-center gap-1 text-center text-xs text-muted-foreground">
          Prefer email?
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {email}
            <Copy className="size-3" aria-hidden="true" />
            <span className="sr-only">(copy)</span>
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
