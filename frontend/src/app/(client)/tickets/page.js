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
      if (slot.length < 3 && slot.includes(value)) {
        setSlot([...slot, value]);
      }
    }
  };
  console.log("Selected Buttons:", slot);

  return (
    <>
      <section>
        <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
          <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
            Pen
          </h4>
          <p className="text-base text-white text-center ">
            Scratch the card and get your surprise ticket. Best of Luck
          </p>
        </div>
      </section>
      <section className="py-8 mt-16 mb-8">
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
      <section className="mb-16">
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
            <ToggleButtonGroup
              value={slot}
              onChange={(_, value) => handleButtonToggle(value)}
              aria-label="slot"
              size="large"
              className="slot-group "
            >
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
              <ToggleButton value="07" className="slot" size="medium">
                <span>07</span>
              </ToggleButton>
              <ToggleButton value="08" className="slot" size="medium">
                <span>08</span>
              </ToggleButton>
              <ToggleButton value="09" className="slot" size="medium">
                <span>09</span>
              </ToggleButton>
              <ToggleButton value="10" className="slot" size="medium">
                <span>10</span>
              </ToggleButton>
              <ToggleButton value="11" className="slot" size="medium">
                <span>11</span>
              </ToggleButton>
              <ToggleButton value="12" className="slot" size="medium">
                <span>12</span>
              </ToggleButton>
              <ToggleButton value="13" className="slot" size="medium">
                <span>13</span>
              </ToggleButton>
              <ToggleButton value="14" className="slot" size="medium">
                <span>14</span>
              </ToggleButton>
              <ToggleButton value="15" className="slot" size="medium">
                <span>15</span>
              </ToggleButton>
              <ToggleButton value="16" className="slot" size="medium">
                <span>16</span>
              </ToggleButton>
              <ToggleButton value="17" className="slot" size="medium">
                <span>17</span>
              </ToggleButton>
              <ToggleButton value="18" className="slot" size="medium">
                <span>18</span>
              </ToggleButton>
              <ToggleButton value="19" className="slot" size="medium">
                <span>19</span>
              </ToggleButton>
              <ToggleButton value="20" className="slot" size="medium">
                <span>20</span>
              </ToggleButton>
              <ToggleButton value="21" className="slot" size="medium">
                <span>21</span>
              </ToggleButton>
              <ToggleButton value="22" className="slot" size="medium">
                <span>22</span>
              </ToggleButton>
              <ToggleButton value="23" className="slot" size="medium">
                <span>23</span>
              </ToggleButton>
              <ToggleButton value="24" className="slot" size="medium">
                <span>24</span>
              </ToggleButton>
              <ToggleButton value="25" className="slot" size="medium">
                <span>25</span>
              </ToggleButton>
              <ToggleButton value="26" className="slot" size="medium">
                <span>26</span>
              </ToggleButton>
              <ToggleButton value="27" className="slot" size="medium">
                <span>27</span>
              </ToggleButton>
              <ToggleButton value="28" className="slot" size="medium">
                <span>28</span>
              </ToggleButton>
              <ToggleButton value="29" className="slot" size="medium">
                <span>29</span>
              </ToggleButton>
              <ToggleButton value="30" className="slot" size="medium">
                <span>30</span>
              </ToggleButton>
              <ToggleButton value="31" className="slot" size="medium">
                <span>31</span>
              </ToggleButton>
              <ToggleButton value="32" className="slot" size="medium">
                <span>32</span>
              </ToggleButton>
              <ToggleButton value="33" className="slot" size="medium">
                <span>33</span>
              </ToggleButton>
              <ToggleButton value="34" className="slot" size="medium">
                <span>34</span>
              </ToggleButton>
              <ToggleButton value="35" className="slot" size="medium">
                <span>35</span>
              </ToggleButton>
              <ToggleButton value="36" className="slot" size="medium">
                <span>36</span>
              </ToggleButton>
              <ToggleButton value="37" className="slot" size="medium">
                <span>37</span>
              </ToggleButton>
              <ToggleButton value="38" className="slot" size="medium">
                <span>38</span>
              </ToggleButton>
              <ToggleButton value="39" className="slot" size="medium">
                <span>39</span>
              </ToggleButton>

              <ToggleButton value="40" className="slot" size="medium">
                <span>40</span>
              </ToggleButton>
              <ToggleButton value="41" className="slot" size="medium">
                <span>41</span>
              </ToggleButton>
              <ToggleButton value="42" className="slot" size="medium">
                <span>42</span>
              </ToggleButton>
              <ToggleButton value="43" className="slot" size="medium">
                <span>43</span>
              </ToggleButton>
              <ToggleButton value="44" className="slot" size="medium">
                <span>44</span>
              </ToggleButton>
              <ToggleButton value="45" className="slot" size="medium">
                <span>45</span>
              </ToggleButton>
              <ToggleButton value="46" className="slot" size="medium">
                <span>46</span>
              </ToggleButton>
              <ToggleButton value="47" className="slot" size="medium">
                <span>47</span>
              </ToggleButton>
              <ToggleButton value="48" className="slot" size="medium">
                <span>48</span>
              </ToggleButton>
              <ToggleButton value="49" className="slot" size="medium">
                <span>49</span>
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="actions">
              <input type="checkbox" name="" id="close" />
              <label className="action" for="close">
                <CloseIcon />
              </label>

              <input type="checkbox" name="" id="shuffle" />
              <label className="action" for="shuffle">
                <ShuffleIcon />
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
