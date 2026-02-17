require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,              // ✅ MUST be 587
    secure: false,          // ✅ false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,  // Gmail App Password
    },
    tls: {
        rejectUnauthorized: false,
    },
    family: 4,              // ✅ Force IPv4 (important for Render)
});

// ✅ Optional but VERY GOOD: verify connection once
transporter.verify(function (error, success) {
    if (error) {
        console.log("❌ SMTP Connection Error:", error);
    } else {
        console.log("✅ SMTP Server is ready to send emails");
    }
});

// ✅ Send Status Mail Function
const sendStatusMail = async (to, name, status) => {
    try {
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

        const info = await transporter.sendMail({
            from: `"Pathway Modeling Studio" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: message,
        });

        console.log("✅ Email sent:", info.response);
        return true;

    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
        return false;
    }
};

module.exports = sendStatusMail;
