"use client";

import type { ComponentType, SVGProps } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Briefcase,
  Copy,
  FolderGit2,
  GraduationCap,
  Home,
  Layers,
  Mail,
  MessageSquare,
  SunMoon,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "@/components/icons";
import { useUI } from "@/components/site/ui-context";
import { copyEmail } from "@/lib/copy-email";
import { jumpToHash } from "@/lib/jump-to-hash";
import { email, links, projects } from "@/data/portfolio";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Word-prefix matching instead of cmdk's fuzzy default, so "obs" finds
// Observent and Observability, not every title containing o…b…s.
function filter(value: string, search: string, keywords: string[] = []) {
  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 1;
  const label = value.toLowerCase();
  const extra = keywords.join(" ").toLowerCase();
  const escape = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const hit = (text: string, w: string) => new RegExp(`(^|[^a-z0-9])${escape(w)}`).test(text);
  let score = 0;
  for (const w of words) {
    if (hit(label, w)) score += 2;
    else if (hit(extra, w)) score += 1;
    else return 0;
  }
  return score / (words.length * 2);
}
type Item = { label: string; icon: Icon; run: () => void; keywords?: string[]; hint?: string };

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { openContact } = useUI();

  // Same-page anchors are real hash changes (so the page can react to
  // them); anything else is a route change and Next scrolls to the hash.
  const go = (href: string) => {
    const [path, hash] = href.split("#");
    const samePage = path.replace(/\/+$/, "") === pathname.replace(/\/+$/, "");
    if (!hash && samePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (!hash || !samePage) {
      router.push(href);
    } else {
      jumpToHash(hash);
    }
  };
  const external = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const groups: { heading: string; items: Item[] }[] = [
    {
      heading: "Pages",
      items: [
        { label: "Home", icon: Home, run: () => go("/") },
        { label: "Projects", icon: FolderGit2, run: () => go("/projects/"), hint: `${projects.length} builds` },
        { label: "Skills", icon: Layers, run: () => go("/skills/") },
      ],
    },
    {
      heading: "Sections",
      items: [
        { label: "About", icon: User, run: () => go("/#about") },
        { label: "Experience", icon: Briefcase, run: () => go("/#experience"), keywords: ["career", "work history"] },
        { label: "Education", icon: GraduationCap, run: () => go("/#education") },
        { label: "Contact", icon: Mail, run: () => go("/#contact") },
      ],
    },
    {
      heading: "Projects",
      items: projects.map((p) => ({
        label: p.title,
        icon: FolderGit2,
        hint: String(p.year),
        keywords: [p.subtitle, p.category, ...p.tags],
        run: () => go(`/projects/#${p.id}`),
      })),
    },
    {
      heading: "Actions",
      items: [
        { label: "Send a message", icon: MessageSquare, run: openContact, keywords: ["contact", "email", "hire"] },
        { label: "Copy email address", icon: Copy, run: copyEmail, keywords: [email] },
        {
          label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
          icon: SunMoon,
          run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
          keywords: ["theme", "dark", "light", "appearance"],
        },
      ],
    },
    {
      heading: "Profiles",
      items: [
        { label: "GitHub", icon: GitHubIcon, run: () => external(links.github) },
        { label: "LinkedIn", icon: LinkedInIcon, run: () => external(links.linkedin) },
        { label: "Medium", icon: MediumIcon, run: () => external(links.medium), keywords: ["blog", "articles", "writing"] },
      ],
    },
  ];

  const select = (item: Item) => {
    onOpenChange(false);
    // let the dialog close (and hand focus back) before acting
    requestAnimationFrame(() => item.run());
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Jump to a page, section or project, or run an action."
      className="top-[12vh] translate-y-0 sm:max-w-xl"
      showCloseButton={false}
      filter={filter}
    >
      <CommandInput placeholder="Search pages, projects, actions…" />
      <CommandList className="max-h-[min(60vh,420px)]">
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, i) => (
          <div key={group.heading}>
            {i > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={`${group.heading}-${item.label}`}
                  value={`${group.heading} ${item.label}`}
                  keywords={item.keywords}
                  onSelect={() => select(item)}
                >
                  <item.icon />
                  <span className="truncate">{item.label}</span>
                  {item.hint && <CommandShortcut className="tracking-normal">{item.hint}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
      <div className="flex items-center gap-4 border-t px-4 py-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd> navigate
        </span>
        <span className="flex items-center gap-1">
          <Kbd>↵</Kbd> select
        </span>
        <span className="ml-auto flex items-center gap-1">
          <Kbd>esc</Kbd> close
        </span>
      </div>
    </CommandDialog>
  );
}
