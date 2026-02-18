import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import Applications from "./Applications";
import Messages from "./Messages";
import ApplicationStatus from "./ApplicationStatus";
import UserAccount from "./UserAccount";

const AdminDashboard = () => {
  const [page, setPage] = useState("applications");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  const renderPage = () => {
    switch (page) {
      case "applications":
        return <Applications />;
      case "messages":
        return <Messages />;
      case "applicationStatus":
        return <ApplicationStatus />;
      case "userAccount":
        return <UserAccount />;
      default:
        return <Applications />;
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* NAVIGATION */}
      <div className="button-grid">
        <NavButton
          label="Applications"
          active={page === "applications"}
          onClick={() => setPage("applications")}
        />

        <NavButton
          label="Messages"
          active={page === "messages"}
          onClick={() => setPage("messages")}
        />

        <NavButton
          label="Application Status"
          active={page === "applicationStatus"}
          onClick={() => setPage("applicationStatus")}
        />

        <NavButton
          label="User Account"
          active={page === "userAccount"}
          onClick={() => setPage("userAccount")}
        />

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <hr />

      <div className="content-area">
        {renderPage()}
      </div>

      {/* CSS */}
      <style>{`
        .admin-container {
          padding: 20px;
          max-width: 1100px;
          margin: auto;
          animation: fadeIn 0.6s ease-in-out;
        }

        .admin-title {
          text-align: center;
          margin-bottom: 25px;
        }

        .button-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .nav-btn {
          padding: 12px;
          border: none;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .logout-btn {
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #e74c3c;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #c0392b;
          transform: translateY(-3px);
        }

        .content-area {
          margin-top: 20px;
          animation: slideUp 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Mobile adjustment */
        @media (max-width: 600px) {
          .admin-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

const NavButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="nav-btn"
    style={{
      backgroundColor: active ? "#34495e" : "#2c3e50",
    }}
  >
    {label}
  </button>
);

export default AdminDashboard;
