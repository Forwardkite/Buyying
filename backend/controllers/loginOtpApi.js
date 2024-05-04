// Import required modules
const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);


// Function to send OTP
const sendOTP = async (res,req) => {
    try {
        const { phoneNumber } = res.body;
        // Add +91 to the beginning of phoneNumber
        const formattedPhoneNumber = "+91" + phoneNumber;
        const verification = await client.verify
            .v2.services(`${verifyServiceSid}`)
            .verifications
            .create({
                to: formattedPhoneNumber,
                channel: 'sms'
            });

        // Extract relevant information for response
        const serializedVerification = {
            sid: verification.sid,
            status: verification.status
            // Add more properties if needed
        };

        return { success: true, verification: serializedVerification };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, error: error.message };
    }
};




// Function to verify OTP
const verifyOTP = async (phoneNumber, code) => {
    try {
        // Verify the OTP
        const verificationCheck = await client.verify
            .v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: code });

        return { success: true, verificationCheck };
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, error: error.message };
    }
};


module.exports = { sendOTP, verifyOTP };
