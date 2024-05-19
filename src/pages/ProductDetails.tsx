import { AppDispatch, RootState } from "@/toolkit/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { fetchProductBySlug } from "@/toolkit/slices/productSlice"

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()

  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  // dispatch an action to dispatch products
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
    }
    fetchData()
  }, [])

  return (
    <article className="details">
      <h2>Product details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}

      {product && (
        <div className="product-details flex-center">
          <div className="product-details__left">
            <img src={product.image} alt={product.name} className="product-details__img" />
          </div>
          <div className="product-details__body product-details__right">
            <h3 className="product-details__name">{product.name}</h3>
            <p className="product-details__description">Description: {product.description}</p>
            <p className="product-details__price">Price: {product.price}</p>
            <p>Product Added: {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </article>
  )
}
