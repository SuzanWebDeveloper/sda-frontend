import PageTitle from "@/components/PageTitle"
import Products from "@/components/Products"

export const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <div className="container flex-space-around">
        <div className="sidebar-container">
          side
          <div className="main-container">
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}
