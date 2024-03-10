"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useAuth from "../utilis/authUser";

export default function Profile() {

  //user authentication middleware
  useAuth();
  const [combinedStrings, setCombinedStrings] = useState([]);
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

  useEffect(() => {
    const fetchCombinedStrings = async () => {
      try {
        const response = await fetch(`${apiUrl}/lottery/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCombinedStrings(data.combinedStrings);
      } catch (error) {
        console.error('Error fetching combined strings:', error);
      }
    };

    fetchCombinedStrings();
  }, [apiUrl, email]);

  axios.defaults.withCredentials = true;

  const handleProceedClick = async () => {
    try {
      const response = await axios.get(`${apiUrl}/logout`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setLogoutMessage('Logged out successfully');
        window.location.href = "/";
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
  <h6 className="mb-4">Tickets</h6>
  <div className="flex flex-wrap -mx-2">
    {combinedStrings && combinedStrings.map((combinedString, index) => (
      <div key={index} className="w-1/3 px-2 mb-4 relative">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
          {/* Content for each token */}
          <h5 className="text-lg font-bold mb-2">{combinedString}</h5>
          <p className="text-sm text-gray-600">Active</p>
          {/* Add any additional content or design here */}
        </div>
        {/* Designs for rectangle edges */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg className="absolute bottom-full left-0 mb-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 283" fill="none">
              <defs>
                <pattern id="diagonal-lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#3182CE" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="375" height="283" fill="url(#diagonal-lines)" />
            </svg>
          </div>
        </div>
      </div>
    ))}
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
