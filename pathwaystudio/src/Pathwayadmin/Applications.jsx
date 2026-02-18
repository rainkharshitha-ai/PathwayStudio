import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applications`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch {
      alert("Status update failed");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      const res = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Applications</h2>

      {applications.length === 0 && <p>No applications</p>}

      {applications.map((app) => (
        <div key={app._id} style={{ borderBottom: "1px solid #ccc", padding: 15 }}>
          <p><b>Name:</b> {app.name}</p>
          <p><b>Email:</b> {app.email}</p>
          <p><b>Status:</b> {app.status}</p>

          <button onClick={() => updateStatus(app._id, "approved")}>
            Approve
          </button>

          <button
            onClick={() => updateStatus(app._id, "rejected")}
            style={{ marginLeft: 10 }}
          >
            Reject
          </button>

          {app.status === "rejected" && (
            <button
              onClick={() => deleteApplication(app._id)}
              style={{ marginLeft: 10, background: "red", color: "white" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
