import { useAuth } from "../context/AuthContext";
import apiService from "../utils/api";

const Payment = () => {
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      const res = await apiService.post("/payment/pay", {
        email: user?.email,
        amount: 5000, // ₦5000
      });

      const { authorization_url } = res.data.data;
      window.location.href = authorization_url; // redirect to Paystack checkout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handlePayment} className="px-4 py-2 bg-green-600 text-white rounded">
      Pay ₦5000
    </button>
  );
};

export default Payment;
