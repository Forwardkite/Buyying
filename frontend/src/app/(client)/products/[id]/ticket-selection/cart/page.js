"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../utilis/authUser";
import { initializeCashfree } from "@/cashfree";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Cart() {
  //user authentication middleware
  useAuth();

  const [cashfree, setCashfree] = useState(null); // State to hold cashfree instance

  // Initialize Cashfree on component mount
  useEffect(() => {
    const initializeCashfreeInstance = async () => {
      try {
        const cashfreeInstance = await initializeCashfree();
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("Error initializing Cashfree:", error);
      }
    };

    initializeCashfreeInstance();

    // Clean up function to handle unmount or re-initialization
    return () => {
      setCashfree(null);
    };
  }, []);

  const handleProceedClick = () => {
    if (!cashfree) {
      console.error("Cashfree is not initialized yet.");
      return;
    }

    let checkoutOptions = {
      paymentSessionId: "payment-session-id",
      returnUrl:
        "https://test.cashfree.com/pgappsdemos/v3success.php?myorder={joenodend}",
    };

    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  };

  const [slotNumbers, setSlotNumbers] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const slots = queryParams.get("slots");

    if (slots) {
      const numbers = slots.split(",").map(Number); // Convert strings to numbers
      setSlotNumbers(numbers);
    }
  }, []);

  return (
    <div className="flex mt-12">
      <div className="w-3/4">
        <div className="flex items-start flex-wrap mb-4 py-8 border-b">
          <div className="flex items-start flex-wrap w-1/2">
            <img
              src="@/../assets/img/biryani.png"
              alt=""
              className="rounded-full max-w-[100px] h-auto aspect-square object-cover"
            />
            <div className="details px-8">
              <h6 className="text-2xl font-bold">Biryani</h6>
              <p className="text-lg">Quantity: 6</p>
              <p className="text-lg donate">Donation: 2</p>
              <p className="text-lg">Rate: 100</p>
              <p className="text-lg">Total Price: 600</p>
            </div>
          </div>

          <div className="flex w-1/2 justify-start flex-col">
            <div className="ticket-numbers ">
              <h6 className="font-bold w-full">Tickets Selected</h6>
              <div className="ticket">
                {/* Map over slotNumbers and render each number */}
                {slotNumbers.map((number, index) => (
                  <span key={index}>{number}</span>
                ))}
              </div>
            </div>

            <div className="flex mt-4">
              <button className="bg-red-400  py-2 px-4 rounded-md mr-4">
                Remove
              </button>
              <button className="bg-theme py-2 px-4 rounded-md">
                Edit Item
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <p className="text-lg">Delivery Charge: 400</p>
        <p className="text-lg">Total Price: 1400</p>

        <h6 className="font-bold text-2xl">Total Payable: 2000</h6>

        <button
          onClick={handleProceedClick}
          className="btn-theme-dual font-bold text-white rounded-full py-3 px-40 mt-12"
        >
          Pay
        </button>
      </div>
    </div>
  );
}
