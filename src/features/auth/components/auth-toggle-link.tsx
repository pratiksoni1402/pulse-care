import * as React from 'react'

interface AuthToggleLinkProps {
  prompt?: string
  action: string
  onClick: () => void
}

export function AuthToggleLink({ prompt, action, onClick }: AuthToggleLinkProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt && <>{prompt}{' '}</>}
      <button
        type="button"
        onClick={onClick}
        className="font-semibold text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      >
        {action}
      </button>
    </p>
  )
}
