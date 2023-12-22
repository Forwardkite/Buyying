"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Login() {
  const [user, Setuser] = useState('');
  const [pass, SetPass] = useState('');
  const router = useRouter();



  const handleLogin = async (e) => {
    e.preventDefault();
    const SendingData = {
      email: user,
      password: pass
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SendingData),
      });

      if (response.redirected) {
        router.replace("/dashboard")

      } else {
        console.error('Failed to login:', response.statusText);
        alert('Neither Email or Password Error');
      }
    } catch (error) {
      console.error('Error sending data:', error);

    }
  };
  return (
    <div className="h-screen flex ">
      <div className="w-2/3 md:w-2/5 lg:w-1/5 m-auto p-8 rounded-md shadow-0-0">
        <img
          src="../../../../assets/img/buyyinn-logo.png"
          alt=""
          className="mx-auto w-full mb-10"
        />
        <h1 className="text-center font-bold mb-8">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input flex flex-col mb-4">
            <label htmlFor="">User ID</label>
            <input type="email" className="border p-2 rounded mt-1"
            value={user}
            onChange={e=> Setuser(e.target.value)}
            />
          </div>
          <div className="input flex flex-col mb-6">
            <label htmlFor="">Password</label>
            <input type="password" className="border p-2 rounded mt-1" 
            value={pass}
            onChange={e=> SetPass(e.target.value)}
            />
          </div>
          <button className="py-2 px-4 bg-violet-700 text-white mx-auto  rounded w-full text-center"
          type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
