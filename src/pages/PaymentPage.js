import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const participantName = queryParams.get("name") || "Guest";
  const amount = queryParams.get("amount") || "0";
  const hostUpiId = queryParams.get("upi") || "";

  // ✅ Generate UPI Payment Link
  const upiLink = `upi://pay?pa=${hostUpiId}&pn=${encodeURIComponent(participantName)}&am=${amount}&cu=INR`;

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-bold">Payment Details</h2>
        <p><strong>Name:</strong> {participantName}</p>
        <p><strong>Amount to Pay:</strong> ₹{amount}</p>
        <p><strong>Host UPI ID:</strong> {hostUpiId}</p>
        <button className="button" onClick={() => window.location.href = upiLink}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
