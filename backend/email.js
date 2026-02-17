require("dotenv").config();
const sgMail = require("@sendgrid/mail");

// ✅ Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

        const msg = {
            to: to,
            from: "pathwaymodeling@gmail.com", // ✅ MUST match verified sender
            subject: subject,
            text: message,
        };

        await sgMail.send(msg);

        console.log("✅ Email sent successfully via SendGrid");
        return true;

    } catch (error) {
        console.error(
            "❌ SendGrid Error:",
            error.response?.body || error.message
        );
        return false;
    }
};

module.exports = sendStatusMail;
