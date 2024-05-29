import React from "react"
import logo from "../../assets/logo.svg"

import "./hero.css"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <p className="hero__title">Radiant Beauty Unlocked with Pink Roses</p>
          <p className="hero__subtitle">
            Explore our high quality skin, body and hair care rose products!
            <br />
            <Link to="products">
              <button className="button" role="button">
                Shop Now
              </button>
            </Link>
          </p>

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
