import { RootState } from "@/toolkit/store"
import { useSelector } from "react-redux"

const useOrdersState = () => {
  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.orderR
  )
  return { orders, isLoading, error }
}

export default useOrdersState
