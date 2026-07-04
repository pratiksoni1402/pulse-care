# Pulse Care — Landing Page: Complete Design & Build Brief

This document consolidates the design brief and the light/dark theme audit into one build-ready spec.

---

## 1. Role

You are a Lead Design Engineer specialized in creating awesome, visually appealing, aesthetic landing pages with refined micro-interactions and obsessive attention to detail. Design the landing page for an AI-powered healthcare web app called **Pulse Care**.

## 2. Audience, Tone & Objective

- Primary audience: Patients
- Primary conversion goal: sign up
- Tone: calm, competent, trustworthy. Avoid generic "corporate SaaS" tone and cliché healthcare stock imagery (stethoscopes, globes, handshake photos).
- What "AI-powered" means here, concretely: **[e.g. AI triage, symptom checking, scheduling assistant, Report analysis, diagnostic support — be specific so the hero and AI section aren't generic]**

## 3. Design System Foundation

- **Colors** — use only semantic tokens from `src/app/globals.css`, via their Tailwind mappings (`bg-primary`, `text-muted-foreground`, etc.), never raw hex/hardcoded values. Available tokens: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1`…`chart-5`, `sidebar-*`. These are CSS variables that flip automatically between light and dark via the `.dark` class — you generally don't need separate light/dark instructions per element, just use the semantic class.
- **Typography** — the base layer already defines a full scale: `h1` (`text-7xl`) → `h6` (`text-2xl`), plus utility classes `.lead`, `.small`, `.muted`, `.mono`, `.caption`. Use only these. No new font-size utility should appear anywhere in this page's code.
- **Spacing** — Tailwind's 4px base grid, applied consistently (scale below).
- **Radius** — proportional scale off `--radius: 0.625rem` (`radius-sm` → `radius-4xl`).
- **Motion** — the `motion` library (formerly Framer Motion). Animate only `transform`/`opacity`; respect `prefers-reduced-motion` everywhere.
- **Icons** — `lucide-react` (bundled with Shadcn UI).
- **Components** — reuse/extend existing Shadcn UI components already in the project rather than one-off custom styles.

## 4. Fixes Needed Before Build (from contrast audit)

Computed directly from the OKLCH values in `globals.css`, not estimated:

1. **No `--destructive-foreground` token exists.** Add it — light: `oklch(0.98 0.004 200)` (tests at 4.76:1 ✅); dark: `oklch(0.14 0.015 220)`, a dark navy, **not white** (white only reaches 3.56:1 and fails AA on your dark destructive value; dark navy reaches 5.59:1). Needed for any form-error state (e.g. a "book a demo" form).
2. **`muted-foreground` on `muted` in dark mode is 4.2:1** — passes AA for large text only, fails for normal body-size text. Don't use `.caption`/`.small` (muted-foreground) on a `muted` background in dark mode — use `foreground` instead, or place that content on `card`/`background` (4.7–5.1:1+, safe).
3. `secondary` shifts hue between themes (sage/160 in light → teal/195 in dark). Fine as a neutral surface; be aware if the "sage" hue itself carries meaning somewhere.
4. Confirm actual `font-sans`/`font-heading` typefaces in the root layout's `next/font` config (not visible in `globals.css`), and confirm `h1`'s missing font-weight utility (h2–h6 all have one) is intentional.

Everything else — `foreground`/`background`, `primary-foreground`/`primary`, `secondary-foreground`/`secondary`, `accent-foreground`/`accent` — clears AA with real margin (6:1–18:1) in both themes.

## 5. Sections to Build

### Navbar

- Sticky, `bg-background/80` + backdrop-blur, `border-b border-border`
- Links `text-foreground`, active/hover `text-primary`; CTA button `bg-primary text-primary-foreground`, `rounded-lg`
- Motion: on-scroll transition of height/bg-opacity/border-opacity (150–200ms ease-out); underline-slide on link hover in `primary`

### Hero

- `bg-background` as the page base; optional soft radial glow behind the hero visual using `accent` at 5–8% opacity — a nod to the "AI/digital layer" the tokens are already labeled for
- Eyebrow badge (e.g. "AI-Powered Care"): `bg-accent text-accent-foreground`, `rounded-full`, `.caption` style
- Headline: `h1` as-is — don't invent a larger size for the hero
- Subhead: `.lead`
- Primary CTA: `bg-primary text-primary-foreground`; secondary CTA: `border border-border text-foreground`, hover `bg-muted`
- Motion: staggered fade + slide-up on load (badge → h1 → lead → buttons, ~80–120ms stagger); hero visual gentle float loop (±6px, ~4s ease-in-out)

### Trust bar

- `bg-muted` strip; logos reduced-opacity/grayscale via `text-muted-foreground`, full color on hover
- Label: `.caption`

### Features / How it works

- Cards: `bg-card border border-border`, radius `xl`/`2xl`
- Icon chip: `bg-primary/10` circle, icon in `primary`
- Heading `h4`/`h5`; body copy `foreground` (main line) + `muted-foreground` (secondary line)
- Motion: `whileInView` fade + slide-up, staggered per card (~80ms); hover → `-translate-y-1`, border toward `primary/30`, shadow deepens

### AI capability section

- This is the section your own tokens are semantically reserved for — concentrate `accent` usage here rather than spreading it thin elsewhere: a `bg-accent` panel or card cluster, more accent-forward than any other section
- Any illustrative metric/chart: pull from `chart-1`…`chart-5`
- Motion: one slow, low-amplitude pulse/glow loop on an "active AI" indicator (chat bubble, scanning line) — reserved for this section only, don't repeat the pattern elsewhere

### Testimonials

- Alternate `bg-background`/`bg-muted` against neighboring sections for rhythm
- Card `bg-card`, avatar ring `border`, star ratings (if used) in `chart-4` (warm amber)

### Security & compliance

- `bg-secondary` for a calm, trustworthy surface
- Badges (HIPAA, SOC2, etc.): outline style — `border border-border text-foreground` — not filled, reads credible rather than promotional
- Never use `destructive` decoratively here — it's reserved strictly for error/validation states (e.g. the demo-request form)

### Final CTA

- Recommended (matches the subtle/clean rule): `bg-background`/`bg-card`, large `primary` button, generous whitespace — calmer than inverting to a full `bg-primary` band, which reads more "marketing SaaS" than "clinical trust"
- Alternative if you want a bolder close: full `bg-primary text-primary-foreground` band — both are token-safe

### Footer

- `bg-card`, `border-t border-border`, links `text-muted-foreground` → `text-foreground` on hover

## 6. Typography Map

- Hero headline → `h1`
- Section headlines → `h2`/`h3`
- Card titles → `h5`/`h6`
- Subheads / intro paragraphs → `.lead`
- Supporting copy → `.muted`
- Eyebrows, badges, table headers → `.caption`
- Fine print → `.small`

## 7. Spacing

- Section vertical padding: `py-24 md:py-32`
- Container: `max-w-7xl mx-auto px-6 md:px-8`
- Gap between major blocks in a section: `gap-16`–`gap-24`
- Card grid gaps: `gap-6`
- Icon-to-text / badge internal spacing: `gap-2`–`gap-3`, `px-3 py-1`

## 8. Radius

- Buttons/inputs → `radius-md`/`lg`
- Cards → `radius-xl`/`2xl`
- Large media containers → `radius-2xl`/`3xl`
- Pills/avatars → `rounded-full`

## 9. Motion Principles

- Animate only `transform`/`opacity`; respect `prefers-reduced-motion` globally
- Scroll reveals: fade + 16px slide-up, `whileInView`, ~80ms stagger between children
- Hover: `-translate-y-1` + shadow/border shift on cards; color/opacity shift on links and buttons
- Load: hero content staggers in
- Ambient loop: reserved for the AI section only — keeps it feeling distinct rather than decorative
- Nav: scroll-based background/border transition

## 10. Accessibility

- WCAG AA contrast (verified via audit above — apply the two fixes in Section 4)
- Focus-visible is already globally handled (`outline-2 outline-ring outline-offset-2`) — make sure any custom interactive elements (e.g. card-as-link patterns) inherit this, not just native `button`/`a` elements
- Semantic HTML, alt text on all images
- Fully responsive, mobile-first — test at 375px / 768px / 1024px / 1440px

## 11. Technical Constraints

- Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI
- `lucide-react` for icons, `motion` for animation
- Reuse existing Shadcn components rather than building parallel one-off versions

## 12. Open Decisions (yours before/while building)

1. Primary audience and primary conversion goal (Section 2)
2. What "AI-powered" means concretely — the specific capability the hero and AI section should sell
3. Confirm `font-sans`/`font-heading` typefaces and `h1` weight (check root layout's `next/font` setup)
4. Patch `--destructive-foreground` per Section 4
5. Final-CTA tone: calm/consistent vs. bold inverted band
6. Whether the page needs a runtime theme toggle, or just needs to render correctly under whichever theme is already active app-wide
7. Deliverable format: single `page.tsx` with inline sections, or one component file per section

## 13. Source of Truth

- `src/app/globals.css` (+ `tailwind.config.ts` if present) for all color tokens
- This document for structure, motion, spacing, and typography rules
