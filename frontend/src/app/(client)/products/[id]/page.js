"use client";
import { useEffect, useState } from "react";
import useAuth from "../../utilis/authUser";
import Image from "next/image";

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
      console.log("THIS IS IT:", productData)
    };

    fetchData();

    // Check if the user is authenticated when component mounts
    setIsLoggedIn(checkIfAuthenticated());
  }, [params.id]);



  const handleProceed = () => {
    // Check if isLoggedIn is true (i.e., user is authenticated)
    if (isLoggedIn) {
      const currentURL = window.location.href;
      const newURL = currentURL + '/ticket-selection';
      window.location.href = newURL;
    } else {
      window.location.href = "/login";
      console.log("PLEASE LOG IN");
    }
  };

  return (
    <>
      {product && (
        <>
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="text-center">
              </div>
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img src={`${apiUrl}/uploads/${product.imageProduct}`} alt={product.productName} className="w-full rounded-lg" />
                </div>
                <div>
                  <div className="text-3xl font-semibold text-gray-800 mb-4">{product.productName}</div>
                  <div className="text-sm text-gray-600">{product.shortDescription} </div>
                  <div style={{ height: '10px' }}></div>
                  <div className="w-5/5 mx-auto border-b-2 border-gray-300 mb-4"></div>

                  <div className="flex justify-between mb-2">

                    <span className="text-3xl font-bold text-gray-800">₹{product.productPrice}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Inclusive of all taxes</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    
                  <span className="text-sm font-semibold">Hurry Up! Only {product.stockNumber} Left</span>
                  </div>
                  <button onClick={handleProceed} className="btn-theme-dual text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 transition duration-300">Proceed to Buy</button>

                  <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
                  <p className="text-sm text-gray-600">{product.productDetails}</p>
                </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default Product;
