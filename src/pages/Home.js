import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ Import Navbar

const Home = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions.reverse());
  }, []);

  return (
    <div className="container">
      <Navbar />  {/* ✅ Include Navbar */}

      <div className="header">
        <h2>Split Bill</h2>
        <p className="sub-text">Manage your expenses with friends.</p>
      </div>

      <div className="card home-card">
        <h3>Create a New Split</h3>
        <p>Split your bill easily and share with your friends.</p>
        <button className="button" onClick={() => navigate("/create-split")}>Create Split</button>
      </div>

      <h3 className="sub-heading">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions yet. Create a split!</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} className="card transaction-card">
            <div className="transaction-details">
              <p className="transaction-name">{transaction.title}</p>
              <p className="transaction-amount">₹{transaction.amount}</p>
              <p className="transaction-time">{transaction.timestamp}</p>
            </div>
            <button className="button small" onClick={() => navigate("/split-details", { state: transaction })}>
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
