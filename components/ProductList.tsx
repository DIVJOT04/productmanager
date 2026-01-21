'use client'

import { useState } from 'react'
import { useAuthStore, useProductStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import ProductModal from '@/components/ProductModal'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  createdAt: string
}

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  const { token } = useAuthStore()
  const { deleteProduct, isLoading } = useProductStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    if (!token) return

    try {
      await deleteProduct(id, token)
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={(product._id as any)?.toString()}
            className="bg-slate-900/50 border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-blue-400">
                  ${Number(product.price).toFixed(2)}
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(product)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                  disabled={isLoading}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete((product._id as any)?.toString())}
                  variant="outline"
                  className="flex-1 border-red-900 text-red-400 hover:bg-red-900/20"
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </>
  )
}
