'use client'

import React from "react"

import { useState } from 'react'
import { useAuthStore, useProductStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ProductFormProps {
  onSuccess?: () => void
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const { token } = useAuthStore()
  const { createProduct, isLoading, error } = useProductStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!name || !price) {
      setLocalError('Name and price are required')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum < 0) {
      setLocalError('Price must be a valid number')
      return
    }

    if (!token) {
      setLocalError('Not authenticated')
      return
    }

    try {
      await createProduct(
        {
          name,
          description,
          price: priceNum,
        },
        token
      )
      setName('')
      setDescription('')
      setPrice('')
      onSuccess?.()
    } catch (err) {
      // Error is handled by the store
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Product Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="e.g., Premium Widget"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Describe your product..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-2">
          Price
        </label>
        <Input
          id="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
          disabled={isLoading}
        />
      </div>

      {(error || localError) && (
        <div className="p-3 bg-red-900/20 border border-red-800 text-red-400 rounded-lg text-sm">
          {error || localError}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  )
}
