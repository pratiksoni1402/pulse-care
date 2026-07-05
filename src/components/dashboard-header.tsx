'use client'

import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { ThemeToggle } from '@/components/theme-toggle'
import { NavUser } from '@/components/nav-user'

// Auto-derive breadcrumb label from the current route segment
const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  patient: 'Patient',
  appointments: 'Appointments',
  medications: 'Medications',
  reports: 'Reports',
  profile: 'Profile',
  settings: 'Settings',
}

export function DashboardHeader() {
  const pathname = usePathname()

  // Get the first meaningful segment after the root
  const segments = pathname.split('/').filter(Boolean)
  const currentSegment = segments[0] || 'dashboard'
  const pageLabel = routeLabels[currentSegment] || currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 sticky top-0 z-10">
      {/* Left side: sidebar trigger + breadcrumb */}
      <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side: theme toggle + user menu (desktop only) */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden md:flex">
          <NavUser className="px-3" />
        </div>
      </div>
    </header>
  )
}
