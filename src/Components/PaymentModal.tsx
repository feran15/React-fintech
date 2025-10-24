// components/PaymentModal.tsx
import { useState } from "react";

export default function PaymentModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [provider, setProvider] = useState("paystack");

  const handlePayment = async () => {
    const response = await fetch("http://localhost:4000/api/payments/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, amount, accountNumber }),
    });

    const data = await response.json();
    if (provider === "paystack") {  
      window.location.href = data.authorization_url; // redirect to Paystack
    } else if (provider === "flutterwave") {
      window.location.href = data.link; // redirect to Flutterwave checkout
    } else if (provider === "Monnify") {
      window.location.href = data.paymentUrl; // redirect to Monnify
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-2xl w-96">
        <h2 className="text-lg font-bold text-green-400 mb-4">Make Payment</h2>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 rounded"
        />

        <input
          type="number"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setaccountNumber(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 rounded"
        />

        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-800 rounded"
        >
          <option value="paystack">Paystack</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="Monnify">Monnify</option>
        </select>

        <div className="flex justify-between">
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
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
