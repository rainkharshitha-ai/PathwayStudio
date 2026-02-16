require("dotenv").config();
const { Resend } = require("resend");

// 🔐 Check API key first
if (!process.env.RESEND_API_KEY) {
    throw new Error("❌ RESEND_API_KEY is missing in environment variables");
}

// Create Resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

const sendStatusMail = async (to, name, status) => {
    console.log("📧 Sending email to:", to);  // 👈 ADD THIS LINE

    try {
        // 🎯 Subject
        const subject =
            status === "approved"
                ? "🎉 Application Approved - Pathway Modeling Studio"
                : "❌ Application Update - Pathway Modeling Studio";

        // 📝 Message
        const message =
            status === "approved"
                ? `Hi ${name},

Congratulations! 🎉  
Your application has been APPROVED.

We look forward to working with you.

Regards,  
Pathway Modeling Studio`
                : `Hi ${name},

Thank you for applying to Pathway Modeling Studio.

After careful review, we regret to inform you that your application was not selected this time.

We encourage you to apply again in the future.

Best wishes,  
Pathway Modeling Studio`;

        // 📤 Send Email
        const response = await resend.emails.send({
            from: "Pathway Modeling <onboarding@resend.dev>",
            to: to, // ✅ Send to actual user email
            subject,
            text: message,
        });

        console.log("✅ Email sent successfully:", response);
        return response;

    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};

module.exports = sendStatusMail;
