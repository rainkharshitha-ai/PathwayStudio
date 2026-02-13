import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .getstart-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1f2933, #111827);
          color: white;
          text-align: center;
          padding: 20px;
        }

        .getstart-card {
          max-width: 500px;
        }

        .getstart-card h1 {
          font-size: 36px;
          margin-bottom: 15px;
        }

        .getstart-card p {
          font-size: 16px;
          color: #d1d5db;
          margin-bottom: 30px;
        }

        .getstart-btn {
          padding: 14px 40px;
          font-size: 16px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          background: linear-gradient(90deg, #4facfe, #c77dff);
          color: white;
          font-weight: bold;
        }

        .getstart-btn:hover {
          opacity: 0.9;
        }
      `}</style>

      <div className="getstart-wrapper">
        <div className="getstart-card">
          <h1>Pathway Modeling Studio</h1>
          <p>
            Begin your professional modeling journey with us.
            Create your profile, explore opportunities, and grow your career.
          </p>

          <button
            className="getstart-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
