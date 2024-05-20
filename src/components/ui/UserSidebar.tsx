import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserSidebar = () => {
  //get user data from the store
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <aside className="sidebar-container">
      <div>
        <h2> User Profile</h2>
        <p>{userData?.name}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
