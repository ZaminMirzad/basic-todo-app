'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with back navigation */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mr-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Back to Tasks</span>
          </Link>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
          </div>
        </div>
        <UserProfile />
      </div>
    </div>
  )
}
