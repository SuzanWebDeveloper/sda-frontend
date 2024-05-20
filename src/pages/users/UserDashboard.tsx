import UserSidebar from "@/components/ui/UserSidebar"

export const UserDashboard = () => {
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">main content here</div>
    </div>
  )
}
