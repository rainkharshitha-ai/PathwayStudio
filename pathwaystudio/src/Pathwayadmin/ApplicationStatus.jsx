import { useEffect, useState } from "react";

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/applications`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <h4 className="mb-4">Application Status</h4>

      {applications.map((app) => (
        <div key={app._id} className="card p-3 mb-3 shadow-sm rounded-3">
          <h5>{app.name}</h5>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                app.status === "approved"
                  ? "text-success"
                  : app.status === "rejected"
                  ? "text-danger"
                  : "text-warning"
              }
            >
              {app.status.toUpperCase()}
            </span>
          </p>

          {app.approvedAt && (
            <p>
              <strong>Decision Time:</strong>{" "}
              {new Date(app.approvedAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
