import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { registerUser } from "@/toolkit/slices/userSlice"
import { AppDispatch } from "@/toolkit/store"
import { RegisterFormData } from "@/types"

export const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))
      toast.success(response.payload.message)
      navigate("/login")
    } catch (error: any) {
      toast.error(error.message || "Registration failed")
    }
  }

  return (
    <div className="register">
      <h2>User Registration</h2>
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
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Phone must be at least 10 numbers" }
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
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
          Register
        </button>
      </form>
    </div>
  )
}
