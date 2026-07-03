'use client'

import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'

/**
 * ThemeToggle — Shadcn Switch wired to next-themes.
 *
 * Not rendered anywhere in the UI yet.
 * Import and place this wherever a theme toggle control is needed.
 *
 * Usage:
 *   import { ThemeToggle } from '@/components/theme-toggle'
 *   <ThemeToggle />
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Switch
      id="theme-toggle"
      aria-label="Toggle dark mode"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  )
}
