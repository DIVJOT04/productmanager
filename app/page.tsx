'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-4">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Product Manager
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A modern, full-stack application for managing your products efficiently
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push('/register')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg font-medium rounded-lg"
          >
            Create Account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 pt-8 border-t border-slate-700">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Secure Auth</h3>
            <p className="text-slate-400">JWT-based authentication for your data</p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Full Stack</h3>
            <p className="text-slate-400">Modern Next.js frontend with Node.js backend</p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">MongoDB</h3>
            <p className="text-slate-400">Scalable database for your products</p>
          </div>
        </div>
      </div>
    </div>
  )
}
