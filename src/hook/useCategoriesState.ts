import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"

const useCategoriesState = () => {
  const { categories, isLoading, error, category } = useSelector(
    (state: RootState) => state.categoryR
  )
  return { categories, isLoading, error, category }
}

export default useCategoriesState
