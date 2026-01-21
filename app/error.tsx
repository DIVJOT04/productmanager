'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Something went wrong!</h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
