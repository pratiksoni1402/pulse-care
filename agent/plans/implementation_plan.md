# Pulse Care: Theme, Typography, and Spacing Implementation Plan

This plan details the setup for a WCAG-compliant, aesthetically pleasing design system tailored for a healthcare application.

## 1. Theme Colors Setup (OKLCH)
A healthcare app requires a color palette that inspires trust, calmness, and professionalism while maintaining high accessibility (WCAG standard contrast). We will use a soft teal/blue palette.

**Proposed Color Palette:**
- **Primary:** Deep reassuring Teal/Blue (`oklch(0.55 0.12 230)`). Calm and trustworthy.
- **Primary-Foreground:** Crisp White (`oklch(0.98 0 0)`). High contrast against primary.
- **Secondary:** Soft grayish-teal (`oklch(0.95 0.02 230)`). For secondary actions and subtle backgrounds.
- **Secondary-Foreground:** Dark contrast (`oklch(0.3 0.05 230)`).
- **Background:** Pure white (`oklch(1 0 0)`) in light mode, deep slate/navy (`oklch(0.18 0.02 230)`) in dark mode to reduce eye strain.
- **Foreground:** Dark slate (`oklch(0.25 0.02 230)`) in light mode, light gray (`oklch(0.95 0 0)`) in dark mode.
- **Destructive:** Soft red (`oklch(0.6 0.15 20)`). Clear but not overly aggressive.

**Action:** Update the `:root` and `.dark` variables in `src/app/globals.css` with these new OKLCH values.

## 2. Theme Toggle (NextThemes + Shadcn Switch)
- **ThemeProvider:** Create `src/components/theme-provider.tsx` wrapping the application layout to enable `next-themes` functionality.
- **ThemeToggle:** Create `src/components/theme-toggle.tsx` utilizing the existing Shadcn `Switch` component (`src/components/ui/switch.tsx`). The switch will toggle between light and dark modes.
- **Visibility:** As requested, the toggle switch will **not** be displayed on the screen right now. We will either leave the component unimported in the main layout or apply a `hidden` class so it is ready for future use.

## 3. Spacing Hierarchy (Multiples of 8)
To maintain consistency and structural rhythm, we will enforce a spacing hierarchy based strictly on multiples of 8px.
We will define custom spacing CSS variables in `globals.css` inside the `@theme` block, which Tailwind v4 will automatically pick up:
- `--spacing-1: 0.5rem` (8px)
- `--spacing-2: 1rem` (16px)
- `--spacing-3: 1.5rem` (24px)
- `--spacing-4: 2rem` (32px)
- `--spacing-5: 2.5rem` (40px)
- `--spacing-6: 3rem` (48px)
- `--spacing-8: 4rem` (64px)
- `--spacing-10: 5rem` (80px)

*(Note: Tailwind's default `p-2` is 8px, `p-4` is 16px, `p-6` is 24px, etc. By redefining them as custom spacing tokens, we enforce a stricter design system).*

## 4. Typography Standards & Hierarchy
We will establish a strict typographic hierarchy for better readability and structure (WCAG compliant). We'll update the `@layer base` in `globals.css` to define styles for native heading tags (`h1`-`h6`) and create corresponding utility classes (e.g., `.h1`, `.h2`) for flexibility.

**Hierarchy Strategy (Base 16px = 1rem):**
- **h1:** `2.5rem` (40px), Line-height: `1.2`, Font-weight: `700` (Bold) - Tighter tracking.
- **h2:** `2rem` (32px), Line-height: `1.2`, Font-weight: `600` (Semibold).
- **h3:** `1.75rem` (28px), Line-height: `1.25`, Font-weight: `600`.
- **h4:** `1.5rem` (24px), Line-height: `1.3`, Font-weight: `600`.
- **h5:** `1.25rem` (20px), Line-height: `1.4`, Font-weight: `500` (Medium).
- **h6:** `1rem` (16px), Line-height: `1.4`, Font-weight: `600`, Uppercase with wider letter-spacing (for small headers/eyebrows).
- **Body:** `1rem` (16px), Line-height: `1.5` (WCAG recommended minimum), Font-weight: `400` (Regular).

## User Review Required
> [!IMPORTANT]
> Please review the proposed OKLCH color values (Teal/Blue theme). Do you approve of this calming color scheme for the Pulse Care app?
> 
> Also, for the **Theme Toggle**, I will create the component but keep it hidden from the UI. Let me know if you want it injected in a specific place (like a hidden settings menu) instead.

## Proposed Changes
### `globals.css`
#### [MODIFY] [globals.css](file:///home/pratik/Projects/Learning/pulse-care/src/app/globals.css)

### Components
#### [NEW] [theme-provider.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/components/theme-provider.tsx)
#### [NEW] [theme-toggle.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/components/theme-toggle.tsx)
#### [MODIFY] [layout.tsx](file:///home/pratik/Projects/Learning/pulse-care/src/app/layout.tsx)

## Verification Plan
1. **Color Contrast:** Verify that the primary/primary-foreground and background/foreground combinations pass WCAG AA standards (contrast ratio >= 4.5:1).
2. **Typography:** Verify native `h1` through `h6` tags render according to the defined hierarchy.
3. **Theme Provider:** Verify the NextThemes provider wraps the app correctly without hydration errors, and the app defaults to system/light mode.
