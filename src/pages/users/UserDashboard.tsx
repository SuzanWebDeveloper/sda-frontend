import UserSidebar from "@/components/ui/UserSidebar"

import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"

export const UserDashboard = () => {
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <div className="user-container">
      <UserSidebar />
      <div className="xs main-container">Hello {userData?.name}</div>
    </div>
  )
}
