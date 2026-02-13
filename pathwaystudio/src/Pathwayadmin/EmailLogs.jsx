import React, { useEffect, useState } from "react";

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:4000/api/email-logs");
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 🔁 Resend email
  const resendEmail = async (id) => {
  await fetch(`http://localhost:4000/api/email-logs/resend/${id}`, {
    method: "POST",
  });
  alert("Email resent successfully");
};

const deleteLog = async (id) => {
  await fetch(`http://localhost:4000/api/email-logs/${id}`, {
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
  style={{padding: "20px",background: "#f8fafc", minHeight: "100vh",
  }}
>
  <div
    style={{background: "#ffffff",padding: "16px 20px",borderRadius: "8px",boxShadow: "0 2px 8px rgba(0,0,0,0.06)",marginBottom: "20px",
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
          padding: "2px",
          marginBottom: "10px",
          width: "300px",
        }}
      />

      {/* TABLE */}
      <table
        width="100%"
        border="2"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
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

              {/* ✅ FIXED DATE */}
              <td align="center">
                {new Date(log.createdAt).toLocaleString()}
              </td>
             
<td className="text-center">
  <div className="flex flex-col items-center gap-1 font-semibold">
    <div
      onClick={() => resendEmail(log._id)}
      className="cursor-pointer text-indigo-600 hover:text-indigo-800"
    >
      Resend
    </div>

    <div
      onClick={() => deleteLog(log._id)}
      className="cursor-pointer text-red-600 hover:text-red-800"
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
  );
};

export default EmailLogs;
