import React from "react";

export default function Register() {
  return (
    <div className="h-screen flex ">
      <div className="w-full md:w-[400px] m-auto p-8 rounded-md shadow-0-0">
        <img
          src="../../../../assets/img/buyyinn-logo.png"
          alt=""
          className="mx-auto w-full mb-10"
        />
        <h1 className="text-center font-bold mb-8 text-2xl">Register</h1>
        <form>
          <div className="input flex flex-col mb-4">
            <label htmlFor="">Full Name</label>
            <input type="text" className="border p-2 rounded mt-1" />
          </div>
          <div className="input flex flex-col mb-4">
            <label htmlFor="">User ID</label>
            <input type="text" className="border p-2 rounded mt-1" />
          </div>
          <div className="input flex flex-col mb-4">
            <label htmlFor="">Email</label>
            <input type="email" className="border p-2 rounded mt-1" />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="">Password</label>
            <input type="password" className="border p-2 rounded mt-1" />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="">Confirm Password</label>
            <input type="password" className="border p-2 rounded mt-1" />
          </div>
          <button
            className="py-2 px-4 bg-violet-700 text-white mx-auto  rounded w-full text-center"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
