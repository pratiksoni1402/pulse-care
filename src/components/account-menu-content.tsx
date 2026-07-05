'use client'

import Link from 'next/link'
import { LogOutIcon, UserIcon, SettingsIcon } from 'lucide-react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function AccountMenuContent() {
  const handleLogout = async () => {
    try {
      await authClient.signOut()
      if (typeof window !== 'undefined') {
        window.location.href = '/auth'
      }
    } catch (error) {
      toast.error('Failed to sign out. Please try again.')
    }
  }

  return (
    <DropdownMenuContent
      className="w-56"
      align="end"
      sideOffset={8}
    >
      <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
        My Account
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/profile" className="cursor-pointer">
          <UserIcon className="mr-2 size-4" />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/settings" className="cursor-pointer">
          <SettingsIcon className="mr-2 size-4" />
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={handleLogout}
        className="text-destructive focus:text-destructive cursor-pointer"
      >
        <LogOutIcon className="mr-2 size-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
