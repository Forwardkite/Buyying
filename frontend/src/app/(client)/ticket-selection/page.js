"use client";
// pages/index.js
import React, {useState} from "react";
import CheckBoxGroup from "./checkbox"; // Adjust the path accordingly
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function TicketSelection() {
  const data = Array.from({ length: 49 }, (_, i) => ({
    id: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString().padStart(2, "0"),
  }));

  const [product, setProduct] = React.useState(1);
  const [donation, setDonation] = React.useState(0);
  const [continueVisible, setContinueVisible] = useState(false);
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


  const handleProceedClick = () => {
    // Handle proceed action here
    console.log("Proceed clicked");
    // sendSelectedNumbersToBackend(selectedNumbers);
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
        <div className="flex flex-wrap gap-3 w-11/12 mx-auto mt-12">
          {Array.from({ length: product }, (_, index) => (
            <CheckBoxGroup key={index} data={data} handleButtonVisibility={handleButtonVisibility} />
          ))}
        </div>
        <div className="w-11/12 mx-auto flex justify-end mt-4">
        {buttonVisible && (
          <button className="btn-theme-dual font-bold text-white rounded-full py-2 px-4 mt-12" onClick={handleProceedClick}>
            Add To Cart
          </button>
        )}
        </div>
      </section>
    </>
  );
}
