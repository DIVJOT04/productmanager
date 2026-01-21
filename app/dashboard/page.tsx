'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useProductStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, LogOut } from 'lucide-react'
import ProductForm from '@/components/ProductForm'
import ProductList from '@/components/ProductList'

export default function DashboardPage() {
  const router = useRouter()
  const { user, token, logout } = useAuthStore()
  const { products, fetchProducts, isLoading: productLoading } = useProductStore()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!user || !token) {
      router.push('/login')
      return
    }

    fetchProducts(token)
  }, [user, token, router, fetchProducts])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Product Manager</h1>
            <p className="text-slate-400 mt-1">Welcome, {user.name}!</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600 hover:bg-red-900/20 hover:text-red-400 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Product Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Cancel' : 'New Product'}
          </Button>
        </div>

        {/* Product Form */}
        {showForm && (
          <Card className="mb-8 bg-slate-900/50 border-slate-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
              <ProductForm onSuccess={() => setShowForm(false)} />
            </div>
          </Card>
        )}

        {/* Products List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Products</h2>
          {productLoading && !products.length ? (
            <Card className="bg-slate-900/50 border-slate-700 p-8 text-center">
              <p className="text-slate-400">Loading products...</p>
            </Card>
          ) : products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <Card className="bg-slate-900/50 border-slate-700 p-8 text-center">
              <p className="text-slate-400 mb-4">No products yet. Create your first one!</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Product
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
