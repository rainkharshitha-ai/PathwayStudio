import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";

export default function GetStart() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    if (!firstName || !lastName || !dob) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Login with Google Popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 Send user to backend (no duplicate issue)
      await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: user.email,
          dob: dob,
        }),
      });

      // 🔥 Go to next page
      navigate("/become-model");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 rounded-4 w-100"
        style={{ maxWidth: "500px" }}
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

        <button
          className="btn btn-danger w-100"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up with Google"}
        </button>
      </div>
    </div>
  );
}
