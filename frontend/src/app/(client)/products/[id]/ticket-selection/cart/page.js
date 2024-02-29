"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import useAuth from "../../../../utilis/authUser";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import RenderRazorpay from "@/app/razorpay";

export default function Cart() {
  //user authentication middleware
  useAuth();
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [imageProduct, setProductImage] = useState("");
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });


  const handleProceedClick = async (amount, currency) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const requestData = {
        productName: productName,
        amount: amount * 100,
        currency,
        keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
        KeySecret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
      };
  
      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log("CODE:",data)

      const orderId = data.order.id;  
  
      setOrderDetails({
        orderId: orderId,
        currency: currency,
        amount: data.amount,
      });
  
      const options = {
        key: 'rzp_test_iCvzKiw8EqvAQg',
        amount: productPrice * 100,
        currency: 'INR',
        name: 'BUYYING CORP Private Ltd',
        description: 'Test Transaction',
        image: 'https://media.istockphoto.com/id/1331491686/vector/element-design.jpg?s=612x612&w=0&k=20&c=QIMRS2IPiQyyTZJR_G1JAjH_ErBBkrDPtQe2GBNgm2w=',
        order_id:orderId, // Use the orderId received from the backend
        callback_url: 'http://localhost:3000/profile',
        prefill: {
          name: '',
          email: 'gaurav.kumar@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp1 = new Razorpay(options);
  
      document.getElementById('rzp-button1').addEventListener('click', function (e) {
        rzp1.open();
        e.preventDefault();
      });
  
    } catch (error) {
      console.error("Error:", error);
    }
  };



const handlePaymentVerification = async () => {
  try {
      const response = await fetch(`${apiUrl}/payment-verify`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              razorpay_order_id: '...', // Replace with the actual order ID
              razorpay_payment_id: '...', // Replace with the actual payment ID
              razorpay_signature: '...', // Replace with the actual signature
          }),
      });

      const data = await response.json();

      if (response.ok) {
          // Payment verified successfully
          console.log(data.message); // Log success message or update UI accordingly
      } else {
          // Payment verification failed
          console.error(data.message); // Log error message or display error to the user
      }
  } catch (error) {
      console.error('Error during payment verification:', error);
      // Handle network errors or other exceptions
  }
};

// Call handlePaymentVerification after the payment is completed successfully
// For example, after the user returns from the Razorpay checkout page
useEffect(() => {
  // Check if the user has returned from the Razorpay checkout page
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('payment_status');

  if (paymentStatus === 'success') {
    // Payment was successful, initiate payment verification
    handlePaymentVerification();
  }
}, []);


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
              <p className="text-lg">Quantity: 1</p>
              <p className="text-lg donate">Donation: 2</p>
              <p className="text-lg">Rate: {productPrice}</p>
              <p className="text-lg">Total Price: {productPrice * 1}</p>
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
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <button id="rzp-button1"
          onClick={() => handleProceedClick(productPrice, 'INR')}
          className="btn-theme-dual font-bold text-white rounded-full py-3 px-40 mt-12"
        >
          Pay
        </button>
      </div>
    </div>
  );
}
