import React from "react"
import logo from "../../assets/logo.svg"

import "./hero.css"

const Hero = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero__title">Feel fresh with our natural organic products</h1>
          <h2 className="hero__subtitle">
            Explore the high quality body and hair care rose products!
            <br />
            <button className="button" role="button">
              Shop Now
            </button>
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
