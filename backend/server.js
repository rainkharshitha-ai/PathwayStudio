require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ======================
   MIDDLEWARE
====================== */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pathway-studio.vercel.app" // 🔥 replace with your exact Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* ======================
   MONGODB CONNECTION
====================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ======================
   SCHEMAS
====================== */

// Applications
const ApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: String,
    instagram: String,
    height: String,
    address: String,
    message: { type: String, default: "New modeling application" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedAt: Date,
  },
  { timestamps: true }
);

const Application = mongoose.model("applications", ApplicationSchema);

// Messages
const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", MessageSchema);

// Users
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, lowercase: true, unique: true },
    dob: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

/* ======================
   USER ROUTES
====================== */

// Ensure user exists (No duplicates)
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, dob } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    // If user does not exist → create
    if (!user) {
      user = await User.create({
        name,
        email: normalizedEmail,
        dob,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

// Get all users (Admin)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   APPLICATION ROUTES
====================== */

// Submit Application
app.post("/api/applications", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    const existing = await Application.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Application already submitted",
      });
    }

    const newApplication = await Application.create({
      ...req.body,
      email,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      data: newApplication,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications (Admin)
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status
app.put("/api/applications/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    application.approvedAt = new Date();
    await application.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete application
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   MESSAGE ROUTES
====================== */

app.post("/api/messages", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   SERVER START
====================== */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
