import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateSplit from "./pages/CreateSplit";
import SplitDetails from "./pages/SplitDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-split" element={<CreateSplit />} />
        <Route path="/modify-split" element={<CreateSplit isEditing={true} />} />
        <Route path="/split/:id" element={<SplitDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
