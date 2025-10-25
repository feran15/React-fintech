import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

interface TransactionPinModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionPinModal: React.FC<TransactionPinModalProps> = ({ open, onClose }) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [savingPin, setSavingPin] = useState(false);

  if (!open) return null; // 👈 Don't render anything if closed

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
      onClose();
    } catch (err) {
      toast.error("Error saving PIN");
    } finally {
      setSavingPin(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-[rgb(27,27,27)] p-6 rounded-lg border border-gray-700 shadow-xl w-full max-w-sm text-white">
        <h2 className="text-teal-400 text-center text-lg font-semibold mb-3">
          Create Transaction PIN
        </h2>

        <p className="text-gray-400 text-sm text-center mb-4">
          Please create and confirm your 4-digit transaction PIN.
        </p>

        <input
          type="password"
          maxLength={4}
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full text-center tracking-widest text-white bg-transparent border border-gray-600 rounded p-2 mb-2"
        />

        <input
          type="password"
          maxLength={4}
          placeholder="Confirm 4-digit PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="w-full text-center tracking-widest text-white bg-transparent border border-gray-600 rounded p-2"
        />

        <button
          onClick={handlePinSubmit}
          disabled={savingPin}
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 py-2 rounded flex justify-center items-center"
        >
          {savingPin ? <Loader2 className="animate-spin" size={18} /> : "Save PIN"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-gray-400 text-sm hover:text-white text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TransactionPinModal;
