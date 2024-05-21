import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"

import { fetchCategories } from "@/toolkit/slices/categorySlice"
import AdminSidebar from "./ui/AdminSidebar"
import useCategoriesState from "@/hook/useCategoriesState"

const AdminCategories = () => {
  const { categories, isLoading, error } = useCategoriesState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        <h2>List of Categories</h2>
        <section className="categories">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category.categoryId}>
                    <td className="category__name">{category.name}</td>
                    <td className="category__details">
                      {category.description}
                    </td>
                    <td>
                      {/* <button className="btn" onClick={() => handleEdit(category)}>
                        Edit
                      </button>
                      <button className="btn delete-btn" onClick={() => handleDelete(category)}>
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

export default AdminCategories
