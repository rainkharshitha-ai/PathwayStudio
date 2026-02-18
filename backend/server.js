require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ======================
   MONGODB CONNECTION
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ======================
   SCHEMAS
====================== */

// ✅ Applications
const ApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
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
    approvedAt: Date, // 🔥 approval time
  },
  { timestamps: true }
);

const Application = mongoose.model("applications", ApplicationSchema);

// ✅ Messages
const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", MessageSchema);

// ✅ Users (Google Signup)
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    dob: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

/* ======================
   APPLICATION ROUTES
====================== */

// Submit Application
app.post("/api/applications", async (req, res) => {
  try {
    const newApplication = new Application({
      name: req.body.name?.trim(),
      email: req.body.email?.trim().toLowerCase(),
      phone: req.body.phone,
      instagram: req.body.instagram,
      height: req.body.height,
      address: req.body.address,
      message: req.body.message,
      status: "pending",
    });

    await newApplication.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Applications
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update Status (Admin)
app.put("/api/applications/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    application.approvedAt = new Date(); // 🔥 save decision time

    await application.save();

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete Application
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Check Status by Email
app.get("/api/application-status/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    const application = await Application.findOne({ email });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      name: application.name,
      status: application.status,
      submittedAt: application.createdAt,
      approvedAt: application.approvedAt,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   MESSAGE ROUTES
====================== */
app.post("/api/messages", async (req, res) => {
  try {
    await Message.create(req.body);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Message not saved" });
  }
});

// Get Messages (Admin)
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Delete Message
app.delete("/api/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ======================
   USER ROUTES
====================== */

// Save User After Google Signup
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, dob } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    await User.create({ name, email, dob });

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get Users (Admin)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/* ======================
   SERVER START
====================== */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
