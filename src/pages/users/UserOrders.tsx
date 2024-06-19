import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { toast } from "react-toastify"

import useOrdersState from "@/hook/useOrdersState"
import { fetchUserOrders } from "@/toolkit/slices/orderSlice"
import UserSidebar from "@/components/ui/UserSidebar"

export const UserOrders = () => {
  const { orders, isLoading, error } = useOrdersState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserOrders())
    }
    fetchData()
  }, [])

  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        {orders && orders.length > 0 ? (
          <>
            <section className="categories">
              <h3>List of Orders</h3>
              <table>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="category__name">{order.orderId}</td>

                      <td className="category__details">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="category__details">{order.totalPrice}</td>
                      <td className="category__details">{order.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <p>There is no orders yet</p>
        )}
      </div>
    </div>
  )
}
