export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  products: Product[]
  createdAt: string
}

export type Product = {
  productId: string
  name: string
  slug: string
  image: string
  description: string
  color: string
  price: number
  soldQuantity: number
  stock: number
  categories: Category[]
  createdAt: string
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}

export type User = {
  name: string
  email: string
  password: string
  phone: number
  Address?: string
  role?: string
}

export type UserState = {
  //user: User
  error: null | string
  isLoading: boolean
}

export type LoginFormData = {
  email: string
  password: string
}