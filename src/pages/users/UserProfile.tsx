import UserSidebar from "@/components/ui/UserSidebar"

export const UserProfile = () => {
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">User info here</div>
    </div>
  )
}
