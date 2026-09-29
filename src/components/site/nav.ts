import { FolderGit2, Home, Layers } from "lucide-react";

export const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects/", label: "Projects", icon: FolderGit2 },
  { href: "/skills/", label: "Skills", icon: Layers },
] as const;

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function isActive(pathname: string, href: string) {
  return trim(pathname) === trim(href);
}
