// Import required modules
const twilio = require('twilio');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);


// Function to send OTP
const sendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
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

        // Send success response with serialized verification data
        res.status(200).json({ success: true, verification: serializedVerification });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};




// Function to verify OTP
const verifyOTP = async (req, res) => {
    try {
        // Verify the OTP
        const { phoneNumber, otp } = req.body;
        const verificationCheck = await client.verify
            .v2.services(`${verifyServiceSid}`)
            .verificationChecks
            .create({ to: phoneNumber, code: otp });

        // Check if verification is successful
        if (verificationCheck.status === 'approved') {
            return res.status(200).json({ success: true, verificationCheck });
        } else {
            return res.status(400).json({ success: false, message: 'OTP verification failed' });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Function to resend OTP
const resendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        // Add +91 to the beginning of phoneNumber
        const formattedPhoneNumber = "+91" + phoneNumber;
        
        // Generate a unique service-specific identifier (SSID)
        const ssid = generateUniqueSSID(); // Implement this function to generate a unique SSID
        
        const verification = await client.verify
            .v2.services(`${verifyServiceSid}`)
            .verifications
            .create({
                to: formattedPhoneNumber,
                channel: 'sms',
                // Specify the unique SSID
                customCode: ssid
            });

        // Extract relevant information for response
        const serializedVerification = {
            sid: verification.sid,
            status: verification.status
            // Add more properties if needed
        };

        // Send success response with serialized verification data
        res.status(200).json({ success: true, verification: serializedVerification });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};



module.exports = { sendOTP, verifyOTP, resendOTP };
