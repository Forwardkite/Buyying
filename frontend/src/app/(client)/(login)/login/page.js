import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen flex ">
      <div className="w-full md:w-[400px] m-auto p-8 rounded-md shadow-0-0">
        <img
          src="../../../../assets/img/buyyinn-logo.png"
          alt=""
          className="mx-auto w-full mb-10"
        />
        <h1 className="text-center font-bold mb-8 text-2xl">Login</h1>
        <form>
          <div className="input flex flex-col mb-4">
            <label htmlFor="">User ID</label>
            <input type="email" className="border p-2 rounded mt-1" />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="">Password</label>
            <input type="password" className="border p-2 rounded mt-1" />
          </div>
          <button
            className="py-2 px-4 bg-violet-700 text-white mx-auto  rounded w-full text-center"
            type="submit"
          >
            <Link href="/">Login</Link>
          </button>
          <button className="mx-auto text-center flex mt-4 hover:text-violet-700">
            <Link href="/register">Create Account</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
