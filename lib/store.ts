import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || 'Login failed')
          }

          const data = await response.json()
          set({ user: data.user, token: data.token, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          })
          throw error
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          })

          if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || 'Registration failed')
          }

          const data = await response.json()
          set({ user: data.user, token: data.token, isLoading: false })
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null })
      },

      setUser: (user: User | null) => {
        set({ user })
      },

      setToken: (token: string | null) => {
        set({ token })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)

interface ProductStore {
  products: any[]
  isLoading: boolean
  error: string | null
  fetchProducts: (token: string) => Promise<void>
  createProduct: (
    product: { name: string; description: string; price: number },
    token: string
  ) => Promise<void>
  updateProduct: (
    id: string,
    product: { name: string; description: string; price: number },
    token: string
  ) => Promise<void>
  deleteProduct: (id: string, token: string) => Promise<void>
  clearError: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (token: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      set({ products: data, isLoading: false })
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
        isLoading: false,
      })
    }
  },

  createProduct: async (
    product: { name: string; description: string; price: number },
    token: string
  ) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create product')
      }

      const newProduct = await response.json()
      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
      }))
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to create product',
        isLoading: false,
      })
      throw error
    }
  },

  updateProduct: async (
    id: string,
    product: { name: string; description: string; price: number },
    token: string
  ) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update product')
      }

      const updatedProduct = await response.json()
      set((state) => ({
        products: state.products.map((p) =>
          (p._id as any)?.toString() === id ? updatedProduct : p
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to update product',
        isLoading: false,
      })
      throw error
    }
  },

  deleteProduct: async (id: string, token: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      set((state) => ({
        products: state.products.filter(
          (p) => (p._id as any)?.toString() !== id
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to delete product',
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
