require("dotenv").config();
const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
    },
});

const sendStatusMail = async (to, name, status) => {
    const subject =
        status === "approved"
            ? "🎉 Application Approved - Pathway Modeling Studio"
            : "❌ Application Update - Pathway Modeling Studio";

    const message =
        status === "approved"
            ? `Hi ${name},

Congratulations! 🎉
Your application has been APPROVED.

Regards,
Pathway Modeling Studio`
            : `Hi ${name},

Your application was not selected.

Best wishes,
Pathway Modeling Studio`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to, // ✅ Send to real user
        subject: subject,
        text: message,
    });

    console.log("✅ Email sent successfully via Gmail");
};

module.exports = sendStatusMail;
