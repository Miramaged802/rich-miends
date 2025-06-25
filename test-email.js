onst axios = require("axios");

// Test data for contact form
const testData = {
  fullName: "Ahmed Mohamed",
  phone: "+971501234567",
  email: "test@example.com",
  service: "Golden Visa",
  message:
    "This is a test message from the automated test script. Testing the email functionality after server restructure.",
  submissionTime: new Date().toLocaleString(),
};

console.log("🧪 Testing Rich Minds Contact Form Email System...");
console.log("📧 Test Data:", testData);

// Test the email endpoint
axios
  .post("http://localhost:3000/send-email", testData)
  .then((response) => {
    console.log("✅ SUCCESS! Email sent successfully");
    console.log("📊 Response Status:", response.status);
    console.log("📝 Response Data:", response.data);
  })
  .catch((error) => {
    console.log("❌ ERROR! Email sending failed");
    if (error.response) {
      console.log("📊 Error Status:", error.response.status);
      console.log("📝 Error Data:", error.response.data);
    } else {
      console.log("📝 Error Message:", error.message);
    }
  });
