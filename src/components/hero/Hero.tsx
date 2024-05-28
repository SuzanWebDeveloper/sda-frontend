import React from "react"
import logo from "../../assets/logo.svg"

import "./hero.css"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero__title">Feel fresh with our natural organic products</h1>
          <h2 className="hero__subtitle">
            Explore the high quality body and hair care rose products!
            <br />
            <Link to="product">
              <button className="button" role="button">
                Shop Now
              </button>
            </Link>
          </h2>

          <div>
            {/* <button className="button" role="button">
              Shop Now
            </button> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
