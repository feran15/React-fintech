import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Components/ui/dailog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

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
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [savingPin, setSavingPin] = useState(false);

  const { Register } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await Register(data);
      toast.success("Registration successful!");
      setShowPinModal(true); // ✅ open modal after registration
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handlePinSubmit = async () => {
    if (!/^\d{4}$/.test(pin)) {
      toast.error("PIN must be exactly 4 digits");
      return;
    }

    if (pin !== confirmPin) {
      toast.error("PINs do not match");
      return;
    }

    try {
      setSavingPin(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/set-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) throw new Error("Failed to set PIN");

      toast.success("Transaction PIN created successfully!");
      setShowPinModal(false);
    } catch (err) {
      toast.error("Error saving PIN");
    } finally {
      setSavingPin(false);
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-teal-500"
            >
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

      {/* 🔹 Transaction PIN Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="sm:max-w-sm bg-[rgb(27,27,27)] border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-teal-400 text-center">
              Create Transaction PIN
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-400 text-sm text-center mb-4">
            Please create and confirm your 4-digit transaction PIN.
          </p>

          <Input
            type="password"
            maxLength={4}
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="text-center tracking-widest text-white bg-transparent border border-gray-600 mb-2"
          />

          <Input
            type="password"
            maxLength={4}
            placeholder="Confirm 4-digit PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="text-center tracking-widest text-white bg-transparent border border-gray-600"
          />

          <Button
            onClick={handlePinSubmit}
            disabled={savingPin}
            className="mt-4 w-full bg-teal-600 hover:bg-teal-700"
          >
            {savingPin ? <Loader2 className="animate-spin" size={18} /> : "Save PIN"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
