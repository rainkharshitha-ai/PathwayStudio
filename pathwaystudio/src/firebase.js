import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔥 Your Firebase config (from you)
const firebaseConfig = {
  apiKey: "AIzaSyCK6sbtytR5rgx6sUbQLFdAM0UMZLfJWUw",
  authDomain: "project-70c315f3-d2e9-4238-b9f.firebaseapp.com",
  projectId: "project-70c315f3-d2e9-4238-b9f",
  storageBucket: "project-70c315f3-d2e9-4238-b9f.firebasestorage.app",
  messagingSenderId: "229781290936",
  appId: "1:229781290936:web:fc16c94cb9edd04233194d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth
export const auth = getAuth(app);
