// components/ShoppingCart.js
import React from "react";
import useAuth from "../utilis/authUser";

const ShoppingCart = () => {
  //user authentication middleware
  useAuth();
  return (
    <div className="container">
      <div className="title">Shopping Cart</div>
      <div className="cart-icons">
        {[1, 2, 3, 4, 5].map((number) => (
          <div key={number} className="cart-icon">
            {number.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default ShoppingCart;
