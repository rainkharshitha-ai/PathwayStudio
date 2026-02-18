import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function GetStart() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      alert("Account Created Successfully ✅");

      navigate("/application-status");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          animation: "fadeIn 0.6s ease-in-out"
        }}
      >
        <h3 className="text-center mb-4">Create Your Account</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-4"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <div className="d-grid gap-2">
          <button
            className="btn btn-dark"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="btn btn-danger"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up with Google"}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
