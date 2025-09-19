import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Type for form data
type AuthFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  switchToLogin: () => void;
}

const Register: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Submit handler
  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/User/register",
        data
      );

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Optionally save user info
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      toast.success("Registration successful!");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center ">
      <div className="bg-[rgb(27,27,27)] p-8 rounded-lg shadow-lg border w-full max-w-md ">
        <Link to="/">
          <img className="w-[100px] ms-35 " src="/Bg.png" alt="logo" />
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-2 border rounded placeholder-white "
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-2 border rounded placeholder-white"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded placeholder-white"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border rounded placeholder-white"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-sm text-teal-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 font-semibold py-2 rounded hover:bg-teal-700 cursor-pointer transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-teal-600 font-semibold hover:cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
