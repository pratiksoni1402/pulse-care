# Pulse Care — Auth Page Plan (Refined: Login + Register + Forgot Password, All In-Page)

## What changed from the previous version

- "Forgot password?" no longer links to a separate route — it's now a third in-page mode, shown with the same smooth transition as login/register
- New `forgot-password` module: email field only, plus "Back to Login" and "Create Account? Register Here" links below it, both switching modes in place
- No `/auth/forgot-password` route is needed at all — everything lives on the single `/auth` page

---

## 1. Modes

The form panel now has three possible views, controlled by one state value:

```ts
type AuthMode = 'login' | 'register' | 'forgot-password'
```

Default: `"login"`. All transitions between the three are in-place (no navigation, no reload), using the same `AnimatePresence` swap already planned for login ↔ register.

## 2. Behavior Per Mode

**Login**

- `GoogleSignInButton` → `AuthDivider` → `LoginForm`
- "Forgot password?" sits next to the Password label as it did before, but is now a `<button type="button">`, not an `<a href>` — it calls an `onForgotPasswordClick` callback passed down into `LoginForm`, which flips the parent's mode to `"forgot-password"`
- Bottom toggle: _"Don't have an account? **Create Account**"_ → switches to `"register"`

**Register**

- `RegisterForm`
- Bottom toggle: _"Already have an account? **Login**"_ → switches to `"login"`

**Forgot Password**

- `ForgotPasswordForm` — just an email field, a short instruction line ("Enter your email and we'll send you a reset link"), and a submit button
- On successful submit: show an inline confirmation state in place ("Check your inbox for a reset link") rather than navigating anywhere
- Below the form, two links:
  - _"Back to Login"_ → switches to `"login"`
  - _"Create Account? **Register Here**"_ → switches to `"register"`

## 3. Feature Structure (updated)

```
src/features/auth/
  login/
    login-form.tsx              <- now takes an `onForgotPasswordClick` prop
    login-schema.ts
  register/
    register-form.tsx
    register-schema.ts
  forgot-password/               <- NEW
    forgot-password-form.tsx
    forgot-password-schema.ts    <- just email validation
  oauth/
    google-signin-button.tsx
    oauth-actions.ts
  components/
    brand-panel.tsx
    auth-form-panel.tsx          <- owns the 3-way AnimatePresence swap + all toggle links
    auth-toggle-link.tsx          <- shared "{prompt} {action}" link, reused across all three modes
    auth-divider.tsx
    auth-shell.tsx                 <- owns `mode` state, renders grid + BrandPanel + AuthFormPanel
  index.ts

src/app/(auth)/auth/page.tsx        <- unchanged: server component, exports metadata, renders <AuthShell />
```

No new route is added — `forgot-password` is a rendering state inside `auth-form-panel.tsx`, not a URL.

## 4. `AuthToggleLink` — one shared component, three uses

Same small component handles all of these, just with different props:

- Login: `prompt="Don't have an account?"` `action="Create Account"` `onClick={() => setMode("register")}`
- Register: `prompt="Already have an account?"` `action="Login"` `onClick={() => setMode("login")}`
- Forgot password (two instances, stacked): `action="Back to Login"` with no prompt, `onClick={() => setMode("login")}`; and `prompt="Create Account?"` `action="Register Here"` `onClick={() => setMode("register")}`

## 5. Motion — updated for 3 states

With only two modes, a directional left/right slide was simple (each mode has one obvious "opposite side"). With three modes, forcing a strict left/right direction for every possible switch (login→register, login→forgot, register→forgot, forgot→login, forgot→register) adds real complexity for limited visual payoff.

**Recommended default:** a non-directional crossfade + slight upward slide (`opacity 0→1`, `y: 8→0`) for every mode change, via `AnimatePresence mode="wait"`. Still smooth, and stays simple regardless of how many modes exist later.

**Optional fancier alternative:** keep directional sliding by giving each mode a fixed position in an ordered list (e.g. `["forgot-password", "login", "register"]`) and computing slide direction from whether the new mode's index is higher or lower than the old one. Worth doing only if the extra motion polish matters more to you than the added state-tracking complexity.

Either way: respects `prefers-reduced-motion` (falls back to an instant swap, no animation).

## 6. Open Decisions

1. Confirm the recommended non-directional fade+slide transition, or prefer the directional left/right version despite the added complexity.
2. Should "send reset link" in the forgot-password form call the same backend as login/register, or a separate stub endpoint? (Stubbed as its own function either way — `requestPasswordReset(email)` — until you tell me your auth provider.)
3. Still open from before: auth provider/backend (NextAuth, Better-Auth, custom + Drizzle), brand-panel background treatment, brand-panel copy wording, and whether mode should sync to a URL query param for refresh/back-button support.

Once these are settled, I'll build the actual components against this plan.
