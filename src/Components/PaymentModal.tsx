import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
  onClose: () => void;
  userToken: string; // Pass logged-in user token
  senderId: string; // Logged-in user's ID
}

interface Recipient {
  _id: string;
  name: string;
  accountNumber: string;
}

export default function PaymentModal({ onClose, userToken, senderId }: PaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [transactionPin, setTransactionPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto-fetch recipient info
  useEffect(() => {
    const fetchRecipient = async () => {
      if (accountNumber.length === 10) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`http://localhost:5000/api/User/verify/:accountNumber`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();

          if (data.success) {
            setRecipient(data.data);
          } else {
            setRecipient(null);
            setError(data.message || "Recipient not found");
          }
        } catch (err) {
          setRecipient(null);
          setError("Error fetching recipient");
        } finally {
          setLoading(false);
        }
      } else {
        setRecipient(null);
        setError("");
      }
    };

    fetchRecipient();
  }, [accountNumber, userToken]);

  // ✅ Handle payment submission
  const handlePayment = async () => {
    if (!amount || !accountNumber || !recipient || !transactionPin) {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          senderId,
          receiverId: recipient._id,
          amount,
          transactionPin,
          description: "Transfer",
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Transaction successful ✅");
        onClose();
      } else {
        alert(data.message || "Transaction failed ❌");
      }
    } catch (err) {
      alert("Error processing transaction");
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
          <h2 className="text-lg font-bold text-green-400 mb-4">Send Money</h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 rounded"
          />

          <input
            type="number"
            placeholder="Recipient Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 rounded"
          />

          {loading && <p className="text-sm text-gray-400 mb-2">Looking up recipient...</p>}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {recipient && (
            <input
              type="text"
              value={recipient.name}
              readOnly
              className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            />
          )}

          <input
            type="password"
            placeholder="Transaction PIN"
            value={transactionPin}
            onChange={(e) => setTransactionPin(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 rounded"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
