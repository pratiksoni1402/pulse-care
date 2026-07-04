import * as React from "react"

interface AuthDividerProps {
  label?: string
}

export function AuthDivider({ label = "or continue with email" }: AuthDividerProps) {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-3 caption font-medium">{label}</span>
      </div>
    </div>
  )
}
