import AdminSidebar from "@/components/ui/AdminSidebar"
import React from "react"

export const AdminDashboard = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">admin main content here</div>
    </div>
  )
}
