import { useEffect, useState } from "react";

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/applications`
      );
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Application Status</h4>

      {applications.map((app) => (
        <div
          key={app._id}
          className="card shadow-sm mb-3 p-4 rounded-4"
          style={{
            animation: "fadeIn 0.5s ease-in-out"
          }}
        >
          <h5 className="mb-2">{app.name}</h5>

          {/* Status */}
          <p className="mb-2">
            <strong>Status:</strong>{" "}
            <span
              className={
                app.status === "approved"
                  ? "text-success fw-bold"
                  : app.status === "rejected"
                  ? "text-danger fw-bold"
                  : "text-warning fw-bold"
              }
            >
              {app.status.toUpperCase()}
            </span>
          </p>

          {/* Submitted Date */}
          <p className="mb-2 text-muted">
            <strong>Submitted:</strong>{" "}
            {new Date(app.createdAt).toLocaleString()}
          </p>

          {/* Decision Date */}
          {app.approvedAt && (
            <p className="mb-0 text-muted">
              <strong>Decision Time:</strong>{" "}
              {new Date(app.approvedAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
