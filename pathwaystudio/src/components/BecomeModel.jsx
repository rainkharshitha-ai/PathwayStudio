import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./BecomeModel.css";

const BecomeModel = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleApplyClick = () => {
    const user = auth.currentUser;

    if (user) {
      setError("");
      navigate("/apply");
    } else {
      setError("Please login with Google to apply.");
    }
  };

  return (
    <div className="become-container">

      {/* TOP CENTER TEXT */}
      <div className="become-hero">
        <h1 className="become-title">Become a Model</h1>

        <p className="become-description">
          Elegance. Confidence. Opportunity. Step into the world of professional
          modeling with expert guidance and real industry exposure.
        </p>
      </div>

      {/* LEFT - RIGHT SECTION */}
      <div className="become-wrapper">

        {/* LEFT IMAGE */}
        <div className="become-image">
          <img src="/modeling-banner.jpg" alt="Become a Model" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="become-content">
          <h2 className="become-subtitle">Who Can Apply</h2>

          <ul className="become-list">
            <li>Open to ages 16 and above</li>
            <li>Passion for fashion & modeling</li>
            <li>Confidence and dedication</li>
            <li>No prior experience required</li>
          </ul>

          <p className="become-note">
            Pathway Modeling Studio provides professional grooming, runway training,
            portfolio development, and real opportunities to build a confident
            modeling career.
          </p>

          {/* ✅ BUTTON WITH LOGIN CHECK */}
          <button
            className="become-button"
            onClick={handleApplyClick}
          >
            Start Apply
          </button>

          {/* ERROR MESSAGE */}
          {error && <p className="become-error">{error}</p>}
        </div>

      </div>
    </div>
  );
};

export default BecomeModel;
