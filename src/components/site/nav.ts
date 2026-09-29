import { FolderGit2, Home, Layers } from "lucide-react";

export const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects/", label: "Projects", icon: FolderGit2 },
  { href: "/skills/", label: "Skills", icon: Layers },
] as const;

// Home carries the name font and the hero's CSS; prefetching it from every
// other page would download them there for nothing. It's a small static
// page, so navigating to it without a prefetch is still instant.
export const prefetchFor = (href: string) => (href === "/" ? false : undefined);

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function isActive(pathname: string, href: string) {
  return trim(pathname) === trim(href);
}
