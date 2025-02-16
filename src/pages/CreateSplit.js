import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ Include Navbar

const CreateSplit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [hostUpiId, setHostUpiId] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !hostUpiId || !participants) {
      alert("❌ Please fill in all fields before proceeding.");
      return;
    }

    const participantList = participants.split(",").map((p) => p.trim()).filter((p) => p !== "");

    if (participantList.length === 0) {
      alert("❌ Please enter at least one participant.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount,
      hostUpiId,
      participants: participantList,
      timestamp: new Date().toLocaleString(),
    };

    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    storedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));

    navigate("/split-details", { state: newTransaction });
  };

  return (
    <div className="container">
      <Navbar />  {/* ✅ Include Navbar */}

      <div className="form-container">
        <h2>Create Split</h2>
        <p className="sub-text">Enter details for bill splitting.</p>

        <form className="card split-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" className="input-field" placeholder="e.g. Dinner at XYZ"
            value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Total Amount</label>
          <input type="number" className="input-field" placeholder="₹"
            value={amount} onChange={(e) => setAmount(e.target.value)} required />

          <label>Host UPI ID</label>
          <input type="text" className="input-field" placeholder="yourupi@upi"
            value={hostUpiId} onChange={(e) => setHostUpiId(e.target.value)} required />

          <label>Participants (comma-separated)</label>
          <input type="text" className="input-field" placeholder="Alice, Bob, Charlie"
            value={participants} onChange={(e) => setParticipants(e.target.value)} required />

          <button type="submit" className="button">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSplit;
