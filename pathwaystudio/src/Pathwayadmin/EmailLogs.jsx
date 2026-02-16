import React, { useEffect, useState } from "react";

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email-logs`);
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 🔁 Resend email
  const resendEmail = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/email-logs/resend/${id}`, {
      method: "POST",
    });
    alert("Email resent successfully");
  };

  // ❌ Delete log
  const deleteLog = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/email-logs/${id}`, {
      method: "DELETE",
    });

    setLogs((prev) => prev.filter((log) => log._id !== id));
  };

  // 🔍 Search filter
  const filteredLogs = logs.filter((log) =>
    log.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px 20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
          }}
        >
          📧 Sent Emails
        </h2>

        <p
          style={{
            marginTop: "6px",
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Track and manage all sent email communications
        </p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* TABLE WRAPPER (Responsive Fix) */}
      <div style={{ overflowX: "auto" }}>
        <table
          width="100%"
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            minWidth: "750px",
            background: "#ffffff",
          }}
        >
          <thead style={{ background: "#f4f4f4" }}>
            <tr>
              <th align="left">Email</th>
              <th align="left">Subject</th>
              <th align="center">Status</th>
              <th align="center">Date & Time</th>
              <th align="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan="5" align="center">
                  No emails found
                </td>
              </tr>
            )}

            {filteredLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.to}</td>
                <td>{log.subject}</td>
                <td align="center">{log.status}</td>

                <td align="center">
                  {new Date(log.createdAt).toLocaleString()}
                </td>

                <td align="center">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: "600",
                    }}
                  >
                    <div
                      onClick={() => resendEmail(log._id)}
                      style={{
                        cursor: "pointer",
                        color: "#4f46e5",
                      }}
                    >
                      Resend
                    </div>

                    <div
                      onClick={() => deleteLog(log._id)}
                      style={{
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailLogs;
