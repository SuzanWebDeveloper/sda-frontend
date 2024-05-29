import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/toolkit/store"
import { toast } from "react-toastify"

import UserSidebar from "@/components/ui/UserSidebar"
import useUsersState from "@/hook/useUsersState"
import { UpdateProfileFormData } from "@/types"
import { updateUser } from "@/toolkit/slices/userSlice"

export const UserProfile = () => {
  const { userData } = useUsersState()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    if (!userData?.userId) {
      toast.error("user data is not available")
      return
    }
    try {
       await dispatch(updateUser({ updateUserData: data, userId: userData.userId }))
       reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="user-container">
      <UserSidebar />
      <div className="main-container">
        {userData && (
          <>
            <h2> Name: {userData.name}</h2>
            <p> Email: {userData.email}</p>
            <p> Address: {userData.address}</p>
            <p> Phone: {userData.phone}</p>
            <button
              className="btn"
              onClick={() => {
                setIsFormOpen(!isFormOpen)
              }}
            >
              {isFormOpen ? "Close edit" : "Edit"}
            </button>

            {isFormOpen && (
              <form onSubmit={handleSubmit(onSubmit)} className="create-form">
                <div className="form-field">
                  <br/>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                {/* 
                <div className="form-field">
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" {...register("phone")} />
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div> */}

                <div className="form-field textarea">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    id=""
                    {...register("address", {
                      minLength: { value: 10, message: "Address is too shot" }
                    })}
                  ></textarea>
                  {errors.address && <p>{errors.address.message}</p>}
                </div>
                <button className="btn" type="submit">
                  Save
                </button>
              
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
