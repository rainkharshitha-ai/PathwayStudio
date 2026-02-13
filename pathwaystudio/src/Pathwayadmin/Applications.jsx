import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH APPLICATIONS
  // ======================
  const fetchApplications = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`);

      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ======================
  // APPROVE / REJECT
  // ======================
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      // Update UI immediately
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      alert("Status update failed");
    }
  };

  // ======================
  // DELETE APPLICATION
  // ======================
  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      // Remove from UI
      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );
    } catch (error) {
      alert("Delete failed");
    }
  };

  // ======================
  // UI
  // ======================
  if (loading) return <p>Loading applications...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applications</h2>

      {applications.length === 0 && <p>No applications</p>}

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p><b>Name:</b> {app.name}</p>
          <p><b>Email:</b> {app.email}</p>
          <p><b>Phone:</b> {app.phone}</p>
          <p><b>Instagram:</b> {app.instagram}</p>
          <p><b>Height:</b> {app.height}</p>
          <p><b>Address:</b> {app.address}</p>
          <p><b>Status:</b> {app.status}</p>

          <button onClick={() => updateStatus(app._id, "approved")}>
            Approve
          </button>

          <button
            onClick={() => updateStatus(app._id, "rejected")}
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>

          {/* DELETE ONLY IF REJECTED (BEST PRACTICE) */}
          {app.status === "rejected" && (
            <button
              onClick={() => deleteApplication(app._id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
              }}
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
