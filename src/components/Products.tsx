import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"

import { fetchProducts } from "@/toolkit/slices/productSlice"
import ProductCard from "./layout/productsCard/ProductCard"
import useProductsState from "@/hook/useProductsState"
import useCategoriesState from "@/hook/useCategoriesState"
import { fetchCategories } from "@/toolkit/slices/categorySlice"

const Products = () => {
  // fetch data and access store for all products
  const { products, isLoading, error, totalPages } = useProductsState()
  const { categories, isLoading: categoryIsLoading } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // dispatch an action to dispatch products
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({ pageNumber, pageSize, searchTerm, sortBy, selectedCategories })
      )
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy, selectedCategories])

    useEffect(() => {
      const fetchData = async () => {
        await dispatch(
          fetchProducts({ pageNumber, pageSize, searchTerm, sortBy })
        )
      }
      fetchData()
    }, [pageNumber, searchTerm, sortBy])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(
  //       fetchProducts({ pageNumber, pageSize, searchTerm, sortBy, selectedCategories })
  //     )
  //   }
  //   fetchData()
  // }, [pageNumber, searchTerm, sortBy, selectedCategories])


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories())
    }
    fetchData()
  }, [])



  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((name) => name !== name)
        : [...prevSelected, name]
    )
  }

console.log(selectedCategories)

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}

      <div className="filter-by-category">
        <p>Filter by Category</p>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <div key={category.categoryId}>
              <label htmlFor="categories">
                <input
                  type="checkbox"
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                {category.name}
              </label>
            </div>
          ))}
      </div>
      <br />
      <h2>List of Products</h2>
      <div className="action flex-space-around">
        <div>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex-center">
          <label htmlFor="sort">Sort By</label>
          <select name="sort" id="sort" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
          </select>
        </div>
      </div>

      {/* <h2>List of Products</h2> */}
      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <ProductCard key={product.productId} product={product} />)}
      </section>

      {products && products.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
