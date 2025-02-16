import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">Welcome to Splitzy</h1>
      <p className="mt-4">Easily split payments with friends and track expenses.</p>
      <Link to="/create-split">
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
          Create a Split
        </button>
      </Link>
    </div>
  );
};

export default Home;
