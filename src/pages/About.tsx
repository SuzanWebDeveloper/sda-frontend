import PageTitle from "@/components/PageTitle"

export const About = () => {
  return (
    <div>
      <PageTitle title="About" />
      <main>
        <div className="main-content-text">
          <h2 className="about-title">Why Pink Roses?</h2>
          <p>
            Welcome to Pink Rose, where the magic of locally grown pink roses meets natural beauty
            and wellness. Inspired by the elegance and benefits of pink roses, we create products
            that enhance your skin, body, and hair health.
          </p>
          <br />
          <h2 className="about-title"> Our Story</h2>
          <p>
            At Pink Rose, we aim to offer the finest natural and organic products that promote
            beauty and well-being. We are committed to using high-quality, sustainably sourced
            ingredients, free from harmful chemicals and synthetic additives.
          </p>
          <br />
          <h2 className="about-title">Our Mission</h2>
          <p>
            Pink roses are renowned for their beauty and skin benefits. Rich in vitamins and
            antioxidants, they rejuvenate and hydrate the skin, reduce inflammation, and promote a
            radiant complexion. The calming aroma of pink roses also enhances relaxation and
            self-care.
          </p>
        </div>
      </main>
    </div>
  )
}
