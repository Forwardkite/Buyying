"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const [passwordError, setPasswordError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [registrationAllowed, setRegistrationAllowed] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Check if all details are filled correctly
    const allDetailsFilled = Object.values(formData).every(value => value !== "");
    setRegistrationAllowed(allDetailsFilled && otp === "123456");
  }, [formData, otp]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phoneNumber = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (phoneNumber.length > 10) return; // Limit to 10 digits
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: phoneNumber // Update the state with the sanitized phone number
      }));
      
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailExists(false); // Clear email existence state if email format is invalid
        return;
      }
      // Check for email duplication
      const emailDuplicationResponse = await checkEmailDuplication(value);
      setEmailExists(emailDuplicationResponse.exists);
    } else if (name === "phoneNumber") {
      // Check for phone number duplication
      const phoneNumberDuplicationResponse = await checkPhoneNumberDuplication(value);
      setPhoneNumberExists(phoneNumberDuplicationResponse.exists);
    }
  };


//______________________________________EMAIL_DUPLICATION_CHECKING_API_______________________________________//

  const checkEmailDuplication = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/admin/check/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error checking email duplication:", response.statusText);
        return { exists: false };
      }
    } catch (error) {
      console.error("Error checking email duplication:", error);
      return { exists: false };
    }
  };

  //Making sure email inputed is in correct format.

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //______________________________________PHONE_DUPLICATION_CHECKING_API_______________________________________//
  
  const checkPhoneNumberDuplication = async (phoneNumber) => {
    try {
      const response = await fetch(`${apiUrl}/admin/check/phone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phoneNumber })
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error checking phone number duplication:", response.statusText);
        return { exists: false };
      }
    } catch (error) {
      console.error("Error checking phone number duplication:", error);
      return { exists: false };
    }
  };


  

//____________________________________OTP_SECTION__________________________________________//

  const handleSendOtp = () => {
    // Here you can send the OTP to the phone number
    // Implement your logic to send OTP
    setOtpSent(true); // Mark OTP as sent
  };

  const handleVerifyOtp = () => {
    // Here you can verify the OTP
    // Implement your logic to verify OTP
    if (otp === "123456") {
      // OTP is correct
      setOtpError("");
      // Proceed with registration or any other action
      console.log("OTP verified successfully");
    } else {
      // Incorrect OTP
      setOtpError("Incorrect OTP");
    }
  };

  const handleResendOtp = () => {
    // Resend OTP logic goes here
    console.log("Resending OTP...");
  };

//____________________________________________________________________________________//

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  
    // Check if passwords match only if both fields are not empty
    if (name === "confirmPassword" && formData.password !== "" && value !== "") {
      if (formData.password !== value) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!emailExists && !phoneNumberExists) {
      try {
        const response = await fetch(`${apiUrl}/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          // Redirect or handle success
          window.location.href = "/login";
        } else {
          // Handle error response
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

   return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:max-w-md">
        <h1 className="text-center font-bold mb-6 text-2xl">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="border p-2 rounded w-full mt-1"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`border p-2 rounded w-full mt-1 ${emailExists ? 'border-red-500' : ''}`}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {emailExists && <span className="text-red-500">This email address already exist!</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border p-2 rounded w-full mt-1"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                handlePasswordChange(e);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={`border p-2 rounded w-full mt-1 ${passwordError ? 'border-red-500' : ''}`}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => {
                handleChange(e);
                handlePasswordChange(e);
              }}
            />
            {passwordError && <span className="text-red-500">{passwordError}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="flex">
              <span className="border border-r-0 p-2 rounded-l mt-1 bg-gray-200">+91</span>
              <input
                type="text"
                className={`border border-l-0 p-2 rounded-r w-full mt-1 ${phoneNumberExists ? 'border-red-500' : ''}`}
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={otpSent} // Disable phone number input after OTP sent
              />
            </div>
            {phoneNumberExists && <span className="text-red-500">Phone number already exists in the database</span>}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="py-1 px-4 bg-violet-700 text-white  mt-2"
              >
                Send OTP
              </button>
            )}
          </div>
          {otpSent && (
            <div className="mb-4">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                className="border p-2 rounded w-full mt-1"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="py-1 px-4 bg-violet-700 text-white  mt-2"
              >
                Verify OTP
              </button>
              {otpError && <span className="text-red-500">{otpError}</span>}
              <button
                onClick={handleResendOtp}
                className="py-1 px-4 text-violet-700  mt-2 ml-2 border border-violet-700"
              >
                Resend OTP
              </button>
            </div>
          )}
          {!registrationAllowed && (
            <button
              className="py-2 px-4 bg-gray-300 text-gray-600 w-full mt-4"
              type="button"
              disabled
            >
              Register
            </button>
          )}
          <div className="text-center mt-4">
            <Link href="/login" className="text-violet-700 hover:text-violet-900">
              Already have an Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
