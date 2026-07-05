'use client'

import { ChevronsUpDownIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AccountMenuContent } from './account-menu-content'
import { Button } from '@/components/ui/button'

interface NavUserProps {
  className?: string
}

export function NavUser({ className }: NavUserProps) {
  // TODO: Replace with real user data from auth session
  const user = {
    name: 'Pratik Soni',
    email: 'pratik@pulsecare.com',
    avatar: '',
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-2 px-2 py-1.5 h-auto ${className || ''}`}
        >
          <Avatar className="size-7 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg text-xs font-medium bg-sidebar-primary text-sidebar-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left text-sm leading-tight">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <AccountMenuContent />
    </DropdownMenu>
  )
}
