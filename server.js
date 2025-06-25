const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from current directory (frontend)
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Nodemailer configuration
const createTransporter = () => {
  // Check for required environment variables
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_PORT
  ) {
    console.error("❌ Missing required environment variables:");
    console.error("   EMAIL_USER:", process.env.EMAIL_USER ? "✅" : "❌");
    console.error("   EMAIL_PASS:", process.env.EMAIL_PASS ? "✅" : "❌");
    console.error("   EMAIL_HOST:", process.env.EMAIL_HOST ? "✅" : "❌");
    console.error("   EMAIL_PORT:", process.env.EMAIL_PORT ? "✅" : "❌");
    throw new Error(
      "Email configuration is incomplete. Please check your .env file."
    );
  }

  console.log("🔧 Email service configured:");
  console.log("   📧 User:", process.env.EMAIL_USER);
  console.log("   🏠 Host:", process.env.EMAIL_HOST);
  console.log("   🔌 Port:", process.env.EMAIL_PORT);

  try {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });
  } catch (error) {
    console.error("❌ Error creating email transporter:", error.message);
    throw error;
  }
};

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  try {
    console.log("📧 Email request received:", req.body);

    const { fullName, phone, email, service, message, submissionTime } =
      req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Create transporter
    const transporter = createTransporter();
    console.log("🔧 Email transporter created successfully");

    // Company notification email content
    const companyEmailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #376983 0%, #ddbd7f 100%); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 5px solid #ddbd7f; }
        .label { font-weight: bold; color: #376983; margin-bottom: 8px; display: block; }
        .value { color: #555; line-height: 1.6; background: white; padding: 10px; border-radius: 5px; }
        .message-box { background: #fff; padding: 20px; border: 2px solid #ddbd7f; border-radius: 10px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #376983; color: white; border-radius: 10px; }
        .contact-info { display: inline-block; margin: 0 15px; }
        .timestamp { background: #e9ecef; padding: 10px; border-radius: 5px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p>Rich Minds - Contact Form Notification</p>
            <div class="timestamp">Received: ${
              submissionTime || new Date().toLocaleString()
            }</div>
        </div>

        <div class="section">
            <h2 style="color: #376983; margin-bottom: 15px;">👤 Contact Information</h2>
            <span class="label">Full Name:</span>
            <div class="value">${fullName}</div>
            
            <span class="label">Phone Number:</span>
            <div class="value"><a href="tel:${phone}" style="color: #376983; text-decoration: none;">${phone}</a></div>
            
            <span class="label">Email Address:</span>
            <div class="value"><a href="mailto:${email}" style="color: #376983; text-decoration: none;">${email}</a></div>
            
            <span class="label">Service Interest:</span>
            <div class="value">${service || "Not specified"}</div>
        </div>

        <div class="section">
            <h2 style="color: #376983; margin-bottom: 15px;">💬 Message Details</h2>
            <div class="message-box">
                ${message.replace(/\n/g, "<br>")}
            </div>
        </div>

        <div class="footer">
            <h3>Rich Minds Contact Information</h3>
            <div class="contact-info">📍 Meydan Grandstand, 6th Floor, Dubai, UAE</div>
            <div class="contact-info">📞 +971 56 147 5759</div>
            <div class="contact-info">📧 info@richminds.ae</div>
            <div class="contact-info">🌐 www.richminds.ae</div>
            <p style="margin-top: 15px; font-size: 14px;">Please respond to the customer within 24 hours</p>
        </div>
    </div>
</body>
</html>
    `;

    // Email options for company notification
    const companyMailOptions = {
      from: `"Rich Minds Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 New Contact Form - ${fullName} - ${
        service || "General Inquiry"
      }`,
      html: companyEmailContent,
      replyTo: email,
    };

    // Send company notification email
    console.log("📤 Sending company notification email...");
    const info = await transporter.sendMail(companyMailOptions);
    console.log("✅ Company email sent successfully:", info.messageId);

    // Customer auto-reply email
    const customerEmailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #376983 0%, #ddbd7f 100%); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 20px; }
        .content { padding: 20px 0; line-height: 1.8; color: #333; }
        .highlight-box { background: #f8f9fa; padding: 20px; border-left: 5px solid #ddbd7f; border-radius: 5px; margin: 20px 0; }
        .contact-box { background: linear-gradient(135deg, #376983 0%, #ddbd7f 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
        .whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; color: #666; }
        .contact-info { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You for Contacting Rich Minds!</h1>
            <p>Your Trusted Partner in UAE</p>
        </div>
        
        <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for reaching out to Rich Minds! We have received your inquiry and our expert team will review your message carefully.</p>
            
            <div class="highlight-box">
                <h3 style="color: #376983; margin: 0 0 10px 0;">📋 Your Inquiry Summary:</h3>
                <p><strong>Service Interest:</strong> ${
                  service || "General Inquiry"
                }</p>
                <p><strong>Contact Details:</strong> ${phone} | ${email}</p>
            </div>

            <div class="highlight-box">
                <h3 style="color: #376983; margin: 0 0 15px 0;">🚀 What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #555;">
                    <li>Our expert team will review your inquiry within <strong>24 hours</strong></li>
                    <li>We'll prepare a customized response based on your specific needs</li>
                    <li>One of our specialists will contact you via phone or email</li>
                    <li>We'll schedule a consultation if needed</li>
                </ul>
            </div>
            
            <div class="contact-box">
                <h3 style="margin: 0 0 15px 0;">📞 Contact Information</h3>
                <div class="contact-info"><strong>📍 Address:</strong> Meydan Grandstand, 6th Floor, Dubai, UAE</div>
                <div class="contact-info"><strong>📞 Phone:</strong> +971 56 147 5759</div>
                <div class="contact-info"><strong>📧 Email:</strong> info@richminds.ae</div>
                <div class="contact-info"><strong>🌐 Website:</strong> www.richminds.ae</div>
                
                <a href="https://wa.me/+971561475759" class="whatsapp-btn">
                    💬 Chat on WhatsApp
                </a>
            </div>
            
            <p>If you have any urgent questions, feel free to call us directly or reach out via WhatsApp.</p>
        </div>
        
        <div class="footer">
            <p><strong>Rich Minds Team</strong></p>
            <p>Your trusted partner for UAE Golden Visa, Business Setup, and Government Services</p>
        </div>
    </div>
</body>
</html>
    `;

    // Customer confirmation email
    const customerMailOptions = {
      from: `"Rich Minds" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Rich Minds - We'll be in touch soon!",
      html: customerEmailContent,
    };

    // Send customer confirmation email (don't wait for it to avoid blocking the response)
    transporter.sendMail(customerMailOptions).catch((err) => {
      console.error("⚠️ Error sending customer confirmation:", err.message);
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "Email sent successfully! We'll get back to you soon.",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    console.error("❌ Error details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
      error: error.message,
      details: error.code || "UNKNOWN_ERROR",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running normally",
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint for debugging
app.post("/test", (req, res) => {
  console.log("🧪 Test request:", req.body);
  res.json({
    success: true,
    message: "Request received successfully",
    receivedData: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🚨 Server error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(
    `📧 Email configuration: ${
      process.env.EMAIL_USER ? "Configured ✅" : "Missing - Check .env file ⚠️"
    }`
  );
  console.log(`📬 Ready to receive contact form submissions!`);
});
