const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    pool: true, // Enable connection pooling
    maxConnections: 1, // Limit concurrent connections
    maxMessages: 3, // Max messages per connection
    rateDelta: 20000, // 20 seconds between messages
    rateLimit: 5,
  });

  try {
    await transporter.verify();
    // console.log("✅ Gmail SMTP verified, ready to send emails");
  } catch (verifyErr) {
    console.error("❌ Gmail SMTP verification failed:", verifyErr);
    throw verifyErr;
  }

  // 2) Define the email options
  const mailOptions = {
    from: "Venny <modestusvictor3@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // 3) Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    transporter.close();
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending mail:", err);
    // Rethrow so the calling code (signup) can catch it
    throw err;
  }
};

module.exports = sendEmail;
