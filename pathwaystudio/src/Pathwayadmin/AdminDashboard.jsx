import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Applications from "./Applications";
import Messages from "./Messages";
import EmailLogs from "./EmailLogs";

const AdminDashboard = () => {
  const [page, setPage] = useState("applications");

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert("Logout failed");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* NAV BUTTONS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setPage("applications")}
          style={buttonStyle}
        >
          Applications
        </button>

        <button
          onClick={() => setPage("messages")}
          style={buttonStyle}
        >
          Messages
        </button>

        <button
          onClick={() => setPage("emailLogs")}
          style={buttonStyle}
        >
          Sent Emails
        </button>

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
        {page === "applications" && <Applications />}
        {page === "messages" && <Messages />}
        {page === "emailLogs" && <EmailLogs />}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 18px",
  border: "none",
  backgroundColor: "#2c3e50",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "6px",
  minWidth: "120px",
};

export default AdminDashboard;
