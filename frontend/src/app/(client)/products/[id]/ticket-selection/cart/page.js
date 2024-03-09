"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import useAuth from "../../../../utilis/authUser";
import { useRouter } from "next/navigation";

export default function Cart() {

  //user authentication middleware
  useAuth();

  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [imageProduct, setProductImage] = useState("");
  const [slotNumbers, setSlotNumbers] = useState([]);
  const [email, setEmail] = useState(""); // State to store user email
  const [name, setName] = useState(""); // State to store user email

  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });

  // Fetching Email and User Name of Authenticated User 

  let userEmailCopy = "";
  let userNameCopy = "";

  const fetchUserData = async () => {
    try {
      const cookie = document.cookie;
      const cookieParts = cookie.split(";");
      let userId;

      cookieParts.forEach((part) => {
        const keyValue = part.trim().split("=");
        const key = keyValue[0];
        const value = keyValue[1];
        if (key === "token") {
          const tokenParts = value.split(".");
          const payload = JSON.parse(atob(tokenParts[1]));
          userId = payload.userId;
        }
      });
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/admin/user/view/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const user = await response.json();
      setEmail(user.email); // Set the email fetched from the API
      setName(user.name); // Set the name fetched from the API

      // Assign values to other variables
      userEmailCopy = user.email;
      userNameCopy = user.name;

    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  fetchUserData();

  useEffect(() => {
    const handlePayment = async () => {
      try {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const requestData = {
          productName: productName,
          amount: productPrice * 100, // assuming the price is already in the smallest currency unit
          currency: 'INR', // Assuming you are always using INR
          // Other necessary data for order creation
        };

        const response = await fetch(`${apiUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        const orderId = data.order.id;

        setOrderDetails({
          orderId: orderId,
          currency: requestData.currency,
          amount: requestData.amount,
        });

        const options = {
          key: 'rzp_test_iCvzKiw8EqvAQg', // Your Razorpay test key
          amount: requestData.amount,
          currency: requestData.currency,
          name: 'BUYYING CORP Private Ltd',
          description: 'Test Transaction',
          image: 'https://media.istockphoto.com/id/1331491686/vector/element-design.jpg?s=612x612&w=0&k=20&c=QIMRS2IPiQyyTZJR_G1JAjH_ErBBkrDPtQe2GBNgm2w=',
          order_id: orderId,

          handler: async function (response) {
            const body = {
              ...response,
            };
            const validateResponse = await fetch(
              `${apiUrl}/payment-verify`,
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",

                },
              }
            );
            if (validateResponse.ok) {

              window.location.href = '/profile';
              // Function to extract numbers from the URL query parameters
              const getNumbersFromURL = () => {
                const queryParams = new URLSearchParams(window.location.search);
                const slots = queryParams.get("slots");
                fetchUserData();

                if (slots) {
                  return slots.split(",").map(Number);
                } else {
                  return [];
                }
              };

              // Function to send selected numbers to the backend
              const sendSelectedNumbersToBackend = (numbers) => {

                // Get the current date
                const currentDate = new Date();

                // Format the date to DD-MM-YYYY
                const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;  
                console.log(formattedDate)

                const concatenatedNumbers = numbers.join('');
                // Wrap the selected numbers in an object with other required data
                const requestBody = {
                  numbers: concatenatedNumbers,
                  email: userEmailCopy,
                  name: userNameCopy,
                  product: productName,
                  cost: productPrice,
                  date: formattedDate,

                };

                // Send a POST request to the backend server
                fetch(`${apiUrl}/admin/slot`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log("Response from backend:", data);
                    // Perform any additional actions based on the response
                  })
                  .catch((error) => {
                    console.error("Error sending data to the backend:", error);
                  });
              };

              // Fetch numbers from the URL and send them to the backend
              const numbersFromURL = getNumbersFromURL();
              sendSelectedNumbersToBackend(numbersFromURL);
            } else {
              // Payment verification failed
              const errorData = await validateResponse.json();
              console.error('Error verifying payment:', errorData.message);

              // Handle the error condition, such as displaying an error message to the user
            }
          },
          callback_url: `${window.location.origin}/profile`,
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();

      } catch (error) {
        console.error("Error:", error);
      }
    };

    const rzpButton = document.getElementById('rzp-button1');
    if (rzpButton) {
      rzpButton.addEventListener('click', handlePayment);
      return () => {
        rzpButton.removeEventListener('click', handlePayment);
      };
    }
  }, [productName, productPrice, userEmailCopy, userNameCopy]);


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
          className="btn-theme-dual font-bold text-white rounded-full py-3 px-40 mt-12"
        >
          Pay
        </button>
      </div>
    </div>
  );
}
