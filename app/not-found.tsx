import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-slate-400 text-lg">Page not found</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  )
}
