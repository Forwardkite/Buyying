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

  const [formCompleted, setFormCompleted] = useState(false);
  const [isOtpNotCorrect, setisOtpNotCorrect] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [registrationClicked, setregistrationClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [registrationAllowed, setRegistrationAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

  const handleRegistrationClick = () => {
    setregistrationClicked(true);
   // Check if all form fields are filled
  const allFieldsFilled = Object.values(formData).every(val => val.trim() !== "");
  if (!allFieldsFilled) {
    // If any field is empty, set an error message for the respective field
    setErrorMsg("Please fill in all fields");
    return;
  }

  // If all fields are filled, set formCompleted to true
  setFormCompleted(true);
};



  //____________________________________OTP_SECTION__________________________________________//

  const handleSendOtp = (phoneNumber) => {
    // Ensure phoneNumber is a string
    const formattedPhoneNumber = String(phoneNumber);
    console.log("Sending OTP to:", formattedPhoneNumber); // Log the formattedPhoneNumber

    fetch(`${apiUrl}/admin/api/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: formattedPhoneNumber }) // Send phoneNumber as an object
    })
      .then(response => {
        if (response.ok) {
          console.log("HERE IS IT:")
          setOtpSent(true);
          return response.json();
        } else {
          throw new Error('Failed to send OTP: ' + response.status);
        }
      })
      .then(data => {
        if (!data.success) {
          console.error('Failed to send OTP:', data.error);
        }
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
      });
  };

  
  //__________________________________________________________________________________//


  const handleVerifyOtp = (enteredOtp) => {
    const phoneNumber = "+91" + formData.phoneNumber; // Prepend country code
    console.log("Verifying OTP...");
    fetch(`${apiUrl}/admin/api/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber, otp: enteredOtp }) // Pass phoneNumber with country code and entered OTP
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setRegistrationAllowed(true);
          console.log('OTP verified successfully');
          setIsOtpVerified(true);
        } else {
          setisOtpNotCorrect(true);
          console.error('OTP verification failed:', data.error);
        }
      })
      .catch(error => console.error('Error verifying OTP:', error));
  };

//__________________________________________________________________________________//

const handleResendOtp = (phoneNumber) => {
  // Ensure phoneNumber is a string
  const formattedPhoneNumber = String(formData.phoneNumber);
  console.log("Resending OTP to:", formattedPhoneNumber); // Log the formattedPhoneNumber

  fetch(`${apiUrl}/admin/api/resend-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber: formattedPhoneNumber }) // Send phoneNumber as an object
  })
    .then(response => {
      if (response.ok) {
        console.log("Resent OTP successfully");
        setOtpSent(true);
        return response.json();
      } else {
        throw new Error('Failed to resend OTP: ' + response.status);
      }
    })
    .then(data => {
      if (!data.success) {
        console.error('Failed to resend OTP:', data.error);
      }
    })
    .catch(error => {
      console.error('Error resending OTP:', error);
    });
};

  //___________________________PASSWORD _____________________________________________//

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

  const handlePhoneNumberValidation = (phoneNumber) => {
    const isValid = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
    setIsPhoneNumberValid(isValid);
    const phoneNumberExists = false; // Your logic to check if the phone number exists
    setPhoneNumberExists(phoneNumberExists);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // Only proceed with registration if registration is allowed
    if (setFormCompleted) {
      try {
        const response = await fetch(`${apiUrl}/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          // Handle successful registration
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 w-full md:max-w-md">
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
            {registrationClicked && formData.name === "" && (
              <span className="text-red-500">Name is required</span>
            )}
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
            {registrationClicked && formData.name === "" && (
              <span className="text-red-500">Email is required</span>
            )}
            {emailExists && <span className="text-red-500">This email address already exists!</span>}
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
            {registrationClicked && formData.name === "" && (
              <span className="text-red-500">Password is required</span>
            )}
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
            {registrationClicked && formData.name === "" && (
              <span className="text-red-500">Password is required</span>
            )}
            {passwordError && <span className="text-red-500">{passwordError}</span>}
          </div>
          <div className="mb-4 flex">
            <div className="flex-1 mr-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="flex">
                <span className="border border-r-0 p-2 mt-1 bg-gray-200">+91</span>
                <input
                  type="text"
                  className={`border border-l-0 p-2 rounded-r w-full mt-1 ${phoneNumberExists && formData.phoneNumber ? 'border-red-500' : ''}`}
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    handleChange(e);
                    handlePhoneNumberValidation(e.target.value);
                  }}
                  pattern="[0-9]*"           // Allow only numeric input
                  maxLength="10"              // Limit to 10 characters
                  inputMode="numeric"         // Show numeric keyboard on mobile devices
                  disabled={otpSent}          // Disable phone number input after OTP sent
                />
              </div>
              <div className="ml-right"> {/* To align the right side */}
                {phoneNumberExists && formData.phoneNumber && (
                  <span className="text-red-500">This Phone number already exists!</span>
                )}
              </div>
              <button
               type="button"
                onClick={() => {
                  if (formData.phoneNumber.length === 10) {
                    handleSendOtp(formData.phoneNumber);
                  } else {
                    setErrorMsg("Phone number must be 10 digits"); // Set error message
                    setTimeout(() => setErrorMsg(""), 3000);
                  }
                }}
                className={`py-1 px-4 mt-5 ${phoneNumberExists ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-violet-700 text-white hover:bg-violet-800'}`}
                disabled={phoneNumberExists}
              >
                Send OTP
              </button>
              {errorMsg && (
                <span className="text-red-500">{errorMsg}</span>
              )}
            </div>
            {otpSent && (
              <div className="ml-9 flex-1">
                <div className="mb-4">
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="relative">
                  <input
                    type="text"
                    className="border p-2 rounded w-full mt-1"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  {isOtpVerified && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500 text-xl">&#10004;</span> // Render a green tick mark if OTP is verified
                  )}

                  {isOtpNotCorrect && (
                   <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 text-xl">&#10008;</span> // Render a red cross sign if OTP is not verified
                  )}
                  </div>
                </div>
                <div className="mb-4">
                  <button
                  type="button"
                    onClick={() => handleVerifyOtp(otp)} // Pass the otp state value
                    className="py-1 px-4 mt-1 bg-violet-700 text-white"
                  >
                    Verify OTP
                  </button>
                  {otpError && <span className="text-red-500">{otpError}</span>}
                </div>
              </div>
            )}
          </div>

          {registrationClicked && (
            <div className="text-red-500 mb-4">{errorMsg}</div>
          )}

          {registrationAllowed && isOtpVerified && (
            <button
              className="py-2 px-4 bg-violet-700 text-white w-full mt-4"
              type="submit"
              onClick={handleRegistrationClick}
            >
              Register
            </button>
          )}
          {!registrationAllowed && (
            <button
              className="py-2 px-4 bg-gray-300 text-gray-600 cursor-not-allowed w-full mt-4"
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
