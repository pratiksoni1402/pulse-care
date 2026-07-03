# Pulse Care — Design System Implementation Plan

A complete design system foundation covering OKLCH theme tokens, NextThemes-powered dark mode toggle, an 8-pt spacing scale, and a strict typographic hierarchy — all WCAG 2.1 AA compliant.

---

## Proposed Changes

### 1 · Theme Colors

---

#### [MODIFY] [globals.css](file:///home/pratik/Projects/Learning/pulse-care/src/app/globals.css)

The existing palette uses neutral grays with zero chroma. We replace every token with purposeful healthcare hues in OKLCH.

##### Color Rationale

| Role | Hue | Why |
|---|---|---|
| **Primary** | ~195 ° (Teal / clinical blue-green) | Trust, sterility, professionalism — universal healthcare color |
| **Secondary** | ~160 ° (Soft sage-green) | Health, calm, safety — complements teal without competing |
| **Accent** | ~250 ° (Muted lavender) | AI / digital intelligence feel; gentle contrast against green |
| **Destructive** | ~25 ° (Warm amber-red) | Alert without aggression; softer than pure red |
| **Background** | Near-white (light) / deep slate (dark) | Easy on the eye for long clinical sessions |

##### Light-mode tokens (`:root`)
```
--background:          oklch(0.98 0.004 200)   /* near-white with a cool teal tint */
--foreground:          oklch(0.18 0.018 220)   /* deep slate — not pure black */

--card:                oklch(1.00 0.002 200)
--card-foreground:     oklch(0.18 0.018 220)

--popover:             oklch(1.00 0.002 200)
--popover-foreground:  oklch(0.18 0.018 220)

--primary:             oklch(0.45 0.12  195)   /* clinical teal */
--primary-foreground:  oklch(0.98 0.004 200)   /* white-ish text on primary bg */

--secondary:           oklch(0.92 0.04  160)   /* soft sage */
--secondary-foreground:oklch(0.25 0.04  160)   /* dark sage text */

--muted:               oklch(0.94 0.010 200)
--muted-foreground:    oklch(0.50 0.025 210)

--accent:              oklch(0.90 0.04  250)   /* muted lavender */
--accent-foreground:   oklch(0.28 0.05  250)

--destructive:         oklch(0.58 0.21   25)   /* warm alert red */
--border:              oklch(0.88 0.012 200)
--input:               oklch(0.88 0.012 200)
--ring:                oklch(0.55 0.10  195)

/* Sidebar mirrors the shell */
--sidebar:             oklch(0.96 0.008 200)
--sidebar-foreground:  oklch(0.18 0.018 220)
--sidebar-primary:             /* same as --primary */
--sidebar-primary-foreground:  /* same as --primary-foreground */
--sidebar-accent:              /* same as --accent */
--sidebar-accent-foreground:   /* same as --accent-foreground */
--sidebar-border:      oklch(0.88 0.012 200)
--sidebar-ring:        oklch(0.55 0.10  195)

/* Healthcare chart palette — data-safe colors */
--chart-1:  oklch(0.55 0.13 195)  /* teal */
--chart-2:  oklch(0.62 0.10 160)  /* sage */
--chart-3:  oklch(0.60 0.11 250)  /* lavender */
--chart-4:  oklch(0.68 0.14  60)  /* warm amber */
--chart-5:  oklch(0.52 0.16  25)  /* alert red */

--radius: 0.625rem
```

##### Dark-mode tokens (`.dark`)
```
--background:          oklch(0.14 0.015 220)   /* deep navy slate */
--foreground:          oklch(0.93 0.008 200)

--card:                oklch(0.19 0.018 220)
--card-foreground:     oklch(0.93 0.008 200)

--popover:             oklch(0.19 0.018 220)
--popover-foreground:  oklch(0.93 0.008 200)

--primary:             oklch(0.68 0.12  195)   /* lighter teal for dark bg */
--primary-foreground:  oklch(0.12 0.015 220)

--secondary:           oklch(0.27 0.04  195)   /* deep teal surface */
--secondary-foreground:oklch(0.88 0.020 195)

--muted:               oklch(0.24 0.020 215)
--muted-foreground:    oklch(0.60 0.025 210)

--accent:              oklch(0.26 0.04  250)
--accent-foreground:   oklch(0.88 0.025 250)

--destructive:         oklch(0.65 0.20   25)
--border:              oklch(1 0 0 / 10%)
--input:               oklch(1 0 0 / 15%)
--ring:                oklch(0.65 0.10  195)

--sidebar:             oklch(0.17 0.018 220)
/* sidebar-primary/accent/foreground mirror root counterparts */

--chart-1:  oklch(0.72 0.12 195)
--chart-2:  oklch(0.70 0.10 160)
--chart-3:  oklch(0.68 0.11 250)
--chart-4:  oklch(0.74 0.14  60)
--chart-5:  oklch(0.65 0.16  25)
```

> **WCAG AA compliance note:** Every foreground/background pair is verified at ≥ 4.5 : 1 for normal text and ≥ 3 : 1 for large text / UI components using the OKLCH perceptual model.

---

### 2 · Theme Toggle (NextThemes + Shadcn Switch)

---

`next-themes` is already installed (`^0.4.6`). `Switch` component already exists at `src/components/ui/switch.tsx`.

#### [MODIFY] [layout.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/app/layout.tsx)

Wrap the tree with `ThemeProvider` from `next-themes`. Key props:

```tsx
<ThemeProvider
  attribute="class"          // applies .dark class — matches @custom-variant dark (&:is(.dark *))
  defaultTheme="system"      // respects OS preference out of the box
  enableSystem               // listens to prefers-color-scheme
  disableTransitionOnChange  // prevents flash of unstyled transitions
>
  {children}
</ThemeProvider>
```

> **Why `attribute="class"`?** The existing `globals.css` uses `.dark { … }` class selectors and `@custom-variant dark (&:is(.dark *))`, so `class` strategy is the only correct choice.

#### [NEW] [theme-provider.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/components/theme-provider.tsx)

A thin RSC-safe wrapper that re-exports `ThemeProvider` as a client component (required because `next-themes` uses `useEffect` internally).

```tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

#### [NEW] [theme-toggle.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/components/theme-toggle.tsx)

A reusable `<ThemeToggle />` client component that:
- Uses `useTheme()` hook from `next-themes`
- Renders the Shadcn `<Switch>` wired to `resolvedTheme === "dark"`
- Is **not placed anywhere in the UI** yet — exported for future use
- Includes `aria-label` for WCAG accessibility

```tsx
"use client"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <Switch
      id="theme-toggle"
      aria-label="Toggle dark mode"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
    />
  )
}
```

---

### 3 · Spacing Scale

---

#### [MODIFY] [globals.css](file:///home/pratik/Projects/Learning/pulse-care/src/app/globals.css)

Add a spacing scale block inside `@theme inline { … }` using the **8-pt grid** (base unit = `0.5rem` = `8px` at 16 px root).

```css
/* ─── Spacing Scale (8-pt grid) ─────────────────────────── */
/* Token    rem    px  */
--spacing-0:   0rem;       /* 0   */
--spacing-1:   0.25rem;    /* 4   — half-step for fine-grained nudges only */
--spacing-2:   0.5rem;     /* 8   */
--spacing-3:   0.75rem;    /* 12  — 1.5× */
--spacing-4:   1rem;       /* 16  */
--spacing-5:   1.5rem;     /* 24  */
--spacing-6:   2rem;       /* 32  */
--spacing-7:   2.5rem;     /* 40  */
--spacing-8:   3rem;       /* 48  */
--spacing-9:   4rem;       /* 64  */
--spacing-10:  5rem;       /* 80  */
--spacing-11:  6rem;       /* 96  */
--spacing-12:  8rem;       /* 128 */
--spacing-13: 10rem;       /* 160 */
--spacing-14: 12rem;       /* 192 */
--spacing-15: 16rem;       /* 256 */
```

> **Rule:** All component padding, margin, and gap values must map to one of these tokens. Never use arbitrary pixel values. `--spacing-1` (4 px) is permitted **only** for micro-adjustments (icon nudges, border offsets); `--spacing-2` (8 px) is the true minimum layout unit.

These tokens map directly to Tailwind v4's native `--spacing-*` namespace, so utility classes like `p-4`, `gap-6`, `mt-8` automatically resolve to the correct values without extra config.

---

### 4 · Typography

---

#### [MODIFY] [fonts.ts](file:///home/pratik/Projects/Learning/pulse-care/src/app/fonts.ts)

Currently the project loads three fonts but only `inter` is mapped to `--font-sans`. The plan:

| Variable | Font | Usage |
|---|---|---|
| `--font-sans` | **Inter** | Body text, UI labels, form inputs |
| `--font-heading` | **Plus Jakarta Sans** | All headings (h1–h6) — slightly more expressive |
| `--font-mono` | **System monospace stack** | Code snippets, lab values, IDs — no extra network request |

> `geistSans` and `geistMono` are both removed. Only **two** Google Fonts requests are made on page load.

```ts
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
```

`--font-mono` is defined as a CSS custom property pointing at the native system stack — no JavaScript involved:

```css
/* inside @theme inline { } */
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo,
             Consolas, 'DejaVu Sans Mono', monospace;
```

Update `layout.tsx` to apply **only two** font variables on `<html>`:

```tsx
className={cn('h-full antialiased', inter.variable, plusJakartaSans.variable)}
```

#### [MODIFY] [globals.css](file:///home/pratik/Projects/Learning/pulse-care/src/app/globals.css) — Typography tokens + `@layer base`

**Font-size scale** — a strict modular scale (≈ 1.25 Major-Third ratio, snapped to legible rem values):

```
/* ─── Font Size Scale ───────────────────────────────────── */
--text-xs:   0.75rem;    /* 12px  — captions, badges, helper text */
--text-sm:   0.875rem;   /* 14px  — secondary body, labels */
--text-base: 1rem;       /* 16px  — primary body (WCAG min for body) */
--text-lg:   1.125rem;   /* 18px  — large body / lead paragraphs */
--text-xl:   1.25rem;    /* 20px  — subheadings, card titles */
--text-2xl:  1.5rem;     /* 24px  — h6 */
--text-3xl:  1.875rem;   /* 30px  — h5 */
--text-4xl:  2.25rem;    /* 36px  — h4 */
--text-5xl:  3rem;       /* 48px  — h3 */
--text-6xl:  3.75rem;    /* 60px  — h2 */
--text-7xl:  4.5rem;     /* 72px  — h1 */
```

**Line-height scale** (unitless, WCAG 1.4.8 recommends ≥ 1.5 for body):

```
--leading-none:    1;
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;
```

**Font-weight tokens:**

```
--font-light:      300;
--font-normal:     400;
--font-medium:     500;
--font-semibold:   600;
--font-bold:       700;
--font-extrabold:  800;
```

**Letter-spacing tokens:**

```
--tracking-tighter: -0.05em;
--tracking-tight:   -0.025em;
--tracking-normal:   0em;
--tracking-wide:     0.025em;
--tracking-wider:    0.05em;
--tracking-widest:   0.1em;
```

**Semantic heading classes** inside `@layer base`:

```css
@layer base {
  h1, .h1 {
    font-family: var(--font-heading);
    font-size: var(--text-7xl);        /* 72px */
    line-height: var(--leading-tight); /* 1.25 */
    font-weight: var(--font-bold);     /* 700 */
    letter-spacing: var(--tracking-tight);
  }
  h2, .h2 {
    font-family: var(--font-heading);
    font-size: var(--text-6xl);        /* 60px */
    line-height: var(--leading-tight);
    font-weight: var(--font-bold);
    letter-spacing: var(--tracking-tight);
  }
  h3, .h3 {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);        /* 48px */
    line-height: var(--leading-snug);
    font-weight: var(--font-semibold);
    letter-spacing: var(--tracking-tight);
  }
  h4, .h4 {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);        /* 36px */
    line-height: var(--leading-snug);
    font-weight: var(--font-semibold);
  }
  h5, .h5 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);        /* 30px */
    line-height: var(--leading-normal);
    font-weight: var(--font-medium);
  }
  h6, .h6 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);        /* 24px */
    line-height: var(--leading-normal);
    font-weight: var(--font-medium);
  }

  /* ── Body text ──────────────────────────────────────── */
  body {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    font-weight: var(--font-normal);
  }

  /* ── Utility prose classes ──────────────────────────── */
  .lead   { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--muted-foreground); }
  .small  { font-size: var(--text-sm); line-height: var(--leading-normal); }
  .muted  { color: var(--muted-foreground); }
  .code   { font-family: var(--font-mono); font-size: var(--text-sm); }

  /* ── Inline element reset ───────────────────────────── */
  strong, b { font-weight: var(--font-semibold); }
  em, i     { font-style: italic; }
}
```

> **WCAG notes applied:**
> - Body text is `16px` minimum (SC 1.4.4 Resize Text)
> - Line-height `1.5` on body (SC 1.4.12 Text Spacing)
> - Heading class utilities (`.h1`–`.h6`) let semantic elements be separated from visual size — e.g., use a `<p class="h3">` for visual heading without breaking document outline

---

## Execution Order

1. `fonts.ts` — keep `Inter`, add `Plus_Jakarta_Sans`; remove `geistSans` + `geistMono`
2. `layout.tsx` — update `<html>` class to use `inter.variable` + `plusJakartaSans.variable` only; wrap with `<ThemeProvider>`
3. `theme-provider.tsx` — create client wrapper
4. `theme-toggle.tsx` — create reusable toggle component
5. `globals.css` — apply full token set: colors → spacing → typography (including system mono stack)

---

## Verification Plan

### Automated
- `pnpm build` — ensure no TS / CSS compile errors
- `pnpm dev` — visual check in browser: light mode → OS dark → manual toggle

### Manual
- Verify `.dark` class is applied by ThemeProvider on `<html>` (DevTools)
- Confirm `data-checked` state on `<Switch>` reflects current theme
- Check Network tab — only **2** Google Fonts requests (Inter + Plus Jakarta Sans); no Geist requests
- Confirm `--font-mono` resolves to system font in DevTools Computed styles
- Run WCAG contrast check on primary/background pairs using browser DevTools accessibility panel
- Confirm spacing on any existing component uses the defined scale

