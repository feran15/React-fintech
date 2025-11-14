import React, { useState } from "react";

interface PinInputProps {
  onSubmit: (pin: string) => void;
  loading?: boolean;
}

const PinInput: React.FC<PinInputProps> = ({ onSubmit, loading }) => {
  const [pin, setPin] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 4) setPin(value);
  };

  const handleSubmit = () => {
    if (pin.length !== 4) {
      alert("PIN must be exactly 4 digits");
      return;
    }
    onSubmit(pin);
  };

  return (
    <div>
      <input
        type="password"
        maxLength={4}
        value={pin}
        onChange={handleChange}
        placeholder="Enter 4-digit PIN"
        className="pin-input"
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
};

export default PinInput;
