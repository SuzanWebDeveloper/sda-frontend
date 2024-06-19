import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"

import { toast } from "react-toastify"

import AdminSidebar from "./ui/AdminSidebar"
import useOrdersState from "@/hook/useOrdersState"
import { fetchOrders } from "@/toolkit/slices/orderSlice"

const AdminOrders = () => {
  const { orders, isLoading, error } = useOrdersState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders())
    }
    fetchData()
  }, [])

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}

        <section className="categories">
          <h3>List of Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="category__name">{order.orderId}</td>
                    <td className="category__details">{order.userName}</td>

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
      </div>
    </div>
  )
}

export default AdminOrders
