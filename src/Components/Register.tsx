// Register.tsx
import { useForm, } from "react-hook-form";
import  type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface RegisterProps {
  switchToLogin: () => void;
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin, onSuccess }) => {
  const { register: formRegister, handleSubmit, formState } = useForm<RegisterFormData>();
  const { errors, isSubmitting } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const { Register } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await Register(data);
      toast.success("Registration successful!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-[rgb(27,27,27)] p-8 rounded-lg shadow-lg border w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...formRegister("firstName", { required: "First name required" })}
            placeholder="First Name"
            className="w-full p-2 border rounded placeholder-white bg-transparent text-white"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

          <input
            type="text"
            {...formRegister("lastName", { required: "Last name required" })}
            placeholder="Last Name"
            className="w-full p-2 border rounded placeholder-white bg-transparent text-white"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

          <input
            type="email"
            {...formRegister("email", { required: "Email required" })}
            placeholder="Email"
            className="w-full p-2 border rounded placeholder-white bg-transparent text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <div className="flex items-center border rounded">
            <input
              type={showPassword ? "text" : "password"}
              {...formRegister("password", { required: "Password required" })}
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
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <button onClick={switchToLogin} className="text-teal-600 font-semibold">
            Already have an account? Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
