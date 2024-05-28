import { toast } from "react-toastify"
import { AppDispatch } from "@/toolkit/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "@/toolkit/slices/userSlice"
import { LoginFormData } from "@/types"

export const Login = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      const role = response.payload.data.user.role
      // toast.success(response.payload.message)
       navigate(role == "admin" ? "/dashboard/admin" : "/dashboard/user")
    } catch (error: any) {
      toast.error("User name or password is wrong")
    }
  }

  return (
    <div className="login-register">
      <div className="login-register-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-register-fields">
          <div className="form-field">
            <input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" }
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-field">
            <input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <div className="login-register__register">
          Don&apos;t have an account?
          <Link className="nav__link" to="/register">
            <span>Register here</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
