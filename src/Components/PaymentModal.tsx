import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Recipient {
  _id: string;
  name: string;
  accountNumber: string;
}

interface PaymentModalProps {
  onClose: () => void;
}

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // Fixed: removed stray 'a'
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [transactionPin, setTransactionPin] = useState("");
  const [loadingRecipient, setLoadingRecipient] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState("");

  // Debounced API call for recipient lookup
  useEffect(() => {
    const fetchRecipient = async () => {
      const token = localStorage.getItem("token");
      
      // Validate account number length
      if (!token || accountNumber.length !== 10) {
        setRecipient(null);
        setError(accountNumber.length > 0 && accountNumber.length !== 10 ? "Account number must be 10 digits" : "");
        return;
      }

      setLoadingRecipient(true);
      setError("");

      try {
        const res = await fetch(
          `http://localhost:5000/api/User/verify/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setRecipient(data.data);
        } else {
          setRecipient(null);
          setError(data.message || "Recipient not found");
        }
      } catch (err) {
        setRecipient(null);
        setError("Error fetching recipient. Please try again.");
        console.error("Error fetching recipient:", err);
      } finally {
        setLoadingRecipient(false);
      }
    };

    // Add debounce to prevent excessive API calls
    const timer = setTimeout(() => {
      if (accountNumber.length === 10) {
        fetchRecipient();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [accountNumber]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    
    if (!accountNumber || accountNumber.length !== 10) {
      alert("Enter a valid account number");
      return;
    }
    
    if (!recipient) {
      alert("Recipient not found");
      return;
    }
    
    if (!transactionPin || transactionPin.length !== 4 || !/^\d{4}$/.test(transactionPin)) {
      alert("Enter a valid 4-digit PIN");
      return;
    }

    setLoadingPayment(true);

    try {
      const res = await fetch("http://localhost:5000/api/transactions/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: recipient._id,
          amount: parseFloat(amount),
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
      console.error("Transaction error:", err);
      alert("Error processing transaction");
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl w-96 shadow-lg border border-gray-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-green-400">Send Money</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-lg"
              disabled={loadingPayment}
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
                step="0.01"
                disabled={loadingPayment}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Recipient Account Number
              </label>
              <input
                type="text"
                placeholder="10-digit account number"
                value={accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setAccountNumber(value);
                }}
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loadingPayment}
              />
            </div>

            {loadingRecipient && (
              <p className="text-sm text-blue-400 flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></span>
                Looking up recipient...
              </p>
            )}
            
            {error && (
              <p className="text-red-500 text-sm bg-red-500/10 p-2 rounded">
                {error}
              </p>
            )}

            {recipient && (
              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">Recipient</p>
                <p className="text-white font-medium">{recipient.name}</p>
                <p className="text-gray-400 text-sm">Account: {recipient.accountNumber}</p>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Transaction PIN
              </label>
              <input
                type="password"
                placeholder="••••"
                value={transactionPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setTransactionPin(value);
                }}
                className="w-full p-3 bg-gray-800 rounded-lg text-white text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={loadingPayment}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
              disabled={loadingPayment}
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingPayment || !recipient}
            >
              {loadingPayment ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Processing...
                </span>
              ) : (
                "Send Payment"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}