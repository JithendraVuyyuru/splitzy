import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate("/")}>Splizy</h1>  {/* ✅ Clickable Logo */}
      <div className="nav-links">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/create-split")}>Create Split</button>
        <button onClick={() => navigate("/split-details")}>Transactions</button>
      </div>
    </nav>
  );
};

export default Navbar;
