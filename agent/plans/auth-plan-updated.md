# Pulse Care — Auth Page Plan (Refined: Single Active Form + Split Layout)

## What changed from the previous version

- Only one form is visible at a time (login by default) — no more side-by-side login+register
- Layout is now an asymmetric 12-column split: **col-span-8** brand/visual panel, **col-span-4** form panel (not an even 2-column divide)
- Switching between login/register happens via inline text links, with a smooth animated transition, not a page reload
- Logo is rendered via `next/image` from `public/assets/logo/logo.webp`
- Responsive behavior redefined around the new asymmetric layout

---

## 1. Layout

- Full-viewport 12-column grid: `grid grid-cols-1 lg:grid-cols-12 min-h-screen`
- **Left — Brand Panel** (`lg:col-span-8`): hidden below `lg` (`hidden lg:flex`). Holds the logo and value-proposition copy.
- **Right — Form Panel** (`lg:col-span-4`, full width below `lg`): holds whichever form is currently active, `border-l border-border` on `lg` and up.
- On mobile, since the brand panel is hidden, a compact version of the logo appears at the top of the form panel instead, so branding isn't lost.

## 2. Behavior — Single Active Form + Toggle

- A `mode` state (`"login" | "register"`), defaulting to `"login"`, lives in `AuthShell` (client component).
- **Login view**: `GoogleSignInButton` → `AuthDivider` → `LoginForm` → toggle line: _"Don't have an account? **Create Account**"_
- **Register view**: `RegisterForm` → toggle line: _"Already have an account? **Login**"_
- Clicking the bold action text flips `mode` — no navigation, no reload, same route.
- Transition: `AnimatePresence` wraps the active form block. Outgoing content fades + slides out, incoming content fades + slides in from the opposite side depending on switch direction, ~250–300ms ease. Falls back to a plain crossfade (no slide) when `prefers-reduced-motion` is set.

## 3. Feature Structure (updated)

```
src/features/auth/
  login/
    login-form.tsx
    login-schema.ts
  register/
    register-form.tsx
    register-schema.ts
  oauth/
    google-signin-button.tsx
    oauth-actions.ts
  components/
    brand-panel.tsx        <- NEW: logo + value-prop copy, col-8 side
    auth-form-panel.tsx    <- NEW: col-4 side, owns the AnimatePresence transition + toggle links
    auth-toggle-link.tsx   <- NEW: shared "Don't have an account? Create Account" / reverse
    auth-divider.tsx
    auth-shell.tsx          <- owns `mode` state, renders the grid + BrandPanel + AuthFormPanel
  index.ts

src/app/(auth)/auth/page.tsx   <- server component, exports metadata, renders <AuthShell />
```

## 4. Brand Panel (col-8)

- Background: `bg-muted`, full height (open to a subtle accent-tinted glow instead — see Open Decisions)
- Logo via `next/image`, explicit width/height (no layout shift), `priority` since it's visible without scrolling
- Below the logo: `h2` heading + `.lead` paragraph — the value-proposition copy on why to sign in or register
- Optional: 2–3 short benefit bullets with icon chips (`bg-primary/10` chip pattern from the landing page), for texture rather than a wall of text
- Hidden entirely below `lg` (`hidden lg:flex`)

## 5. Form Panel (col-4)

- Background: `bg-background` (gentle contrast against the brand panel's `bg-muted`), `border-l border-border` on `lg` and up
- Compact logo shown only below `lg` (`lg:hidden`), since the full brand-panel logo is hidden there
- Centered content: `max-w-sm mx-auto`, `flex flex-col justify-center`, full height
- Renders the `AnimatePresence`-wrapped active form described in Section 2

## 6. Motion

- Form switch: fade + horizontal slide, direction determined by which way the user is switching (login→register vs. register→login), ~250–300ms, `AnimatePresence mode="wait"`
- Respects `prefers-reduced-motion` — degrades to a plain crossfade with no slide
- Brand panel: a single on-mount fade only — no looping/ambient animation here (that stays reserved for the AI section on the landing page)
- Buttons: same hover/press micro-interactions as the rest of the system

## 7. `next/image` Usage

```tsx
import Image from 'next/image'

;<Image
  src="/assets/logo/logo.webp"
  alt="Pulse Care"
  width={160}
  height={40}
  priority
  className="h-8 w-auto lg:h-10"
/>
```

- Width/height set explicitly — required by `next/image`, and prevents layout shift
- `priority` because the logo is visible immediately, without scrolling, on this page
- The width/height ratio above is a placeholder — match it to `logo.webp`'s real aspect ratio so it isn't stretched or squashed

## 8. Responsive Summary

| Breakpoint | Brand panel                    | Form panel                       |
| ---------- | ------------------------------ | -------------------------------- |
| `< lg`     | hidden                         | full width, compact logo at top  |
| `>= lg`    | `col-span-8`, full logo + copy | `col-span-4`, `border-l` divider |

## 9. Open Decisions

1. Should switching modes update the URL (e.g. `/auth?mode=register`) so a refresh or shared link preserves the view, or is in-memory state (resets to login on reload) acceptable? A query param gives a better back-button experience — flagging it as an option, defaulting to simple local state unless you want it. -> No
2. Brand panel background: plain `bg-muted`, or a subtle accent-tinted glow echoing the landing page's AI section?
3. Brand-panel copy: I can draft the value-prop headline + supporting line (and optional benefit bullets), or you can supply exact wording.
4. Still open from the previous round: auth provider/backend (NextAuth, Better-Auth, custom + Drizzle) and the confirmed route path (assuming `/auth`).

Once these are confirmed, I'll build the actual components against this plan.
