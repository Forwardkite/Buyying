"use client";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CloseIcon from "@mui/icons-material/Close";

export default function Tickets() {
  const [slot, setSlot] = React.useState([]);
  const [product, setProduct] = React.useState(1);
  const [donation, setDonation] = React.useState(0);
  const ticket = product + donation;

  const incrementProduct = () => {
    if (product < 100) {
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

  const handleButtonToggle = (value) => {
    // If the selectedButtons array already contains the value, remove it
    if (slot.includes(value)) {
      setSlot(slot.filter((button) => button !== value));
    } else {
      // If the selectedButtons array has fewer than 3 values, add the new value
      if (slot.length < 3) {
        setSlot([...slot, value]);
      }
    }
  };
  console.log("Selected Buttons:", slot);

  var checks = document.querySelectorAll(".slot>input");
  var max = 3;
  for (var i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;

  function selectiveCheck(event) {
    var checkedChecks = document.querySelectorAll(".slot>input:checked");
    if (checkedChecks.length >= max + 1) return false;
  }
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
      <section className="my-16 ">
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
        <div className="flex justify-between gap-4 w-11/12 mx-auto mt-12">
          <div className="slot-box bg-theme-gray rounded-lg">
            <div
              value={slot}
              onChange={(_, value) => handleButtonToggle(value)}
              className="slot-group "
            >
              <div className="slot">
                <input type="checkbox" name="" id="01" />
                <label htmlFor="01">01</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="02" />
                <label htmlFor="02">02</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="03" />
                <label htmlFor="03">03</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="04" />
                <label htmlFor="04">04</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="05" />
                <label htmlFor="05">05</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="06" />
                <label htmlFor="06">06</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="07" />
                <label htmlFor="07">07</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="08" />
                <label htmlFor="08">08</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="09" />
                <label htmlFor="09">09</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="10" />
                <label htmlFor="10">10</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="11" />
                <label htmlFor="11">11</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="12" />
                <label htmlFor="12">12</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="13" />
                <label htmlFor="13">13</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="14" />
                <label htmlFor="14">14</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="15" />
                <label htmlFor="15">15</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="16" />
                <label htmlFor="16">16</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="17" />
                <label htmlFor="17">17</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="18" />
                <label htmlFor="18">18</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="19" />
                <label htmlFor="19">19</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="20" />
                <label htmlFor="20">20</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="21" />
                <label htmlFor="21">21</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="22" />
                <label htmlFor="22">22</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="23" />
                <label htmlFor="23">23</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="24" />
                <label htmlFor="24">24</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="25" />
                <label htmlFor="25">25</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="26" />
                <label htmlFor="26">26</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="27" />
                <label htmlFor="27">27</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="28" />
                <label htmlFor="28">28</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="29" />
                <label htmlFor="29">29</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="30" />
                <label htmlFor="30">30</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="31" />
                <label htmlFor="31">31</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="32" />
                <label htmlFor="32">32</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="33" />
                <label htmlFor="33">33</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="34" />
                <label htmlFor="34">34</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="35" />
                <label htmlFor="35">35</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="36" />
                <label htmlFor="36">36</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="37" />
                <label htmlFor="37">37</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="38" />
                <label htmlFor="38">38</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="39" />
                <label htmlFor="39">39</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="40" />
                <label htmlFor="40">40</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="41" />
                <label htmlFor="41">41</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="42" />
                <label htmlFor="42">42</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="43" />
                <label htmlFor="43">43</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="44" />
                <label htmlFor="44">44</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="45" />
                <label htmlFor="45">45</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="46" />
                <label htmlFor="46">46</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="47" />
                <label htmlFor="47">47</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="48" />
                <label htmlFor="48">48</label>
              </div>
              <div className="slot">
                <input type="checkbox" name="" id="49" />
                <label htmlFor="49">49</label>
              </div>
            </div>
            <div className="actions">
              <input type="checkbox" name="" id="close" />
              <label className="action" htmlFor="close">
                <CloseIcon />
              </label>

              <input type="checkbox" name="" id="shuffle" />
              <label className="action" htmlFor="shuffle">
                <ShuffleIcon />
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
