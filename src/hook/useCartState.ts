import { RootState } from '@/toolkit/store'
import React from 'react'
import { useSelector } from 'react-redux'

const useCartState = () => {
  const {cartItems} = useSelector((state: RootState) => state.cartR)
  return {cartItems}
}

export default useCartState
