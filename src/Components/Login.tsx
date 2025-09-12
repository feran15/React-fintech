import { useForm} from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Type for form data
type AuthFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  switchToSignup: () => void;
}

const Login: React.FC<LoginFormProps> = ({ switchToSignup }) => {
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
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Optionally save user info
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      toast.success("Login successful!");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-[rgb(27,27,27)]  p-8 rounded-lg shadow-lg border w-full max-w-md">
      <img className="w-[100px] ms-35 " src="/Bg.png" alt="" />

        <form onSubmit={handleSubmit(onSubmit)}>
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 font-semibold  py-2 rounded hover:bg-teal-700 cursor-pointer transition"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <button
            type="button"
            onClick={switchToSignup}
            className="text-teal-600 font-semibold leading-relaxed hover:cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
