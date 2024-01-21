import React from "react";

export default function Cart() {
  return (
    <div className="flex mt-12">
      <div className="w-3/4">
        <div className="flex mb-4">
          <img
            src="@/../assets/img/pen.png"
            alt=""
            className="rounded-md max-w-[280px]"
          />
          <div className="details px-8">
            <h6 className="text-2xl font-bold">Pen</h6>
            <p className="text-lg">Quantity: 6</p>
            <p className="text-lg">Rate: 100</p>
            <p className="text-lg">Price: 600</p>
            <div className="flex justify-end">
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
      </div>
    </div>
  );
}
