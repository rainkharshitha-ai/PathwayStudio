require("dotenv").config(); // MUST BE FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sendStatusMail = require("./email");

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
   SCHEMAS & MODELS
====================== */

// Applications
const ApplicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    instagram: String,
    height: String,
    address: String,
    message: { type: String, default: "New modeling application" },
    status: { type: String, default: "pending" },
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

// Email Logs
const EmailLogSchema = new mongoose.Schema(
  {
    to: String,
    subject: String,
    status: String,
  },
  { timestamps: true }
);

const EmailLog = mongoose.model("email_logs", EmailLogSchema);

/* ======================
   APPLICATION ROUTES
====================== */

// Submit application
app.post("/api/applications", async (req, res) => {
  try {
    const applicationData = {
      name: req.body.name?.trim() || "No Name",
      email: req.body.email?.trim().toLowerCase() || "noemail@example.com",
      phone: req.body.phone?.trim() || "0000000000",
      instagram: req.body.instagram?.trim() || "",
      height: String(req.body.height || ""),
      address: req.body.address?.trim() || "",
      message: req.body.message || "New modeling application",
      status: "pending",
    };

    await Application.create(applicationData);

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ Application save error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Get all applications (Admin)
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

/* ======================
   ✅ CHECK STATUS (FREE OPTION)
====================== */

app.get("/api/check-status/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    const application = await Application.findOne({ email });

    if (!application) {
      return res.status(404).json({
        message: "Application not found. Please check your email.",
      });
    }

    res.json({
      name: application.name,
      status: application.status,
    });

  } catch (error) {
    console.error("❌ Check status error:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

/* ======================
   UPDATE STATUS
====================== */

app.put("/api/applications/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    await application.save();

    // Optional Email Sending
    const mailSent = await sendStatusMail(
      application.email,
      application.name,
      status
    );

    await EmailLog.create({
      to: application.email,
      subject:
        status === "approved"
          ? "Application Approved"
          : "Application Rejected",
      status: mailSent ? "sent" : "failed",
    });

    res.json({ success: true });

  } catch (err) {
    console.error("❌ Status update error:", err);
    res.status(500).json({ error: "Status update failed" });
  }
});

// Delete application
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
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
    res.status(500).json({ error: "Message not sent" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.delete("/api/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ======================
   EMAIL LOG ROUTES
====================== */

app.get("/api/email-logs", async (req, res) => {
  try {
    const logs = await EmailLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch email logs" });
  }
});

app.delete("/api/email-logs/:id", async (req, res) => {
  try {
    const deleted = await EmailLog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Email log not found" });
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ======================
   SERVER START
====================== */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
