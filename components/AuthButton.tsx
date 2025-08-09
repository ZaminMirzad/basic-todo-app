'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function AuthButton({ showSignUp = true }: { showSignUp?: boolean }) {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          href="/sign-in" 
          className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Sign In
        </Link>
        {showSignUp && (
          <Link 
            href="/sign-up" 
            className="px-6 py-3 text-base font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors dark:bg-transparent dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-900/20"
          >
            Sign Up
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link 
        href="/profile" 
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        Profile
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
