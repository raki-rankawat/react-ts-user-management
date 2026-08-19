export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' // literal unions
}

export interface Product {
  id: number
  name: string
  price: number
  category: 'electronics' | 'furniture' | 'kitchen'
  inStock: boolean
}
