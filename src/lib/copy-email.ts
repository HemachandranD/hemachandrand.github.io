import { toast } from "sonner";

import { email } from "@/data/portfolio";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    toast.success("Email copied", { description: email });
  } catch {
    // Clipboard blocked (insecure context, permissions) — show it instead
    toast.info(email, { description: "Copy it from here." });
  }
}
