import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserSidebar = () => {
  //get user data from the store
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <aside className="sidebar-container">
      <div>
        <h3> My Profile</h3>
        <p>{userData?.name}</p>
        <hr/>
        <br/>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        {/* <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li> */}
      </ul>
    </aside>
  )
}

export default UserSidebar
