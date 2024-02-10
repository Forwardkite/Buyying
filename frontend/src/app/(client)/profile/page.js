"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useAuth from "../utilis/authUser";

export default function Profile() {
  useAuth();
  const [logoutMessage, setLogoutMessage] = useState('');
  const [email, setEmail] = useState(''); // State to store user email
  const [name, setName] = useState(''); // State to store user email
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookie = document.cookie;
        const cookieParts = cookie.split(';');
        let userId;

        cookieParts.forEach(part => {
          const keyValue = part.trim().split('=');
          const key = keyValue[0];
          const value = keyValue[1];
          if (key === 'token') {
            const tokenParts = value.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            userId = payload.userId;
          }
        });

        const response = await fetch(`${apiUrl}/admin/user/view/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const user = await response.json();
        setEmail(user.email); // Set the email fetched from the API
        setName(user.name); // Set the name fetched from the API

      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProceedClick = async () => {
    try {
      const response = await axios.get(`${apiUrl}/logout`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setLogoutMessage('Logged out successfully');
      } else {
        setLogoutMessage('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLogoutMessage('An error occurred. Please try again.');
    }
  }
return (
  <>
    <section>
      <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
        <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
          My Account
        </h4>
        <p className="text-base text-white text-center "></p>
      </div>
    </section>
    <section className="mt-12">
      <div className="w-11/12 flex flex-wrap  justify-between mx-auto">
        <div className="w-8/12">
          <h6>Tickets</h6>
          <div className="w-full">
            <div className="w-4/12 flex flex-col items-center justify-center">
              <p className="text-sm"></p>
              <h5 className="text-lg font-bold">SHT123456</h5>
              <p className="text-sm">Active</p>
            </div>
          </div>
        </div>
        <div className="w-4/12">
          <div className="flex flex-col items-center rounded-[30px] bg-[#f0f0f0]  p-16">
            <img
              src="@/../assets/img/biryani.png"
              alt=""
              className="rounded-full aspect-square w-[120px] h-auto mb-8"
            />
            <h4 className="text-xl font-bold">{name}</h4>
            <p className="text-base">{email}</p>
            <div className="w-full mt-8">
              <p className="text-base">Pin: 688522</p>
              <p className="text-base">Line 21, Panampilli nagar,</p>
              <p className="text-base">Panambilli, Ernakulam dist,</p>
              <p className="text-base">Kerala - 682036</p>
            </div>
            <div className="w-full flex mt-12 ">
              <button onClick={handleProceedClick} className="rounded-[4px] text-theme-purple bg-transparent py-2 border border-theme-purple px-4 mr-4">
                Log Out
              </button>
              <button className="rounded-[4px] text-white bg-theme-purple py-2 px-4 flex  ">
                <span className="mr-2">Edit Profile</span>{" "}
                <EditOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
}
