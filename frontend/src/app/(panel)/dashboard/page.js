"use client";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  const [products, setProducts] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch products data from the API
    fetch(`${apiUrl}/admin/view`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log('Fetched products:', data); // Log fetched products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  return (
    <>
      <section className="w-full mb-6">
  <h5 className="mb-4 font-bold text-xl">Stock Left</h5>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {products.map((product, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full">
        <div className="p-6"> 
          <h6 className="text-lg font-semibold mb-4 text-gray-800">{product.productName}</h6>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Stock: {product.stockLeft}</span>
            <span>Left: {product.stockNumber}</span>
          </div>
          <div className="mt-400 h-2  bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(product.stockNumber / product.stockLeft) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>









      <section className="flex gap-6">
        <div className="w-4/6">
          <div className="p-4 h-[40rem] shadow-0-0 rounded-md">
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-full"></div>
          </div>
        </div>
        <div className="w-2/6">
          <div className="p-4 h-[40rem] shadow-0-0 rounded-md flex flex-col gap-6">
            <h6 className="font-bold">Banners</h6>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/banner.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/pen.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/biryani.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/tshirt.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
