import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { SubmitHandler, useForm } from "react-hook-form"

import { createCategory, deleteCategory, fetchCategories } from "@/toolkit/slices/categorySlice"
import AdminSidebar from "./ui/AdminSidebar"
import useCategoriesState from "@/hook/useCategoriesState"
import { CreateCategoryFormData } from "@/types"
import { toast } from "react-toastify"

const AdminCategories = () => {
  const { categories, isLoading, error } = useCategoriesState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = async (id: string) => {
    try {
      //  const response = await dispatch(deleteCategory(id))
      //  console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    // if (!userData?.userId) {
    //   toast.error("user data is not available")
    //   return
    // }
    try {
       const response = await dispatch(createCategory(data))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        <h2>List of Categories</h2>
        <br />
        <div>
          <h3>Create category</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <br /> {/*  remove br later */}
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 5, message: "description is too shot" }
                })}
              ></textarea>
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <button className="btn" type="submit">
              Create Category
            </button>
          </form>
        </div>
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
                    <td className="category__details">{category.description}</td>
                    <td>
                      <button className="btn" onClick={() => handleEdit(category.categoryId)}>
                        Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDelete(category.categoryId)}
                      >
                        Delete
                      </button>
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
