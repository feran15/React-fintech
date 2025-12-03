import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
  onClose: () => void;
}

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [pin, setPin] = useState("");

  const handleSetPin = async () => {
    const UserToken = localStorage.getItem("token"); // <- read directly

    if (!UserToken) {
      return alert("User not logged in");
    }

    if (!pin || pin.length !== 4) {
      return alert("Please enter a 4-digit PIN");
    }

    try {
      const res = await fetch("http://localhost:5000/api/Pin/set-pin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UserToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Transaction PIN set successfully ✅");
        onClose();
      } else {
        alert(data.message || "Unable to set PIN ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error setting PIN");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl w-96 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <h2 className="text-lg font-bold text-green-400 mb-4">Set your Transaction PIN</h2>

          <input
            type="password"
            maxLength={4}
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 rounded text-white"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSetPin}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Save PIN
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
