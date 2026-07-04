'use client'

import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrandPanel } from './brand-panel'
import { AuthFormPanel } from './auth-form-panel'

export type AuthMode = 'login' | 'register' | 'forgot-password'

export function AuthShell() {
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Left — Brand Panel (col-8, hidden below lg) */}
      <div className="xl:col-span-8 lg:col-span-7 hidden lg:flex">
        <BrandPanel />
      </div>

      {/* Right — Form Panel (col-4, full-width below lg) */}
      <div className="xl:col-span-4 lg:col-span-5 col-span-12 bg-background lg:border-l lg:border-border relative">
        {/* Compact logo — mobile only (brand panel is hidden below lg) */}
        <div className="lg:hidden flex justify-center pt-8 pb-2">
          <Link href="/">
            <Image
              src="/assets/logo/logo.webp"
              alt="Pulse Care"
              width={100}
              height={100}
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>

        <div className="xl:px-0 sm:px-6 px-0">
          <AuthFormPanel mode={mode} setMode={setMode} />
        </div>
      </div>
    </div>
  )
}
