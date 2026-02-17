import React, { useState } from "react";

const CheckStatus = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const checkStatus = async () => {
    try {
      setError("");
      setResult(null);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/check-status/${email}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2>Check Application Status</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={checkStatus}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2c3e50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Check Status
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Hello {result.name}</h3>
          <p>
            Your Application Status:{" "}
            <strong>{result.status.toUpperCase()}</strong>
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      )}
    </div>
  );
};

export default CheckStatus;
