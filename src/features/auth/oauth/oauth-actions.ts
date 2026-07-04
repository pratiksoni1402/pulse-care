import { authClient } from '@/lib/auth-client'

/**
 * Swappable OAuth sign-in handler using Better Auth.
 * Can be easily swapped or extended for other providers.
 */
export async function signInWithGoogle(callbackURL: string = '/') {
  try {
    const { data, error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL,
    })

    if (error) {
      return {
        success: false,
        error: error.message || 'Failed to sign in with Google',
      }
    }

    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during Google sign in',
    }
  }
}
