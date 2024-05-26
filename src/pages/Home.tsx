import PageTitle from "@/components/PageTitle"
import Products from "@/components/Products"
import Hero from "@/components/hero/Hero"

export const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <Hero />
      <div className="container flex-space-around">
        <div >
          space
          <div className="main-container">
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}
