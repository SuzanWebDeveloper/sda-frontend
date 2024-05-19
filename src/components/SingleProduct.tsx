import { Link } from "react-router-dom"

import { Product } from "@/types"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props // destructure

  return (
    <article className="product card">
      <img src={product.image} alt={product.name} className="product__img" />
      <div className="product__body">
        <h3> {product.name}</h3>
        <p>
          Price:{" "}
          {product.price.toLocaleString("en-us", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <div>
          <Link to={`/products/${product.slug}`}>
            <button className="btn product__btn">
              Show Details <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </Link>

          <button className="btn product__btn">
            Add To Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  )
}

export default SingleProduct
