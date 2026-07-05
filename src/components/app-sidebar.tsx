import Image from 'next/image'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Image
            src="/assets/logo/logo.webp"
            alt="Pulse Care"
            width={100}
            height={100}
            priority
            className="size-7 shrink-0"
          />
          <span className="font-heading font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden">
            Pulse Care
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Navigation */}
      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarSeparator />

      {/* User menu — mobile only (CSS visibility, no JS media query) */}
      <SidebarFooter className="md:hidden">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
