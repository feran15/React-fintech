export const setTransactionPin = async (pin: string, token: string) => {
  const res = await fetch("/transaction-pin/set-pin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });

  return res.json();
};

export const verifyTransactionPin = async (pin: string, token: string) => {
  const res = await fetch("/transaction-pin/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });

  return res.json();
};
