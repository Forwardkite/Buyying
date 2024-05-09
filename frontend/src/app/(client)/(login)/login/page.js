"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link component
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false); // State to control popup display
  const [redirectTimer, setRedirectTimer] = useState(5); // Timer for redirection

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    // Check if the token exists in cookies
    const token = document.cookie;

    if (token) {
      // Show login error popup if token is found
      setShowLoginError(true);

      // Start the redirect timer
      const timerInterval = setInterval(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Redirect after 5 seconds
      setTimeout(() => {
        router.push('/');
      }, 5000);

      // Cleanup function to clear the interval
      return () => clearInterval(timerInterval);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const token = await response.json();
        Cookies.set('token', token, { expires: 1 / 24, secure: true, sameSite: 'none' });
        router.push('/'); // Redirect to the home page
      } else {
        const errorMessage = await response.text();
        const formattedErrorMessage = errorMessage.replace(/"/g, '');
        alert(formattedErrorMessage); // Display error message to user
        console.error('Failed to fetch token');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="bg-gray-200 w-full md:w-[400px] m-auto p-8 rounded-md shadow-0-0">
        <img
          src="@/assets/img/buyyinn-logo.png" // Adjust path to the image
          alt=""
          className="mx-auto w-full mb-10"
        />
        <h1 className="text-center font-bold mb-8 text-2xl">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded mt-1"
            />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded mt-1"
            />
          </div>
          <button
            className="py-2 px-4 bg-violet-700 text-white mx-auto rounded w-full text-center"
            type="submit"
          >
            Login
          </button>
          <div className="mx-auto text-center flex mt-4 hover:text-violet-700">
            <Link href="/register"> Don't have an account? Create Account</Link>
          </div>
        </form>
      </div>
      {/* Popup for showing login error */}
      {showLoginError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <p className="text-center text-red-600 font-semibold mb-4">Oops..You are already logged in! Redirecting in {redirectTimer} seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
}
