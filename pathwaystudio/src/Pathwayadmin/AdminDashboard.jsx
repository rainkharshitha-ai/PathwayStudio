import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Applications from "./Applications";
import Messages from "./Messages";
import EmailLogs from "./EmailLogs"; // ✅ ADD THIS

const AdminDashboard = () => {
  const [page, setPage] = useState("applications");

  // 🔐 Logout admin
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* HEADER */}
      <h1>Admin Dashboard</h1>

      {/* NAV BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setPage("applications")}
          style={buttonStyle}
        >
          Applications
        </button>

        <button
          onClick={() => setPage("messages")}
          style={{ ...buttonStyle, marginLeft: "10px" }}
        >
          Messages
        </button>

        {/* ✅ NEW BUTTON */}
        <button
          onClick={() => setPage("emailLogs")}
          style={{ ...buttonStyle, marginLeft: "10px" }}
        >
          Sent Emails
        </button>

        <button
          onClick={logout}
          style={{
            ...buttonStyle,
            marginLeft: "10px",
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
        {page === "emailLogs" && <EmailLogs />} {/* ✅ SHOW EMAIL LOGS */}
      </div>
    </div>
  );
};

// 🔘 Button style
const buttonStyle = {
  padding: "8px 16px",
  border: "none",
  backgroundColor: "#2c3e50",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px",
};

export default AdminDashboard;
