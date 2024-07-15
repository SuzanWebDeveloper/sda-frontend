import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { fetchCategories } from "@/toolkit/slices/categorySlice"
import AdminSidebar from "./ui/AdminSidebar"
import useCategoriesState from "@/hook/useCategoriesState"
import { CreateProductFormData, Product } from "@/types"
import useProductsState from "@/hook/useProductsState"
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from "@/toolkit/slices/productSlice"
import { uploadImageToCloudinary } from "@/utils/cloudinary"

const AdminProductsManagement = () => {
  const { categories, isLoading: categoryIsLoading, error } = useCategoriesState()
  const { products, isLoading } = useProductsState()

  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10) // change it later
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [filteringTerm, setFilteringTerm] = useState("")

  const [isEdit, setIsEdit] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  const [selectedProductId, setSelectedProductId] = useState("")
  const [selectedCategoyId, setSelectedCategoryId] = useState("")

  const watchedCategoryId = watch("categoryId")
  useEffect(() => {
    console.log("Selected category: ", watchedCategoryId)
    setSelectedCategoryId(watchedCategoryId)
  }, [watchedCategoryId])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchTerm, sortBy, filteringTerm }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteProduct(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = async (product: Product) => {
    try {
      setIsEdit(true)
      console.log(isEdit)
      setSelectedProductId(product.productId)
      setValue("name", product.name)
      setValue("description", product.description)
      setValue("price", product.price)
      setValue("stock", product.stock) // quantity
      setImagePreview(product.image)
      setValue("categoryId", product.category.categoryId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const handleCancel = () => {
    setIsEdit(false)
    reset()
  }

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data, productId) => {
    try {
      //edit product
      let imageUrl = ""
      if (isEdit) {
        if (data.image && data.image.length > 0) {
          const file = data.image[0]
          imageUrl = await uploadImageToCloudinary(file)
        }
        const updateProductData = {
          ...data,
          image: imageUrl,
          categoryId: selectedCategoyId
        }
        await dispatch(
          updateProduct({ updateProductData: updateProductData, productId: selectedProductId })
        )
        setIsEdit(false)
      }
      //create product
      else {
        if (data.image && data.image.length > 0) {
          const file = data.image[0]
          imageUrl = await uploadImageToCloudinary(file)
        }
        const productData = {
          ...data,
          image: imageUrl
        }
        const response = await dispatch(createProduct(productData))
      }
      reset()
      setImagePreview(null)
    } catch (error) {
      console.log(error)
    }
  }

  //------------
  const getCategoryName = (id: string) => {
    const foundCategory = categories.find((category) => category.categoryId === id)
    if (foundCategory) return foundCategory.name
  }

  //----------

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && categoryIsLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        <div className="product-form-container">
          <h3> {isEdit ? "Edit product" : "Add product"}</h3>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 5, message: "description is too shot" }
                })}
              ></textarea>
              {errors.description && <p>{errors.description.message}</p>}
              <div className="form-field">
                <label htmlFor="price">price</label>
                <input
                  className="form-filed__short"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required"
                  })}
                />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
              <label htmlFor="stock">stock</label>
              <input
                className="form-filed__short"
                type="number"
                {...register("stock", {
                  required: "Stock is required"
                })}
              />
              {errors.stock && <p>{errors.stock.message}</p>}
            </div>
            <label htmlFor="categoryId">Categories:</label>
            <Controller
              name="categoryId"
              control={control}
              // rules={{
              //   required: "Category is required"
              // }}
              // onChange={(e) => field.onChange(e.target.options)}
              render={({ field }) => (
                <select {...field}>
                  {categories?.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />

            <div className="form-field">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
              />
              {imagePreview && <img src={imagePreview} alt="image preview" className="table-img" />}
            </div>
            <div className="control-btn">
              <button className="btn" type="submit">
                {isEdit ? "Edit Product" : "Add Product"}
              </button>
              {isEdit && (
                <button className="btn" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        {/* List Products start here */}
        <section>
          <h3>List of Products</h3>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Sold</th>
                <th>Quantity</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <tr key={product.productId}>
                    <td>
                      <img src={product.image} alt={product.slug} className="table-img" />
                    </td>
                    <td>{product.name}</td>
                    <td>{getCategoryName(product.categoryId)}</td>
                    {/* <td>{product.description.substring(0, 100)}...</td> */}
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.soldQuantity}</td>
                    <td>{product.stock}</td>
                    <td>{product.createdAt}</td>
                    <td className="edit-delete-icon">
                      <button className="edit-btn" onClick={() => handleEdit(product)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.productId)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
      {/* do pagination */}
    </div>
  )
}

export default AdminProductsManagement
