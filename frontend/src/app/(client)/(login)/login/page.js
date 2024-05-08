"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link component
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Ensure useRouter is only invoked on the client-side
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath);
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
        // console.log('Token here:', token);
        Cookies.set('token', token, { expires: 1 / 24, secure: true, sameSite: 'none' });
        window.location.href = "/";
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
    </div>
  );
}
