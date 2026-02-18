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
   APPLICATION SCHEMA
====================== */

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
  },
  { timestamps: true }
);

const Application = mongoose.model("applications", ApplicationSchema);

/* ======================
   APPLICATION ROUTES
====================== */

// ✅ Submit Application
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

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (err) {
    console.error("❌ Application save error:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Applications (Admin)
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// ✅ Check Application Status by Email
app.get("/api/application-status/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    const application = await Application.findOne({ email });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      name: application.name,
      status: application.status,
      submittedAt: application.createdAt,
    });
  } catch (error) {
    console.error("❌ Status check error:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

// ✅ Update Application Status (Admin)
app.put("/api/applications/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: "Application status updated",
    });
  } catch (error) {
    console.error("❌ Status update error:", error);
    res.status(500).json({
      error: "Failed to update status",
    });
  }
});

// ✅ Delete Application
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
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
