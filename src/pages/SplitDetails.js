import React from "react";
import { useLocation } from "react-router-dom";

const SplitDetails = () => {
  const location = useLocation();
  const { title, amount, participants, hostUpiId } = location.state || {};

  // Calculate split amount per participant
  const splitAmount = participants?.length ? (amount / participants.length).toFixed(2) : 0;

  // Generate sharable payment link for each participant
  const generateSharableLink = (participantName) => {
    return `${window.location.origin}/pay?name=${encodeURIComponent(participantName)}&amount=${splitAmount}&upi=${encodeURIComponent(hostUpiId)}`;
  };

  // ✅ Function to copy link to clipboard (with fallback)
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // ✅ Modern way to copy
        await navigator.clipboard.writeText(text);
        alert("Payment link copied! Share it with the participant.");
      } else {
        // 🔹 Fallback method for unsupported browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Payment link copied! Share it with the participant.");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy link. Try manually selecting and copying.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Total Amount: ₹{amount}</p>
      <p>Host UPI ID: <strong>{hostUpiId}</strong></p>
      <h3 className="mt-4">Participants:</h3>
      <ul className="list-disc ml-6">
        {participants?.map((p, index) => {
          const paymentLink = generateSharableLink(p);
          return (
            <li key={index} className="flex items-center space-x-4">
              <span>{p} - <strong>₹{splitAmount}</strong></span>
              {/* ✅ "Copy Payment Link" Button */}
              <button
                className="bg-gray-600 text-white px-3 py-1 rounded"
                onClick={() => copyToClipboard(paymentLink)}
              >
                Copy Payment Link
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SplitDetails;
