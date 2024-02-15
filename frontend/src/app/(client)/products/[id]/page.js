"use client";
import { useEffect, useState } from "react";
import useAuth from "../../utilis/authUser";

// Mock authentication function, replace with your actual authentication logic
const checkIfAuthenticated = () => {
  // Example: Check if the user is authenticated from your authentication context
  return true; // Replace with your actual authentication check
};

async function getProduct(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/admin/view/${id}`);
  return res.json();
}

function Product({ params }) {
  // useAuth();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn state

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProduct(params.id);
      setProduct(productData);
    };

    fetchData();

    // Check if the user is authenticated when component mounts
    setIsLoggedIn(checkIfAuthenticated());
  }, [params.id]);

  const handleProceed = () => {
    // Check if isLoggedIn is true (i.e., user is authenticated)
    if (isLoggedIn) {
      window.location.href = `/products/${params.id}/ticket-selection`;
      console.log("ALREADY LOGGED IN");
    } else {
      window.location.href = "/login";
      console.log("PLEASE LOG IN");
    }
  };

  return (
    <>
      {product && (
        <>
          <section>
            <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
              <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
                {product.productName}
              </h4>
              <p className="text-base text-white text-center ">
                Scratch the card and get your surprise ticket. Best of Luck
              </p>
            </div>
          </section>
          <section className="py-8 mt-16 mb-8">
            <div className="flex flex-wrap  justify-between w-11/12 mx-auto gap-8">
              <div className="w-6/12">
                <h1>{product.productName}</h1>
                <p>{product.productDiscription}</p>
                <div className="flex justify-between font-bold text-base mt-8">
                  <p className="w-5/12">Price</p>
                  <span>:</span>
                  <p className="w-5/12">Rs {product.productPrice}</p>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <p className="w-5/12">Item Left</p>
                  <span>:</span>
                  <p className="w-5/12">{product.stockNumber}</p>
                </div>
              </div>
              <div className="w-5/12">
                <img
                  src={`${apiUrl}/uploads/${product.imageProduct}`}
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/4 ml-auto">
                <button
                  onClick={handleProceed}
                  className="btn-theme-dual font-bold text-white w-full rounded-full py-4 mt-12"
                >
                  Proceed
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Product;
