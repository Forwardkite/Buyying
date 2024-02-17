"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../utilis/authUser";
import { initializeCashfree } from "@/cashfree";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Cart() {
  //user authentication middleware
  useAuth();
  const router = useRouter();
  const [cashfree, setCashfree] = useState(null); // State to hold cashfree instance
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [imageProduct, setProductImage] = useState("");
  const [imageReal, setProductImageReal] = useState("");

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

    // Fetch product details based on product ID from URL
    const productId = router.query?.productId; // Use optional chaining to access router.query
    const pathname = window.location.pathname; // Get the pathname from the URL
    const id = pathname.split('/')[2]; // Split the pathname and get the third segment (index 2) which represents the id
    console.log("ID:", id);
    if (id) {
      // Fetch product details from backend using productId
      fetchProductDetails(id);
    }
  }, [router.query?.id]);

  // Function to fetch product details from backend
  const fetchProductDetails = async (id) => {
    try {
      // Make a fetch request to your backend API to get product details based on productId
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/admin/view/${id}`); // Adjust the API endpoint as per your backend
      const productData = await response.json();

      // Update product name and price
      setProductName(productData.productName);
      setProductPrice(productData.productPrice);
      setProductImage(productData.imageProduct);

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="flex mt-12">
      <div className="w-3/4">
        <div className="flex items-start flex-wrap mb-4 py-8 border-b">
          <div className="flex items-start flex-wrap w-1/2">
            <img
              src={`${apiUrl}/uploads/${imageProduct}`} // Display the fetched product image
              alt={productName} // Use product name as alt text
              className="rounded-full max-w-[100px] h-auto aspect-square object-cover"
            />
            <div className="details px-8">
              <h6 className="text-2xl font-bold">Name: {productName}</h6>
              <p className="text-lg">Quantity: 6</p>
              <p className="text-lg donate">Donation: 2</p>
              <p className="text-lg">Rate: {productPrice}</p>
              <p className="text-lg">Total Price: {productPrice * 6}</p>
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
