"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        window.location.href = "/";
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex ">
      <div className="w-full md:w-[400px] m-auto p-8 rounded-md shadow-0-0">
        <img
          src="../../../../assets/img/buyyinn-logo.png"
          alt=""
          className="mx-auto w-full mb-10"
        />
        <h1 className="text-center font-bold mb-8 text-2xl">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input flex flex-col mb-4">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="border p-2 rounded mt-1"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border p-2 rounded mt-1"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border p-2 rounded mt-1"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="py-2 px-4 bg-violet-700 text-white mx-auto  rounded w-full text-center"
            type="submit"
          >
            Register
          </button>
          <div className="mx-auto text-center flex mt-4 hover:text-violet-700">
            <Link href="/login">Already have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
