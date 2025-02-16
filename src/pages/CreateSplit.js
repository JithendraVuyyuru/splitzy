import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateSplit = ({ isEditing }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState("");
  const [hostUpiId, setHostUpiId] = useState("");

  // Load pre-filled data if editing
  useEffect(() => {
    if (location.state && isEditing) {
      setTitle(location.state.title);
      setAmount(location.state.amount);
      setParticipants(location.state.participants.join(", "));
      setHostUpiId(location.state.hostUpiId || "");
    }
  }, [location.state, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert participants to an array
    const participantList = participants.split(",").map((p) => p.trim());

    // Redirect to Split Details with updated data
    navigate("/split/1", {
      state: { title, amount, participants: participantList, hostUpiId },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{isEditing ? "Modify Split" : "Create Split"}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <label className="block mt-4">Total Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <label className="block mt-4">Your UPI ID:</label>
        <input
          type="text"
          value={hostUpiId}
          onChange={(e) => setHostUpiId(e.target.value)}
          className="border p-2 w-full"
          placeholder="example@upi"
          required
        />

        <label className="block mt-4">Participants (comma-separated):</label>
        <input
          type="text"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2"
        >
          {isEditing ? "Update Split" : "Create Split"}
        </button>
      </form>
    </div>
  );
};

export default CreateSplit;
