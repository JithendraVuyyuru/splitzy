import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SplitDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, amount, participants } = location.state || {};

  // Calculate the amount each participant has to pay
  const splitAmount = participants?.length ? (amount / participants.length).toFixed(2) : 0;

  // Redirect to Modify Split Page with existing data
  const handleEdit = () => {
    navigate("/modify-split", { state: { title, amount, participants } });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Total Amount: ₹{amount}</p>
      <h3 className="mt-4">Participants:</h3>
      <ul className="list-disc ml-6">
        {participants?.map((p, index) => (
          <li key={index}>
            {p} - <span className="font-semibold">₹{splitAmount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 mr-2"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button className="bg-green-600 text-white px-4 py-2">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default SplitDetails;
