import "dotenv/config";
import AWS from "aws-sdk";

// Configure AWS SES
const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to send email
const sendEmail = async () => {
  const params = {
    Source: process.env.FROM_EMAIL,
    Destination: {
      ToAddresses: [process.env.TO_EMAIL],
    },
    Message: {
      Subject: { Data: "Test Email from AWS SES" },
      Body: { Text: { Data: "Hello! This is a test email from AWS SES." } },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("✅ Email sent successfully!", result);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

// Run the function
sendEmail();
