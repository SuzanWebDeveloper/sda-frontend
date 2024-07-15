import { AppDispatch, RootState } from "@/toolkit/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { fetchProductBySlug } from "@/toolkit/slices/productSlice"
import useProductsState from "@/hook/useProductsState"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { addToCart } from "@/toolkit/slices/cartSlice"
import { Product } from "@/types"

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, error } = useProductsState()

  const dispatch: AppDispatch = useDispatch()

  // dispatch an action to dispatch products
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
    }
    fetchData()
  }, [])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <article className="details">
      <h2></h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}

      {product && (
        <div className="product-details ">
          <div className="product-details__left">
            <img src={product.image} alt={product.name} className="product-details__img" />
          </div>
          <div className="product-details__body product-details__right">
            <h2 className="product-details__name">{product.name}</h2>
            <p className="product-details__description">{product.description}</p>
            <p className="product-details__price">
              {" "}
              {product.price.toLocaleString("en-us", {
                style: "currency",
                currency: "SAR"
              })}
            </p>
            <p
              className="product-details__date"
            >
              Product Added: {new Date(product.createdAt).toLocaleDateString()}
            </p>

            <button className="btn product__btn" onClick={() => handleAddToCart(product)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Add To Cart
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
