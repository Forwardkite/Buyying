"use client";
// pages/index.js
import React, { useState, useReducer, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import useAuth from "../../../utilis/authUser";
import { useRouter } from "next/navigation";

const reducer = (state, action) => {
  if (state.checkedIds.includes(action.id)) {
    return {
      ...state,
      checkedIds: state.checkedIds.filter((id) => id !== action.id),
    };
  }

  if (state.checkedIds.length >= 2) {
    console.log("Max 2 extras allowed.");
    return state;
  }

  return {
    ...state,
    checkedIds: [...state.checkedIds, action.id],
  };
};

let userEmailCopy = ""; // Declare variable outside of useEffect
let userNameCopy = ""; // Declare variable outside of useEffect

export default function TicketSelection() {
  const [email, setEmail] = useState(""); // State to store user email
  const [name, setName] = useState(""); // State to store user email

  //_________________________________________________________________________________________//

  // user authentication middleware
  useAuth();

  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i.toString(),
    label: i.toString().padStart(2, "0"),
  }));

  const [product, setProduct] = React.useState(1);
  const [donation, setDonation] = React.useState(0);
  const [continueVisible, setContinueVisible] = useState(false);
  const initialState = { checkedIds: [] };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const router = useRouter();
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const [message, setMessage] = useState("Please select any 2 numbers");
  const ticket = product + donation;
  const stockNumber = 12;
  const incrementProduct = () => {
    if (product < stockNumber) {
      setProduct(product + 1);
    }
  };

  const decrementProduct = () => {
    if (product > 1) {
      setProduct(product - 1);
    }
  };
  const incrementDonation = () => {
    if (donation < product) {
      setDonation(donation + 1);
    }
  };

  const decrementDonation = () => {
    if (donation > 0) {
      setDonation(donation - 1);
    }
  };

  //______________________________________________SLOT_VALIDATION_____________________________________________________//

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const validateNumberCombination = async (selectedNumbers) => {
    const combinedNumbers = selectedNumbers.join("");
    

    console.log("Email:", userNameCopy);
    const requestBody = {
      numbers: combinedNumbers,
    };
    try {
      // Make a POST request to the backend route that handles validation
      const response = await fetch(`${apiUrl}/admin/slot/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Check if the combination exists
        if (data.exists) {
          setMessage("Oops! This combination already exists");
          setOpenToast(true);
          handleButtonVisibility(false); // Hide the button
        } else {
          setMessage("Valid combination. Proceed!");
          setOpenToast(true);

          handleButtonVisibility(true); // Show the button only if exactly 3 numbers are selected
        }
      } else {
        throw new Error("Error validating number combination");
      }
    } catch (error) {
      // If an error occurs during the request, log the error
      console.error("Error validating number combination:", error);
      // Show your error message to the user
    }
  };
  const handleProceedClick = () => {
    // Handle proceed action here
    console.log("Proceed clicked ok");
    // sendSelectedNumbersToBackend(selectedNumbers);
    // Pass selected slots to the next page

    const selectedSlots = state.checkedIds.join(",");
    console.log("GETTING IT:", selectedSlots);
    router.push(`./ticket-selection/cart?slots=${selectedSlots}`);

    // window.location.href = "/cart";
  };
  //_________________________________________SLOT_SAVING_FUNCTION_____________________________________________________//

  useEffect(() => {
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
  }, []);

  // const sendSelectedNumbersToBackend = (numbers) => {
  //   // Combine numbers into a string
  //   const combinedNumbers = numbers.join("");

  //   // Wrap the combined numbers in an object with a key named "numbers"
  //   const requestBody = {
  //     numbers: combinedNumbers,
  //     email: userEmailCopy,
  //     name: userNameCopy,
  //   };

  //   // Send a POST request to the backend server
  //   fetch(`${apiUrl}/admin/slot`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestBody),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Response from backend:", data);
  //       // window.location.href = "/cart";
  //     })
  //     .catch((error) => {
  //       console.error("Error sending data to the backend:", error);
  //     });
  // };

  //__________________________________________________________________________________________________//

  const handleCheckboxClick = (id) => {
    let updatedCheckedIds;

    if (state.checkedIds.includes(id)) {
      updatedCheckedIds = state.checkedIds.filter(
        (checkedId) => checkedId !== id
      );
    } else {
      updatedCheckedIds = [...state.checkedIds, id];
    }

    setSelectedNumbers(updatedCheckedIds); // Update selected numbers regardless of count

    if (updatedCheckedIds.length >= 2) {
      validateNumberCombination(updatedCheckedIds); // Validate the selected numbers
      handleButtonVisibility(false);
    } else {
      setMessage("Please select any 2 numbers");

      handleButtonVisibility(false); // Hide the button
    }

    dispatch({ id });
  };

  const [buttonVisible, setButtonVisible] = useState(false);

  const handleButtonVisibility = (isVisible) => {
    setButtonVisible(isVisible);
  };

  return (
    <>
      <section>
        <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
          <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
            Tickets
          </h4>
          <p className="text-base text-white text-center ">
            Scratch the card and get your surprise ticket. Best of Luck
          </p>
        </div>
      </section>
      <section className="my-16">
        <div className="flex justify-between w-11/12 mx-auto">
          <div className="flex flex-col items-center">
            <h6 className="text-theme-light text-lg font-medium">
              Number of Products
            </h6>
            <div className="flex mt-6 ">
              <AddIcon
                fontSize="large"
                onClick={incrementProduct}
                className="bg-theme-gray cursor-pointer rounded-full p-1"
              />
              <span className="text-xl mx-4 text-center w-[60px]">
                {product}
              </span>
              <RemoveIcon
                fontSize="large"
                onClick={decrementProduct}
                className="bg-theme-gray cursor-pointer rounded-full p-1"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h6 className="text-theme-light text-lg font-medium">
              Number of Donations
            </h6>
            <div className="flex mt-6">
              <AddIcon
                fontSize="large"
                onClick={incrementDonation}
                className="bg-theme-gray cursor-pointer rounded-full p-1"
              />
              <span className="text-xl mx-4 text-center w-[60px]">
                {donation}
              </span>
              <RemoveIcon
                fontSize="large"
                onClick={decrementDonation}
                className="bg-theme-gray cursor-pointer rounded-full p-1"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h6 className="text-theme-light text-lg font-medium">
              Number of Tickets
            </h6>
            <span className="text-xl mx-4 mt-6 text-center w-[60px]">
              {ticket}
            </span>
          </div>
        </div>
        <div className="flex justify-start flex-wrap gap-2 w-11/12 mx-auto mt-12">
          {Array.from({ length: product }, (_, index) => (
            <div
              className="slot-box  bg-theme-gray rounded-lg"
              key={index}
              data={data}
            >
              <div className="slot-group">
                {data.map(({ id, label }) => (
                  <div className="slot" key={id}>
                    <input
                      onClick={() => handleCheckboxClick(id)}
                      checked={state.checkedIds.includes(id)}
                      type="checkbox"
                      id={id + index}
                      readOnly
                    />
                    <label htmlFor={id + index}>{label}</label>
                  </div>
                ))}
              </div>
              <div className="actions">
                <input type="checkbox" name="" id="close" readOnly />
                <label className="action" htmlFor="close">
                  <CloseIcon />
                </label>

                <input type="checkbox" name="" id="shuffle" readOnly />
                <label className="action" htmlFor="shuffle">
                  <ShuffleIcon />
                </label>
              </div>
              <div className="message">{message}</div>
            </div>
          ))}
        </div>
        <div className="w-11/12 mx-auto flex justify-end mt-4">
          {buttonVisible && (
            <button
              className="btn-theme-dual font-bold text-white rounded-full py-2 px-20"
              onClick={handleProceedClick}
            >
              Add To Cart
            </button>
          )}
        </div>
      </section>
      <Snackbar
        open={openToast}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        TransitionComponent={Slide}
      />
    </>
  );
}
