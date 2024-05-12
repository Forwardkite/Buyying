"use client";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [BannerImage, setBannerImage] = useState(null);

  const [jackpots, setJackpots] = useState([]);
  const [news, setNews] = useState([]);
  const [winners, setWinners] = useState([]);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(""); // To track which form to show
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    date: '',
    description: '',
    image:'',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch data for jackpots
    fetch(`${apiUrl}/admin/api/jackpot/view`)
      .then(response => response.json())
      .then(data => {
        setJackpots(data);
      })
      .catch(error => {
        console.error('Error fetching jackpot data:', error);
      });

    // Fetch data for news
    fetch(`${apiUrl}/admin/api/news/view`)
      .then(response => response.json())
      .then(data => {
        setNews(data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });

    // Fetch data for winners
    fetch(`${apiUrl}/admin/api/winner/view`)
      .then(response => response.json())
      .then(data => {
        setWinners(data);
      })
      .catch(error => {
        console.error('Error fetching winner data:', error);
      });
  }, []);

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

  const handleAddNews = () => {
    setFormType("news");
    setShowModal(true);
  };

  const handleAddJackpot = () => {
    setFormType("jackpot");
    setShowModal(true);
  };

  const handleAddWinner = () => {
    setFormType("winner");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      date: '',
      description: ''
    });
    setSelectedImage(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  
    // Preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Logic to handle form submission based on formType
    console.log('Form submitted:', formData);
  
    // Make sure formType is set
    if (!formType) {
      console.error("Form type is not set.");
      return;
    }
  
    // Create a FormData object to send both form data and image data
    const formDataToSend = new FormData();
    formDataToSend.append('image', selectedFile); // Append the selected image file
    formDataToSend.append('title', formData.title);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('description', formData.description);
  
    // Determine the endpoint based on formType
    let endpoint;
    if (formType === "news") {
      endpoint = `${apiUrl}/admin/api/news`;
    } else if (formType === "jackpot") {
      endpoint = `${apiUrl}/admin/api/jackpot`;
    } else if (formType === "winner") {
      endpoint = `${apiUrl}/admin/api/winner`;
    } else {
      console.error("Invalid form type.");
      return;
    }
  
    // Send the data to the backend API
    fetch(endpoint, {
      method: 'POST',
      body: formDataToSend // Send formDataToSend instead of JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data added successfully:', data);
      // If needed, you can perform additional actions here, like updating state
    })
    .catch(error => {
      console.error('Error adding data:', error);
      // Handle errors appropriately, like showing a message to the user
    });
  
    // Close the modal and reset form data
    handleCloseModal();
  };

  const handleDelete = async (id, category) => {
    if (window.confirm(`Are You Sure Want To Delete ${id}`)) {
      try {
        const response = await fetch(`${apiUrl}/admin/api/${category}/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json(); // Need to await the response.json()
          console.log("Product deleted successfully:", data.message);
          window.location.reload();
        } else {
          console.error("Failed to delete product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  

  const handleEdit = (id, category) => {
    // Implement edit logic here
    console.log(`Editing ${category} with ID ${id}`);
  };

  



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
      <section className="w-full mb-6 ">
        <h5 className="mb-4 font-bold text-xl">Jackpot Table</h5>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Jackpot Data */}
            {jackpots.map((jackpot, index) => (

              <tr key={`jackpot_${index}`}>
                <td className="border px-4 py-2">{jackpot.name}</td>
                <td className="border px-4 py-2">{jackpot.date}</td>
                <td className="border px-4 py-2">{jackpot.description}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(jackpot._id, 'jackpot')} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDelete(jackpot._id, 'jackpot')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
           
          </tbody>
        </table>
      </section>

      <section className="w-full mb-6 ">
        <h5 className="mb-4 font-bold text-xl">Winner Table</h5>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Winner Data */}
            {winners.map((winner, index) => (
              <tr key={`winner_${index}`}>
                <td className="border px-4 py-2">{winner.name}</td>
                <td className="border px-4 py-2">{winner.date}</td>
                <td className="border px-4 py-2">{winner.description}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(winner._id, 'winner')} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDelete(winner._id, 'winner')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="w-full mb-6 ">
        <h5 className="mb-4 font-bold text-xl">News Table</h5>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {/* News Data */}
            {news.map((newsItem, index) => (
              <tr key={`news_${index}`}>
                <td className="border px-4 py-2">{newsItem.name}</td>
                <td className="border px-4 py-2">{newsItem.date}</td>
                <td className="border px-4 py-2">{newsItem.description}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(newsItem._id, 'news')} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDelete(newsItem._id, 'news')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {/* Right Side Buttons */}
        <div className="w-2/6 flex flex-col gap-4">
          <button onClick={handleAddNews} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Add News
          </button>
          <button onClick={handleAddJackpot} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Add Jackpot
          </button>
          <button onClick={handleAddWinner} className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Add Winner
          </button>
        </div>
      </section>
      
      {/* Modal */}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">{formType === "news" ? "Add News" : formType === "jackpot" ? "Add Jackpot" : "Add Winner"}</h2>
            <div className="mb-4">
            
              <div className="input flex flex-col w-1/2 input-image">
                <h6>Product Image</h6>

                <label htmlFor="imgupload">
                  {BannerImage && (
                    <img src={BannerImage} alt="Preview" className=" label-img" />
                  )}
                  <span>Upload Image</span>
                </label>

                <input
                  type="file"
                  className="border"
                  id="imgupload"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input type="text" id="title" name="title" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleCloseModal} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </>
  );
}
