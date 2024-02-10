"use client";
import React from "react";
import useAuth from "../utilis/authUser";

export default function Cart() {
  useAuth();
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
                <span>01</span>
                <span>31</span>
                <span>22</span>
              </div>
              <div className="ticket">
                <span>01</span>
                <span>31</span>
                <span>29</span>
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
        <div className="flex items-start flex-wrap mb-4 py-8 border-b">
          <div className="flex items-start flex-wrap w-1/2">
            <img
              src="@/../assets/img/pen.png"
              alt=""
              className="rounded-full max-w-[100px] h-auto aspect-square object-cover"
            />
            <div className="details px-8">
              <h6 className="text-2xl font-bold">Pen</h6>
              <p className="text-lg">Quantity: 6</p>
              <p className="text-lg donate donatable">Donation: 2</p>
              <p className="text-lg">Rate: 100</p>
              <p className="text-lg">Total Price: 600</p>
            </div>
          </div>

          <div className="flex w-1/2 justify-start flex-col">
            <div className="ticket-numbers ">
              <h6 className="font-bold w-full">Tickets Selected</h6>
              <div className="ticket">
                <span>01</span>
                <span>31</span>
                <span>22</span>
              </div>
              <div className="ticket">
                <span>01</span>
                <span>31</span>
                <span>29</span>
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
      </div>
    </div>
  );
}
