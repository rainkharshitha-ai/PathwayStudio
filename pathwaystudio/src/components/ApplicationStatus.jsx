import { useState } from "react";

export default function ApplicationStatus() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStatus("");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/application-status/${email.toLowerCase()}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Application not found");
        return;
      }

      setStatus(data.status);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (status === "approved") return "alert-success";
    if (status === "rejected") return "alert-danger";
    return "alert-warning";
  };

  return (
    <div className="container py-5 px-3" style={{ maxWidth: "500px" }}>
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4">Application Status</h3>

        <div className="mb-3">
          <label className="form-label">Enter Your Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn btn-dark btn-lg w-100"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>

        {status && (
          <div className={`alert ${getStatusColor()} mt-4 text-center`}>
            Your Application Status:{" "}
            <strong>{status.toUpperCase()}</strong>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
