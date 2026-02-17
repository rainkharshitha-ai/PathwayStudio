require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendStatusMail = async (to, name, status) => {
    try {

        const subject = "Update Regarding Your Modeling Application";

        const msg = {
            to: to,
            from: "pathwaymodeling@gmail.com", // must match verified sender
            subject: subject,

            text: `Dear ${name},

Thank you for applying to Pathway Modeling Studio.

Your application status is: ${status.toUpperCase()}.

Best regards,
Pathway Modeling Studio Team`,

            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Dear ${name},</p>

          <p>Thank you for applying to <strong>Pathway Modeling Studio</strong>.</p>

          <p>
            We would like to inform you that your application status is:
            <strong style="color: ${status === "approved" ? "green" : "red"
                };">
              ${status.toUpperCase()}
            </strong>
          </p>

          <p>
            If you have any questions, feel free to reply to this email.
          </p>

          <br/>

          <p>Best regards,<br/>
          <strong>Pathway Modeling Studio Team</strong></p>
        </div>
      `,
        };

        await sgMail.send(msg);

        console.log("✅ Email sent successfully via SendGrid");
        return true;

    } catch (error) {
        console.error("❌ SendGrid Error:", error.response?.body || error.message);
        return false;
    }
};

module.exports = sendStatusMail;
