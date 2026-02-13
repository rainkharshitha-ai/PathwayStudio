const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pathwaymodeling@gmail.com",
    pass: "dpmn mtsv kyij qgmi", // App Password
  },
});

// ✅ ADD HERE (ONLY ONCE)
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Mail error:", err);
  } else {
    console.log("✅ Mail server ready");
  }
});

const sendStatusMail = async (to, name, status) => {
  const subject =
    status === "approved"
      ? "🎉 Application Approved - Pathway Modeling Studio"
      : "❌ Application Update - Pathway Modeling Studio";

  const message =
    status === "approved"
      ? `
Hi ${name},

Congratulations! 🎉  
Your application has been APPROVED.

Our team will contact you soon for the next steps.

Welcome to Pathway Modeling Studio ✨

Regards,
Pathway Modeling Team
`
      : `
Hi ${name},

Thank you for applying to Pathway Modeling Studio.

After careful review, your application was not selected this time.

Please feel free to apply again in the future.

Best wishes,
Pathway Modeling Team
`;

  await transporter.sendMail({
    from: `"Pathway Modeling" <pathwaymodeling@gmail.com>`,
    to,
    cc: "pathwaymodeling@gmail.com",
    subject,
    text: message,
  });
};

module.exports = sendStatusMail;
