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
  const provider = new GoogleAuthProvider();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Handle redirect result properly
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (!result?.user) return;

        const user = result.user;

        const fullName = localStorage.getItem("signup_name");
        const savedDob = localStorage.getItem("signup_dob");

        await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName || user.displayName || "User",
            email: user.email,
            dob: savedDob || null,
          }),
        });

        localStorage.removeItem("signup_name");
        localStorage.removeItem("signup_dob");

        navigate("/become-model");

      } catch (error) {
        console.error("Redirect error:", error);
      }
    };

    handleRedirect();
  }, [navigate]);

  const handleGoogleSignup = async () => {
    if (!firstName || !lastName || !dob) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      localStorage.setItem("signup_name", `${firstName} ${lastName}`);
      localStorage.setItem("signup_dob", dob);

      await signInWithRedirect(auth, provider);

    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: "500px" }}>
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
