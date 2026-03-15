{
  "meta": {
    "project": "Retro Blocky Gamified Developer Portfolio",
    "app_type": "Single-page landing portfolio (React, Tailwind, shadcn/ui)",
    "audience": "Hiring managers, dev peers, open-source community",
    "key_tasks": [
      "Scan hero to understand who/what",
      "Skim skills as game stats",
      "Browse 3-6 featured projects with quick context",
      "Jump to socials/contact",
      "Enjoy playful, retro interactions without hindering speed/accessibility"
    ],
    "success_actions": [
      "Click project card to open details",
      "Navigate to GitHub/LinkedIn/Twitter",
      "Submit contact form",
      "Engage with gamified elements (coins, power-ups, progress bars)"
    ]
  },
  "brand": {
    "attributes": ["playful", "confident", "arcade-native", "trustworthy", "craft-focused"],
    "voice": "Friendly, concise, a touch of arcade humor without obscuring clarity"
  },
  "typography": {
    "fonts": {
      "display_headings": {
        "name": "Pixelify Sans",
        "source": "Google Fonts",
        "import": "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap",
        "usage": "H1/H2 and large numerals; pixel-feel but readable"
      },
      "supporting_display": {
        "name": "Press Start 2P",
        "source": "Google Fonts",
        "import": "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
        "usage": "Small labels, UI chips, coin counters, nav; use sparingly (uppercase, tight tracking)"
      },
      "body": {
        "name": "Figtree",
        "source": "Google Fonts",
        "import": "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap",
        "usage": "Paragraphs, project descriptions, form inputs"
      }
    },
    "text_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl leading-tight",
      "h2": "text-base sm:text-lg font-bold tracking-wide",
      "body": "text-base sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm tracking-wide"
    },
    "pairing_rules": [
      "Use Pixelify Sans for H1/H2. Keep Press Start 2P for small UI labels so readability remains high.",
      "Body copy must always use Figtree at 16px+ on mobile for legibility."
    ]
  },
  "color_system": {
    "tokens_hsl": {
      "--background": "48 100% 98%",        
      "--foreground": "210 25% 12%",         
      "--card": "0 0% 100%",
      "--card-foreground": "210 25% 12%",
      "--primary": "195 84% 40%",           
      "--primary-foreground": "0 0% 100%",
      "--secondary": "46 96% 62%",          
      "--secondary-foreground": "210 25% 12%",
      "--accent": "160 74% 40%",            
      "--accent-foreground": "0 0% 100%",
      "--muted": "210 20% 94%",
      "--muted-foreground": "210 8% 35%",
      "--destructive": "3 86% 56%",          
      "--destructive-foreground": "0 0% 100%",
      "--border": "210 16% 85%",
      "--ring": "195 84% 40%",
      "--pixel-outline": "210 28% 20%",
      "--coin-gold": "46 96% 52%",
      "--heart-red": "3 86% 56%",
      "--sky-blue": "197 92% 46%",
      "--mint-green": "160 64% 42%",
      "--cream": "48 100% 96%"
    },
    "charts": {
      "--chart-1": "197 92% 46%",
      "--chart-2": "160 64% 42%",
      "--chart-3": "46 96% 52%",
      "--chart-4": "3 86% 56%",
      "--chart-5": "210 25% 12%"
    },
    "dark_mode_overrides": {
      "--background": "210 25% 8%",
      "--foreground": "48 100% 98%",
      "--card": "210 25% 10%",
      "--card-foreground": "48 100% 98%",
      "--border": "210 16% 24%"
    },
    "gradients": {
      "rules": "Follow GRADIENT RESTRICTION RULES below. Use only soft, high-key mixes; avoid purple/pink entirely.",
      "hero_bg": "linear-gradient(135deg, hsl(197 92% 96%) 0%, hsl(160 64% 96%) 55%, hsl(48 100% 96%) 100%)",
      "accent_wash": "linear-gradient(180deg, hsl(197 92% 98%) 0%, hsl(197 92% 94%) 100%)"
    }
  },
  "textures_and_fx": {
    "pixel_grid_bg_css": ".pixel-grid { background-image: linear-gradient(hsla(210,20%,85%,0.6) 1px, transparent 1px), linear-gradient(90deg, hsla(210,20%,85%,0.6) 1px, transparent 1px); background-size: 16px 16px; background-position: -1px -1px; }",
    "scanlines_overlay_css": ".scanlines::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(180deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 2px); pointer-events: none; mix-blend-mode: multiply; }",
    "pixelated_media_css": ".pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }",
    "noise_css": ".noise::before { content: ''; position: absolute; inset: 0; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>'); opacity: 0.5; pointer-events: none; }"
  },
  "layout": {
    "grid": {
      "container": "mx-auto px-4 sm:px-6 lg:px-10 max-w-6xl",
      "columns": 12,
      "gutter": "gap-4 sm:gap-6 lg:gap-8",
      "section_spacing": "py-12 sm:py-16 lg:py-24",
      "card_radius": "rounded-none border-2",
      "card_border": "border-[3px] border-[color:hsl(var(--pixel-outline))]"
    },
    "sections": {
      "header_nav": "Sticky top, pixel border, nav buttons with blocky hover. Include coin counter UI on right.",
      "hero": "Split on lg: avatar sprite + name/title on left; CTAs on right. On mobile: single column with avatar top, then copy, then buttons. Background uses hero_bg gradient + pixel_grid overlay, limited to <= 20% viewport coverage.",
      "skills": "Game HUD: health/energy/XP bars using shadcn Progress styled as chunky pixels. Animated fill with step easing.",
      "projects": "Bento grid (2-col on md, 3-col on lg). Each Card has pixel border, hover lift, and a top strip with coin/power-up badges.",
      "contact": "Card with blocky inputs, a small NPC speech bubble using Tooltip for helpful hints.",
      "footer": "Full-width, dark solid background (no gradient), 8-bit separators, social links as pixel icons (SVG) with Tooltip."
    }
  },
  "components": {
    "component_path": {
      "Button": "./components/ui/button",
      "Card": "./components/ui/card",
      "Progress": "./components/ui/progress",
      "Badge": "./components/ui/badge",
      "Tabs": "./components/ui/tabs",
      "Dialog": "./components/ui/dialog",
      "Tooltip": "./components/ui/tooltip",
      "Separator": "./components/ui/separator",
      "NavigationMenu": "./components/ui/navigation-menu",
      "Toast": "./components/ui/sonner",
      "Input": "./components/ui/input",
      "Textarea": "./components/ui/textarea",
      "Avatar": "./components/ui/avatar",
      "Carousel": "./components/ui/carousel"
    },
    "specs": [
      {
        "name": "PixelButton (wraps shadcn Button)",
        "classes": "rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] active:shadow-[0_0_0_0_hsl(var(--pixel-outline))] active:translate-x-[4px] active:translate-y-[4px] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--sky-blue))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))]",
        "variants": {
          "primary": "bg-[hsl(var(--primary))] text-white",
          "secondary": "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]",
          "ghost": "bg-white text-[hsl(var(--foreground))]"
        },
        "data_testid": "cta-primary-button"
      },
      {
        "name": "PixelCard (wraps shadcn Card)",
        "classes": "rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] bg-white shadow-[6px_6px_0_0_hsl(var(--pixel-outline))] hover:shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] transition-shadow",
        "usage": "Projects, skill groupings, contact form container",
        "data_testid": "pixel-card"
      },
      {
        "name": "StatBar (wraps shadcn Progress)",
        "classes": "h-6 rounded-none bg-[hsl(var(--muted))] border-[3px] border-[color:hsl(var(--pixel-outline))]",
        "indicator_classes": "bg-[hsl(var(--accent))]",
        "animation": "Use Framer Motion to animate width with steps(8, end) easing",
        "data_testid": "skill-stat-bar"
      },
      {
        "name": "CoinCounter",
        "classes": "flex items-center gap-2 px-3 py-2 border-[3px] rounded-none bg-white border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))]",
        "usage": "Header/right HUD showing collected coins",
        "data_testid": "coin-counter"
      },
      {
        "name": "ProjectCard",
        "classes": "group",
        "composition": ["PixelCard", "Badge", "Dialog"],
        "data_testid": "project-card"
      }
    ]
  },
  "motion_and_micro_interactions": {
    "principles": [
      "No blur/glow-heavy. Use crisp step-based motion to feel retro",
      "Every interactive item gets hover/focus/active states",
      "Parallax only on decorative background elements"
    ],
    "framer_motion": {
      "install": "npm i framer-motion",
      "button_tap": "whileTap={{ x: 4, y: 4 }} transition={{ type: 'tween', ease: 'steps(6,end)', duration: 0.15 }}",
      "card_hover": "whileHover={{ translateX: -2, translateY: -2 }} transition={{ type: 'tween', ease: 'steps(6,end)', duration: 0.25 }}",
      "progress_fill": "animate width from 0% to value% with steps easing"
    },
    "parallax": {
      "note": "Keep under 10px total translate for subtlety and avoid motion sickness",
      "sample_js": "window.addEventListener('scroll',()=>{ const y = window.scrollY; document.querySelectorAll('[data-parallax=bg]').forEach(el=>{ el.style.transform = `translateY(${Math.min(10, y*0.05)}px)`; }); });"
    }
  },
  "images_and_icons": {
    "image_urls": [
      {"url": "https://opengameart.org/content/lpc-character-spritesheet", "category": "hero-avatar", "description": "Pixel hero avatar (sprite sheet). Use one frame as static avatar or cycle 2-3 frames for idle animation.", "alt": "Pixel character avatar"},
      {"url": "https://opengameart.org/content/pixel-city-backgrounds", "category": "hero-bg", "description": "Wide pixel city skyline background for hero (apply image-rendering: pixelated).", "alt": "Pixel city skyline"},
      {"url": "https://opengameart.org/content/coin-animation", "category": "ui-coin", "description": "Gold coin sprite for counters and small power-up badges.", "alt": "Pixel gold coin"}
    ],
    "icon_guidance": "Use Lucide-react or FontAwesome for vector icons; for pixel-feel, use monochrome line icons and enclose in pixel borders. NEVER use emoji icons."
  },
  "tokens_css": {
    "root_override_snippet_for_index_css": "@layer base { :root { --background: 48 100% 98%; --foreground: 210 25% 12%; --card: 0 0% 100%; --card-foreground: 210 25% 12%; --primary: 195 84% 40%; --primary-foreground: 0 0% 100%; --secondary: 46 96% 62%; --secondary-foreground: 210 25% 12%; --accent: 160 74% 40%; --accent-foreground: 0 0% 100%; --muted: 210 20% 94%; --muted-foreground: 210 8% 35%; --destructive: 3 86% 56%; --destructive-foreground: 0 0% 100%; --border: 210 16% 85%; --ring: 195 84% 40%; --pixel-outline: 210 28% 20%; --coin-gold: 46 96% 52%; --heart-red: 3 86% 56%; --sky-blue: 197 92% 46%; --mint-green: 160 64% 42%; --cream: 48 100% 96%; --radius: 0px; } }"
  },
  "tailwind_utilities": {
    "buttons": "rounded-none border-[3px] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))]",
    "cards": "rounded-none border-[3px] shadow-[6px_6px_0_0_hsl(var(--pixel-outline))]",
    "hud": "border-[3px] rounded-none bg-white",
    "text_labels": "font-['Press_Start_2P'] tracking-wide uppercase text-[10px] sm:text-xs"
  },
  "pages_structure": [
    "Header (NavigationMenu + CoinCounter HUD)",
    "Hero (Avatar + Name/Title + Primary CTA + Secondary CTA)",
    "Skills HUD (Stat bars + badges)",
    "Projects Grid (3-6 items, Dialog for details)",
    "Contact (Form + socials)",
    "Footer (links + copyright)"
  ],
  "example_code": {
    "PixelButton_js": "import React from 'react'; import { Button } from './components/ui/button'; export const PixelButton = ({ className='', ...props }) => ( <Button data-testid={props['data-testid'] || 'pixel-button'} className={`rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))] active:shadow-[0_0_0_0_hsl(var(--pixel-outline))] active:translate-x-[4px] active:translate-y-[4px] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--sky-blue))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--ring))] ${className}`} {...props} /> );",
    "StatBar_js": "import React from 'react'; import { Progress } from './components/ui/progress'; export const StatBar = ({ value=70, colorVar='--accent', testid='skill-stat-bar' }) => { return (<div className=\"w-full\" data-testid={testid}> <div className=\"h-6 border-[3px] rounded-none border-[color:hsl(var(--pixel-outline))] bg-[hsl(var(--muted))]\"> <div className=\"h-full\" style={{ width: value+'%', background: `hsl(var(${colorVar}))` }} /> </div> </div> ); };",
    "CoinCounter_js": "import React from 'react'; export const CoinCounter = ({ coins=0 }) => (<div className=\"flex items-center gap-2 px-3 py-2 bg-white border-[3px] rounded-none border-[color:hsl(var(--pixel-outline))] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))]\" data-testid=\"coin-counter\"> <img className=\"w-5 h-5 pixelated\" src=\"/coins.png\" alt=\"coin\" /> <span className=\"font-['Press_Start_2P'] text-xs\">{coins}</span> </div>);",
    "ProjectCard_js": "import React from 'react'; import { Card } from './components/ui/card'; import { Badge } from './components/ui/badge'; export const ProjectCard = ({ title, desc, tags=[], onClick }) => (<Card onClick={onClick} data-testid=\"project-card\" className=\"rounded-none border-[3px] border-[color:hsl(var(--pixel-outline))] bg-white shadow-[6px_6px_0_0_hsl(var(--pixel-outline))] hover:shadow-[8px_8px_0_0_hsl(var(--pixel-outline))] transition-shadow cursor-pointer\"> <div className=\"p-4 space-y-3\"> <div className=\"flex items-center justify-between\"> <h3 className=\"font-['Pixelify Sans'] text-lg\">{title}</h3> <div className=\"flex gap-2\"> {tags.map(t=> <Badge key={t} data-testid=\"project-tag\" className=\"rounded-none border-[3px]\">{t}</Badge>)} </div> </div> <p className=\"text-sm text-[hsl(var(--muted-foreground))]\">{desc}</p> </div> </Card>);",
    "ContactForm_js": "import React from 'react'; import { Input } from './components/ui/input'; import { Textarea } from './components/ui/textarea'; import { Button } from './components/ui/button'; export const ContactForm = () => (<form className=\"space-y-4\" data-testid=\"contact-form\"> <Input data-testid=\"contact-name-input\" placeholder=\"Your name\" className=\"rounded-none border-[3px]\"/> <Input data-testid=\"contact-email-input\" type=\"email\" placeholder=\"Email\" className=\"rounded-none border-[3px]\"/> <Textarea data-testid=\"contact-message-textarea\" placeholder=\"Message\" className=\"rounded-none border-[3px] min-h-[120px]\"/> <Button data-testid=\"contact-submit-button\" className=\"rounded-none border-[3px] shadow-[4px_4px_0_0_hsl(var(--pixel-outline))]\">Send</Button> </form>);"
  },
  "accessibility": {
    "contrast": "WCAG AA minimum for all text; verify primary on background >= 4.5:1",
    "focus": "Visible 2px ring with --ring + offset; never remove outline",
    "motion_prefs": "Respect prefers-reduced-motion: disable parallax and long animations",
    "hit_targets": "Minimum 40px height for tappable elements",
    "aria_labels": "Add aria-labels on icon-only buttons; ensure Dialog has titles/descriptions"
  },
  "test_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid in kebab-case describing role",
    "examples": [
      "data-testid=\"hero-primary-cta-button\"",
      "data-testid=\"skill-stat-bar\"",
      "data-testid=\"project-card\"",
      "data-testid=\"coin-counter\"",
      "data-testid=\"contact-form\"",
      "data-testid=\"error-message\""
    ]
  },
  "libs_and_setup": {
    "install": [
      "npm i framer-motion",
      "npm i lucide-react",
      "npm i lottie-react"
    ],
    "usage_notes": [
      "Use framer-motion variants with steps easing for retro feel",
      "Use lottie sparingly for pixel power-up sparkles (no gradients on small items)",
      "Keep bundles lean; lazy-load Dialog content"
    ]
  },
  "navigation": {
    "items": ["About", "Skills", "Projects", "Contact"],
    "pattern": "NavigationMenu with blocky items; on mobile use Drawer or Sheet",
    "cta": "Hire Me button styled as PixelButton"
  },
  "content_rules": {
    "hero": "Name, title, 1-liner bio, 2 CTAs: View Projects (primary), Download Resume (secondary). Include avatar",
    "skills": "3-5 core skills with StatBar (HP, XP, Energy metaphor); badges for tools",
    "projects": "3-6 cards. Each with title, 1-2 line desc, tags, links (GitHub, Live). Dialog for detail and screenshots",
    "contact": "Form + social icons + email fallback link",
    "footer": "Full footer with site map, socials, copyright, built-with"
  },
  "seo_performance": {
    "meta": "Short title, description with keywords 'developer', 'portfolio', 'web', 'JavaScript'",
    "images": "Use width/height attrs, loading=lazy. Use image-rendering: pixelated for pixel assets",
    "lighthouse": "Target 90+; avoid heavy animations on mobile"
  },
  "instructions_to_main_agent": [
    "Update /app/frontend/src/index.css :root tokens with tokens_css.root_override_snippet_for_index_css (preserve dark class if needed).",
    "Import Google Fonts in index.html or via @import in index.css for Pixelify Sans, Press Start 2P, and Figtree.",
    "Use shadcn components only from ./components/ui/*.jsx. All new wrappers/components must be .js files using named exports.",
    "Adopt mobile-first layout (single column). Upgrade to 2/3 columns at sm/md breakpoints using grid.",
    "Respect Gradient Restriction Rule. Keep gradients for section backgrounds only and under 20% viewport coverage.",
    "Add data-testid attributes to every interactive or key info element as specified.",
    "Do not center the entire .App container. Align content left with generous spacing.",
    "No universal transition: avoid transition: all; specify properties.",
    "Use sonner toasts from ./components/ui/sonner.jsx for feedback (e.g., coin collected).",
    "If a calendar/date is ever needed, only use ./components/ui/calendar.jsx"
  ]
}


<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
