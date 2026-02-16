const { Resend } = require("resend");

const sendStatusMail = async (to, name, status) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

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
Pathway Modeling Team`
            : `Hi ${name},

Your application was not selected.

Best wishes,
Pathway Modeling Team`;

    try {
        await resend.emails.send({
            from: "Pathway Modeling <onboarding@resend.dev>",
            to: "pathwaymodeling@gmail.com",
            subject,
            text: message,
        });

        console.log("✅ Email sent using Resend");
    } catch (error) {
        console.error("❌ Resend Error:", error);
        throw error;
    }
};

module.exports = sendStatusMail;
