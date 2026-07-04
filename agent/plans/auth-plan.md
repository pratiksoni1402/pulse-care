# Pulse Care — Auth Page Plan (Login + Register)

This plan follows the same design-system rules established in the landing page brief and theme audit (token usage, typography scale, spacing, radius, motion library) so the auth page feels like the same product, not a bolted-on template.

---

## 1. Architecture — Feature-Driven Structure

```
src/features/auth/
  login/
    login-form.tsx        -> login form UI + validation
    login-schema.ts        -> zod schema for email/password
  register/
    register-form.tsx      -> register form UI + validation
    register-schema.ts     -> zod schema for name/email/password/confirm/terms
  oauth/
    google-signin-button.tsx  -> shared Google button
    oauth-actions.ts           -> signInWithGoogle() stub, swappable per auth provider
  components/
    auth-divider.tsx        -> "or continue with email" divider
    auth-shell.tsx           -> client component: full 2-col grid + motion wrapper
  index.ts                   -> barrel export

src/app/(auth)/auth/page.tsx   -> server component, exports metadata, renders <AuthShell />
```

Why `auth-shell.tsx` is separate from `page.tsx`: Next.js doesn't allow `export const metadata` in a file marked `"use client"`. Since the grid layout needs client-side motion, `page.tsx` stays a server component that only exports metadata and renders the shell; all interactivity lives in `auth-shell.tsx` and the two form components.

## 2. Page Layout

- Full-viewport backdrop: `bg-muted`, centered content, generous padding
- A small wordmark/logo above the container, linking back to `/`
- Container: `max-w-5xl`, `bg-card`, `border border-border`, `rounded-3xl`, `shadow-sm`, `overflow-hidden`
- Desktop (`lg:` and up): `grid-cols-2` with `lg:divide-x lg:divide-border` — left column = login module, right column = register module
- Mobile (below `lg`): single column, stacked — login first, register second, separated by `divide-y divide-border` (natural DOM order handles this, no separate mobile markup needed)
- Each column: centered content (`flex flex-col justify-center`), generous internal padding (`p-8 md:p-12`)

## 3. Component Breakdown

**Login column (left / top)**

1. Heading (`h3`): "Welcome back"
2. Subtext (`.lead`): short line on what they're signing into
3. `GoogleSignInButton` — placed above the form, per spec
4. `AuthDivider` — "or continue with email"
5. `LoginForm` — email, password (with show/hide toggle), "forgot password" link, submit button

**Register column (right / bottom)**

1. Heading (`h3`): "Create an account"
2. Subtext (`.lead`)
3. `RegisterForm` — name, email, password, confirm password, terms checkbox, submit button
4. No Google button here — your spec places it only above the login form

## 4. Design Token Application

Pulling directly from the audited `globals.css` tokens:

- Page backdrop: `bg-muted` / container: `bg-card` / divider: `border-border`
- Primary submit buttons: `bg-primary text-primary-foreground`
- **Google button override**: Shadcn's default `outline` variant hovers to `bg-accent` — in this system `accent` is reserved for the AI/digital-layer sections (per the theme plan), so the Google button will override that hover to `bg-muted` instead, keeping `accent` meaningful and unused outside its intended context
- Validation error text: needs the `--destructive-foreground` patch flagged in the theme audit (light `oklch(0.98 0.004 200)`, dark `oklch(0.14 0.015 220)`) if any error state uses a `destructive` background rather than just `text-destructive`
- Typography: `h3` for column headings, `.lead` for subtext, `.caption` for the divider label, `.small` for legal/helper text (terms checkbox line, password hint)
- Radius: `radius-2xl`/`3xl` for the outer container, `radius-md`/`lg` for inputs and buttons (consistent with the landing page scale)

## 5. Metadata (server page)

```
title: "Sign In or Create Account | Pulse Care"
description: short, plain description of accessing/creating an account
robots: noindex, nofollow — auth pages shouldn't be indexed by search engines
```

## 6. Accessibility

- Labels wired via Shadcn's `Form`/`FormLabel`/`FormControl` primitives (proper `htmlFor`/`aria-describedby`/`aria-invalid` out of the box)
- Password visibility toggle gets an `aria-label` that changes with state ("Show password" / "Hide password")
- Correct `autoComplete` values: `email`, `current-password` (login), `new-password` (register), `name`
- Focus-visible is already handled globally by your base layer — custom interactive elements (the password-toggle icon button) will inherit it
- All entrance motion respects `prefers-reduced-motion`

## 7. Motion

- Entrance: container fades + slides up on mount; login and register columns stagger in (~100ms apart)
- Google button: subtle hover lift (shadow + slight scale), not a color change beyond the `bg-muted` override above
- Password toggle: icon swap with a quick opacity/scale transition rather than an instant jump
- Nothing ambient/looping here — this page's job is speed and clarity, not atmosphere; the AI-section-style pulse loop from the landing page stays there, not here

## 8. Open Decisions

1. **Auth provider/backend** (NextAuth/Auth.js, Better-Auth, or a custom API route backed by Drizzle) — not specified yet. The form submit handlers and `signInWithGoogle()` will be built as clearly marked, swappable stub functions so the UI is complete regardless of which you pick, and wiring the real call becomes a one-function change. -> use Better Auth
2. **Route path** — assuming `/auth` (via `src/app/(auth)/auth/page.tsx`, using a route group so this page skips the marketing nav/footer layout). Say so if you want a different path (e.g. `/login`, `/sign-in`).
3. **Google on register too?** — spec says the Google button sits only above the login form; proceeding on that reading. Flag if register should also offer it . -> Yes
4. **Terms & Privacy links** in the register checkbox — will point to placeholder `/terms` and `/privacy` routes unless you have real ones already. this -> route exist as `/src/app/terms` and `/src/app/privacy-policy`

Once you confirm/adjust the open decisions, I'll build the actual components against this plan.a
