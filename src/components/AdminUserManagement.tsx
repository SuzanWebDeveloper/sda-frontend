import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { toast } from "react-toastify"

import AdminSidebar from "./ui/AdminSidebar"
import useUsersState from "@/hook/useUsersState"
import { deleteUser, fetchUsers } from "@/toolkit/slices/userSlice"

const AdminUserManagement = () => {
  const { users, totalPages, isLoading, error } = useUsersState()
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize }))
    }
    fetchData()
  }, [pageNumber])

  const handleDelete = async (id: string | undefined) => {
    try {
       const response = await dispatch(deleteUser(id))
       console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        <h3>List of Users</h3>
        <section className="categories">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(user.userId)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        {/* need to add pagination later */}
      </div>
    </div>
  )
}

export default AdminUserManagement
