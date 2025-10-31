import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto-fetch recipient name when account number is 10 digits
  useEffect(() => {
    const fetchRecipient = async () => {
      if (accountNumber.length === 10) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`http://localhost:4000/api/users/verify/${accountNumber}`);
          const data = await res.json();

          if (data.success) {
            setRecipientName(data.data.name);
          } else {
            setRecipientName("");
            setError("Recipient not found");
          }
        } catch (err) {
          setRecipientName("");
          setError("Error fetching recipient");
        } finally {
          setLoading(false);
        }
      } else {
        setRecipientName("");
        setError("");
      }
    };

    fetchRecipient();
  }, [accountNumber]);

  // ✅ Handle transaction submission
  const handlePayment = async () => {
    if (!amount || !accountNumber || !recipientName) return alert("Please fill all fields");

    try {
      const response = await fetch("http://localhost:4000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: "yourSenderIdHere", // replace with logged-in user's ID
          receiverId: "fetchedUserIdHere", // ideally store this from backend lookup
          amount,
          description: "Transfer",
        }),
      });

      const data = await response.json();
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

             <input
            type="text"
            value={accountNumber}
            className="w-full p-2 mb-3 bg-gray-800 rounded"
            disabled
          />

          {loading ? (
            <p className="text-sm text-gray-400 mb-2">Looking up recipient...</p>
          ) : recipientName ? (
            <input
              type="text"
              value={recipientName}
              readOnly
              className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            />
          ) : error ? (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          ) : null}

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
