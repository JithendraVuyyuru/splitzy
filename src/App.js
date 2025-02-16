import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSplit from "./pages/CreateSplit";
import SplitDetails from "./pages/SplitDetails";
import PaymentPage from "./pages/PaymentPage";  // ✅ Import Payment Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-split" element={<CreateSplit />} />
        <Route path="/split-details" element={<SplitDetails />} />
        <Route path="/pay" element={<PaymentPage />} />  {/* ✅ Added Payment Page */}
      </Routes>
    </Router>
  );
}

export default App;
