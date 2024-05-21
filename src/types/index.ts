export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  products: Product[]
  createdAt: string
}

export type CategoryState = {
  categories: Category[]
  //totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}

export type Product = {
  productId: string
  name: string
  slug: string
  image: string
  description: string
  //color: string
  price: number
  soldQuantity: number
  stock: number
  // categories: Category[]
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
  userId?: string
  name: string
  email: string
  password: string
  phone: number
  address?: string
  role?: string
}

export type UserState = {
  token: null | string
  userData: null | User
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  token: string
  userData: null | User
  isLoggedIn: boolean
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
  phone: number
  address: string
}

export type UpdateProfileFormData = {
  name: string
  phone: number
  address: string
}
