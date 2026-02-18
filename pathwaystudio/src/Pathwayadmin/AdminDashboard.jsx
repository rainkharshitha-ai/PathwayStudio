import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import Applications from "./Applications";
import Messages from "./Messages";
import EmailLogs from "./EmailLogs";

const AdminDashboard = () => {
  const [page, setPage] = useState("applications");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/admin-login"); // redirect after logout
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  const renderPage = () => {
    switch (page) {
      case "applications":
        return <Applications />;
      case "messages":
        return <Messages />;
      case "emailLogs":
        return <EmailLogs />;
      default:
        return <Applications />;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* HEADER */}
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
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
          label="Sent Emails"
          active={page === "emailLogs"}
          onClick={() => setPage("emailLogs")}
        />

        <button
          onClick={logout}
          style={{
            ...buttonStyle,
            backgroundColor: "#e74c3c",
          }}
        >
          Logout
        </button>
      </div>

      <hr />

      {/* PAGE CONTENT */}
      <div style={{ marginTop: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
};

const NavButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...buttonStyle,
      backgroundColor: active ? "#34495e" : "#2c3e50",
    }}
  >
    {label}
  </button>
);

const buttonStyle = {
  padding: "10px 18px",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "6px",
  minWidth: "120px",
};

export default AdminDashboard;
