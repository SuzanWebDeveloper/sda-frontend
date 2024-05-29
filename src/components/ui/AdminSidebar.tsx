import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminSidebar = () => {
  //get user data from the store
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <aside className="sidebar-container">
      <div>
        <h3>Dashboard</h3>
      
        <p>Admin: {userData?.name}</p>
        <hr></hr>
        <br />
        {/* <p>{userData?.email}</p> */}
      </div>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
