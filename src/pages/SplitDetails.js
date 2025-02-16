import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ Import Navbar

const SplitDetails = () => {
  const location = useLocation();
  const transaction = location.state;

  if (!transaction) {
    return <p className="error">❌ No transaction found.</p>;
  }

  const { title, amount, hostUpiId, participants } = transaction;
  const splitAmount = (amount / participants.length).toFixed(2);

  // ✅ Fixed Copy Function (Now Works on All Devices)
  const copyToClipboard = async (paymentLink) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(paymentLink);
        alert("✅ Payment link copied! Share it with the participant.");
      } else {
        // ✅ Fallback for iOS/Safari
        const textArea = document.createElement("textarea");
        textArea.value = paymentLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("✅ Payment link copied! Share it with the participant.");
      }
    } catch (err) {
      console.error("❌ Copy failed:", err);
      alert("❌ Failed to copy link. Try manually selecting and copying.");
    }
  };

  return (
    <div className="container">
      <Navbar />  {/* ✅ Include Navbar */}
      
      <div className="header">
        <h2>{title}</h2>
        <p className="sub-text">Total Amount: ₹{amount}</p>
      </div>

      <div className="card upi-card">
        <p className="label">Host UPI ID</p>
        <p className="upi">{hostUpiId}</p>
      </div>

      <h3 className="sub-heading">Participants</h3>
      <ul className="participants-list">
        {participants.map((p, index) => {
          const paymentPageURL = `${window.location.origin}/pay?name=${encodeURIComponent(p)}&amount=${splitAmount}&upi=${encodeURIComponent(hostUpiId)}`;

          return (
            <li key={index} className="card participant">
              <div>
                <p className="participant-name">{p}</p>
                <p className="split-amount">₹{splitAmount}</p>
              </div>
              <button className="button small" onClick={() => copyToClipboard(paymentPageURL)}>
                Copy Link
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SplitDetails;
