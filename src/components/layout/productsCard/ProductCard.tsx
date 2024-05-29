import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { Product } from "@/types"
import { AppDispatch } from "@/toolkit/store"
import { useDispatch } from "react-redux"
import { addToCart } from "@/toolkit/slices/cartSlice"

const ProductCard = (props: { product: Product }) => {
  const { product } = props // destructure
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) => {
    try {
      dispatch(addToCart(product))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <article className="product card">
        <Link to={`/products/${product.slug}`} className="card-link">
          <img src={product.image} alt={product.name} className="product__img" />
        </Link>
        <div className="product__body">
          <h4> {product.name}</h4>
          <p>
            Price:{" "}
            {product.price.toLocaleString("en-us", {
              style: "currency",
              currency: "USD"
            })}
          </p>
          <div>
            <button className="btn product__btn" onClick={() => handleAddToCart(product)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp;Add to cart
            </button>
          </div>
        </div>
      </article>
    </>
  )
}

export default ProductCard
