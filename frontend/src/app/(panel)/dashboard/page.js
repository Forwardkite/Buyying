"use client";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  const [products, setProducts] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [showForm, setShowForm] = useState(false);
  const [bannerData, setBannerData] = useState({
    image: '',
    title: '',
    description: '',
    winningDate: '',
    expiryDate: ''
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData({
      ...bannerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, for example, send data to the server
    console.log('Submitted data:', bannerData);
    // Reset form data
    setBannerData({
      image: '',
      title: '',
      description: '',
      winningDate: '',
      expiryDate: ''
    });
    // Close the form after submission
    setShowForm(false);
  };

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
      <section className="w-full mb-6 ">
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
          <div className="mt-400 h-2  bg-blue-200 rounded-full overflow-hidden ">
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


 {/* Button to toggle the form */}
 <button onClick={toggleForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {showForm ? 'Close Form' : 'Ad Banner'}
      </button>

      {/* Form for adding ad banner */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
            <input type="text" id="image" name="image" value={bannerData.image} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title Name:</label>
            <input type="text" id="title" name="title" value={bannerData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="description" name="description" value={bannerData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="winningDate" className="block text-gray-700 font-bold mb-2">Winning Date:</label>
            <input type="date" id="winningDate" name="winningDate" value={bannerData.winningDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 font-bold mb-2">Ad Expiry Date:</label>
            <input type="date" id="expiryDate" name="expiryDate" value={bannerData.expiryDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save and Run Live
          </button>
        </form>
      )}








      <section className="flex gap-6">
        <div className="w-4/6">
          <div className="p-4 h-[40rem] shadow-0-0 rounded-md">
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-full"></div>
          </div>
        </div>
      </section>
    </>
  );
}
