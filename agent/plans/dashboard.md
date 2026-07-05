# Pulse Care — Dashboard Shell Plan (Sidebar + Header)

Sidebar tokens checked against WCAG first: `sidebar-foreground`/`sidebar`, `sidebar-primary-foreground`/`sidebar-primary`, and `sidebar-accent-foreground`/`sidebar-accent` all pass AA comfortably (6.2:1–16.7:1) in both themes — no fixes needed here, unlike a couple of the general tokens flagged earlier. Also worth noting up front: `globals.css` already defines `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring` — these are the exact CSS variable names Shadcn's sidebar primitive expects, so the sidebar will pick up correct theming automatically with zero custom color classes, in both themes.

---

First of all thoroughly analyze the structure implemented in project. Current feature driven development standard is used so follow the same.

## 1. Architecture

Builds on Shadcn's sidebar primitives (assumes `npx shadcn add sidebar` has already generated `components/ui/sidebar.tsx`):

```
src/components/
  app-sidebar.tsx          <- given path: composed sidebar (logo, nav menu, mobile-only NavUser in footer)
  nav-main.tsx              <- the 5 menu items, active-route highlighting
  nav-user.tsx              <- avatar + name/email + dropdown trigger (reused in sidebar footer & header)
  account-menu-content.tsx  <- shared DropdownMenuContent: Profile / Settings / Logout (single source of truth for both placements)
  dashboard-header.tsx      <- SidebarTrigger + Breadcrumb + ThemeToggle + (desktop-only) NavUser
  theme-toggle.tsx          <- sun/moon switch

src/app/(dashboard)/
  layout.tsx                <- SidebarProvider + <AppSidebar/> + <SidebarInset> wrapping header + page content
  dashboard/page.tsx
  patient/page.tsx
  appointments/page.tsx
  medications/page.tsx
  reports/page.tsx
```

`AccountMenuContent` holds the actual Profile/Settings/Logout items (icons, routes, the logout handler) in one place. Both the header's avatar trigger and the sidebar's `NavUser` trigger render the same content — only the trigger and its visibility differ, so there's no duplicated menu logic between desktop and mobile.

## 2. Sidebar Menu

| Label        | Route           | Icon (lucide)     |
| ------------ | --------------- | ----------------- |
| Dashboard    | `/dashboard`    | `LayoutDashboard` |
| Patient      | `/patient`      | `UserRound`       |
| Appointments | `/appointments` | `CalendarDays`    |
| Medications  | `/medications`  | `Pill`            |
| Reports      | `/reports`      | `FileText`        |

- `/dashboard` is the default landing route post-login (confirm your auth redirect points here)
- Active item detected via `usePathname()`, styled with `bg-sidebar-accent text-sidebar-accent-foreground` (already audited above), inactive items `text-sidebar-foreground` with a hover state at reduced opacity
- Active link gets `aria-current="page"`

## 3. Header Composition

Left to right: `SidebarTrigger` (icon button, toggles collapse/mobile sheet) → `Breadcrumb` (derived from the current route segment — "Dashboard", "Patient", etc.) → spacer → `ThemeToggle` → `NavUser` avatar+dropdown (**desktop/tablet only**, see below)

- Header background: `bg-background`, `border-b border-border`, sticky to top
- Breadcrumb uses Shadcn's `Breadcrumb` primitive as generated (already has correct `aria-label="breadcrumb"` and list semantics) — one segment per route level, current page non-linked

## 4. Responsive Behavior — Where Profile/Settings/Logout Live

- **`md` and up**: `NavUser` (avatar + dropdown) renders in the header, right-aligned. Wrapped in `hidden md:flex`.
- **Below `md`**: the header's `NavUser` is hidden (`md:hidden` applied instead — inverse of the above), and the _same_ `NavUser` component instead renders inside `<SidebarFooter>` in `app-sidebar.tsx`, visible when the mobile sidebar sheet is opened via `SidebarTrigger`.
- This is a CSS-only visibility split (Tailwind breakpoints), not a JS media-query check — avoids any hydration mismatch, and lines up with the same 768px breakpoint Shadcn's sidebar already uses internally for its own mobile/sheet switch.
- Sidebar itself: standard Shadcn responsive behavior — off-canvas sheet on mobile, full sidebar (collapsible to icon-only, your call — see Open Decisions) on desktop.

## 5. Token Usage (no hardcoded values anywhere)

- Sidebar surface: `bg-sidebar text-sidebar-foreground`, `border-sidebar-border`
- Active nav item: `bg-sidebar-accent text-sidebar-accent-foreground`
- Header: `bg-background text-foreground border-border`
- Dropdown menu: Shadcn's `DropdownMenuContent` already themed via `bg-popover text-popover-foreground border-border`
- Logout item: `text-destructive` on hover/focus (needs the `--destructive-foreground` patch flagged in the earlier theme audit if the item gets a filled destructive background rather than just colored text — plain `text-destructive` on the existing `popover` background doesn't need the fix, only a filled treatment would)
- Theme toggle: `bg-muted` track, `bg-background` thumb, `ring-ring` on focus

## 6. Motion — Subtle, Not Decorative

- **Sidebar on load**: nav items fade + slide in slightly (`opacity 0→1`, `x: -8→0`), staggered ~40–50ms apart — quick and understated, finishing well under half a second total. This is the only "on load" animation; nothing loops or repeats.
- **Nav item hover**: background color transition only (`bg-sidebar-accent/50` or similar on hover, full `bg-sidebar-accent` on active) — no movement, no scale.
- **Sidebar collapse/expand**: use Shadcn's built-in width transition, don't add anything extra on top of it.
- **Dropdown open/close**: Radix's built-in animation (already wired into Shadcn's `DropdownMenuContent` via `data-[state=open]`/`data-[state=closed]` classes) — no custom animation needed.
- **Theme toggle**: icon crossfade (sun ↔ moon) over ~150ms, not a spin or bounce.
- Everything respects `prefers-reduced-motion`.

## 7. Accessibility Checklist

- Active sidebar link: `aria-current="page"`
- `SidebarTrigger`: accessible name ("Toggle sidebar"), not icon-only with no label
- `ThemeToggle`: accessible name reflecting the action ("Switch to dark theme" / "Switch to light theme"), not just an icon
- Breadcrumb: Shadcn's primitive already provides correct list/nav semantics — just make sure the current page segment isn't rendered as a link
- Dropdown menu: keyboard operable out of the box via Radix (arrow keys, Esc, Enter) — no extra work needed, just don't override its default handlers
- Focus-visible: already global from your base layer; applies automatically to all of the above since they're native interactive elements
- Sidebar tokens: contrast verified above, no changes needed

## 8. Open Decisions

1. Desktop sidebar collapse behavior: collapse to icon-only rail (`collapsible="icon"`) or fully off-canvas like mobile? Icon-only is more common for a persistent nav with only 5 items.
2. Breadcrumb source: auto-derive labels from the URL path, or set explicitly per page (matters once nested/dynamic routes like `/patient/[id]` show up)?
3. Confirm the icon choices in Section 2, and whether "Patient" should be singular (a single patient's own record) or "Patients" (a list) — affects whether the page needs a list view or a profile view.
4. Logout item styling: plain `text-destructive` text (no fix needed) vs. a filled destructive treatment (needs the `--destructive-foreground` patch from the earlier audit) — your call.

Once these are settled, I'll build `app-sidebar.tsx`, `dashboard-header.tsx`, and the supporting components against this plan.
