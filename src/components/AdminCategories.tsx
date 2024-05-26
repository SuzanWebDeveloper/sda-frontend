import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from "@/toolkit/slices/categorySlice"
import AdminSidebar from "./ui/AdminSidebar"
import useCategoriesState from "@/hook/useCategoriesState"
import { Category, CreateCategoryFormData } from "@/types"

const AdminCategories = () => {
  const { categories, isLoading, error } = useCategoriesState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  const [isEdit, setIsEdit] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

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
  const handleEdit = async (categoryId: string, category: Category) => {
    try {
      setIsEdit(true)
      setSelectedCategoryId(categoryId)
      setValue("name", category.name)
      setValue("description", category.description)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    setIsEdit(false)
    reset()
  }

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data, categoryId) => {
    try {
      if (isEdit) {
        console.log(categoryId)
        await dispatch(updateCategory({ updateCategoryData: data, categoryId: selectedCategoryId }))
        setIsEdit(false)
      } else {
        const response = await dispatch(createCategory(data))
        console.log(response)
      }
      reset()
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

        <div className="category-form-container">
          <h3> {isEdit ? "Edit Category" : "Create category"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <br /> {/*  remove br later */}
              <label htmlFor="description">Description</label>
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
              {isEdit ? "Edit Category" : "Create category"}
            </button>
            {isEdit && (
              <button className="btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </form>
        </div>

        <section className="categories">
          <h3>List of Categories</h3>
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
                      <button
                        className="btn"
                        onClick={() => handleEdit(category.categoryId, category)}
                      >
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
