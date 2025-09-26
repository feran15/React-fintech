// Login.tsx
import { useForm,  } from "react-hook-form";
import  type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type AuthFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  switchToSignup: () => void;
  onSuccess?: () => void;
}

const Login: React.FC<LoginFormProps> = ({ switchToSignup, onSuccess }) => {
  const { register: formRegister, handleSubmit, formState } = useForm<AuthFormData>();
  const { errors, isSubmitting } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-[rgb(27,27,27)] p-8 rounded-lg shadow-lg border w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            {...formRegister("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            placeholder="Email"
            className="w-full p-2 border rounded placeholder-white bg-transparent text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <div className="flex items-center border rounded">
            <input
              type={showPassword ? "text" : "password"}
              {...formRegister("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full p-2 placeholder-white bg-transparent text-white"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-teal-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 py-2 rounded hover:bg-teal-700 flex justify-center items-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <button onClick={switchToSignup} className="text-teal-600 font-semibold">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
