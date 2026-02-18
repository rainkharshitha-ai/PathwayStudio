import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import { auth } from "../firebase";

export default function GetStart() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Redirect Result (Mobile Safe)
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const user = result.user;

          await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: localStorage.getItem("fullName"),
              email: user.email,
              dob: localStorage.getItem("dob"),
            }),
          });

          localStorage.removeItem("fullName");
          localStorage.removeItem("dob");

          alert("Account Created Successfully ✅");

          navigate("/become-model");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkRedirect();
  }, [navigate]);

  const handleGoogleSignup = async () => {
    if (!firstName || !lastName || !dob) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      // Save temporary data
      localStorage.setItem("fullName", `${firstName} ${lastName}`);
      localStorage.setItem("dob", dob);

      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);

    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 rounded-4 w-100"
        style={{ maxWidth: "500px", animation: "fadeIn 0.6s ease" }}
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
