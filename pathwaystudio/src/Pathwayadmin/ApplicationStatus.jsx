import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function ApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplication = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/application-status/${user.email}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError("Please fill the application form.");
        setLoading(false);
        return;
      }

      setApplication(data);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Application Status</h4>

      {error && (
        <div className="alert alert-warning text-center">
          {error}
        </div>
      )}

      {application && (
        <div
          className="card shadow-sm p-4 rounded-4"
          style={{ animation: "fadeIn 0.5s ease-in-out" }}
        >
          <h5 className="mb-2">{application.name}</h5>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                application.status === "approved"
                  ? "text-success fw-bold"
                  : application.status === "rejected"
                  ? "text-danger fw-bold"
                  : "text-warning fw-bold"
              }
            >
              {application.status.toUpperCase()}
            </span>
          </p>

          <p className="text-muted">
            <strong>Submitted:</strong>{" "}
            {new Date(application.submittedAt).toLocaleString()}
          </p>

          {application.approvedAt && (
            <p className="text-muted">
              <strong>Decision Time:</strong>{" "}
              {new Date(application.approvedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

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
