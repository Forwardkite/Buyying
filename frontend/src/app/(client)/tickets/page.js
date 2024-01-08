"use client";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function Tickets() {
  const [slot, setSlot] = React.useState(null);
  const [product, setProduct] = React.useState(1);
  const [donation, setDonation] = React.useState(0);
  const ticket = product + donation;

  const handleSlot = (event, newSlot) => {
    setSlot(newSlot);
  };

  return (
    <>
      <section className="py-8">
        <div className="flex items-center w-11/12 mx-auto gap-x-8">
          <div className="w-1/2">
            <h1>Excited to win</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. A porta euismod a non eu
              donec duis. Quam risus amet malesuada tincidunt egestas vitae.
            </p>
          </div>
          <div className="w-1/2">
            <img
              src="../../../../assets/img/pen.png"
              alt=""
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-between w-11/12 mx-auto">
          <div className="flex flex-col items-center">
            <h6>Number of Products</h6>
            <div className="flex mt-6">
              <AddCircleIcon
                fontSize="large"
                onClick={() => setProduct(product + 1)}
              />
              <span className="text-2xl mx-4">{product}</span>
              <RemoveCircleIcon
                fontSize="large"
                onClick={() => setProduct(product - 1)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h6>Number of Donations</h6>
            <div className="flex mt-6">
              <AddCircleIcon
                fontSize="large"
                onClick={() => setDonation(donation + 1)}
              />
              <span className="text-2xl mx-4">{donation}</span>
              <RemoveCircleIcon
                fontSize="large"
                onClick={() => setDonation(donation - 1)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h6>Number of Tickets</h6>
            <span className="text-2xl mx-4 mt-6">{ticket}</span>
          </div>
        </div>
        <div className="flex justify-between w-11/12 mx-auto mt-12">
          <div className="slot-box">
            <ToggleButtonGroup
              value={slot}
              exclusive
              onChange={handleSlot}
              aria-label="slot"
              size="large"
              className="slot-group"
            >
              <ToggleButton value="00" className="slot" size="medium">
                <span>00</span>
              </ToggleButton>
              <ToggleButton value="01" className="slot" size="medium">
                <span>01</span>
              </ToggleButton>
              <ToggleButton value="02" className="slot" size="medium">
                <span>02</span>
              </ToggleButton>
              <ToggleButton value="03" className="slot" size="medium">
                <span>03</span>
              </ToggleButton>
              <ToggleButton value="04" className="slot" size="medium">
                <span>04</span>
              </ToggleButton>
              <ToggleButton value="05" className="slot" size="medium">
                <span>05</span>
              </ToggleButton>
              <ToggleButton value="06" className="slot" size="medium">
                <span>06</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="1" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="2" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="3" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="4" className="slot" size="medium">
                <span>1</span>
              </ToggleButton>
              <ToggleButton value="95" className="slot" size="medium">
                <span>95</span>
              </ToggleButton>
              <ToggleButton value="96" className="slot" size="medium">
                <span>96</span>
              </ToggleButton>
              <ToggleButton value="97" className="slot" size="medium">
                <span>97</span>
              </ToggleButton>
              <ToggleButton value="98" className="slot" size="medium">
                <span>98</span>
              </ToggleButton>
              <ToggleButton value="99" className="slot" size="medium">
                <span>99</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </section>
    </>
  );
}
