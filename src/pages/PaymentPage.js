import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const participantName = queryParams.get("name") || "Guest";
  const amount = queryParams.get("amount") || "0";
  const hostUpiId = queryParams.get("upi") || "";

  // Generate UPI payment link
  const upiLink = `upi://pay?pa=${hostUpiId}&pn=${encodeURIComponent(participantName)}&am=${amount}&cu=INR`;

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Payment Details</h2>
      <p><strong>Name:</strong> {participantName}</p>
      <p><strong>Amount to Pay:</strong> ₹{amount}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => window.location.href = upiLink}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
