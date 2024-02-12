"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link component

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
        console.log(document.cookie);
        // window.location.href = "/"; // Redirect to dashboard on successful login
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Display error message to user
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-full md:w-[400px] m-auto p-8 rounded-md shadow-0-0">
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
          <p className="mx-auto text-center flex mt-4 hover:text-violet-700">
            Don't have an account? <Link href="/register">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
