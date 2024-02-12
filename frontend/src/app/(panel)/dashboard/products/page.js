"use client";

import "./style.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { Message } from "@mui/icons-material";

//_________________________________________________________________________________________________//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

//_________________________________________________________________________________________________//

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [Fetchdata, setData] = useState(null);
  const [productList, setProductList] = useState(Fetchdata);
  const [ProName, SetProname] = useState();
  const [ProPrice, SetProprice] = useState();
  const [ProDis, SetProdis] = useState();
  const [ProNum, SetProNum] = useState();
  const [startDate, SetStartDate] = useState();
  const [endDate, SetEndDate] = useState();
  const [variablePro, SetVariablePro] = useState(false);
  const [ProId, setProId] = useState();
  const [openEditModal, setOpenEditModal] = React.useState(false);
  // const [proImage, SetProImage] = useState();

  const [selectedFile, setSelectedFile] = useState(null);
  const [ProImage, setProImage] = useState(null);

  //_________________________________________________________________________________________________//

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //_________________________________________________________________________________________________//

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  //_________________________________________________________________________________________________//

  const SendingData = {
    productName: ProName,
    stockNumber: ProNum,
    productDiscription: ProDis,
    productPrice: ProPrice,
    startingDate: startDate,
    endingDate: endDate,
    productId: ProId,
    imageProduct: ProImage,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:5000/admin/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(SendingData),
  //     });

  //     if (response.ok) {
  //       console.log("Data sent successfully");
  //       window.location.reload(false);
  //     } else {
  //       console.error("Failed to send data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", ProName);
    formData.append("stockNumber", ProNum);
    formData.append("productDiscription", ProDis);
    formData.append("productPrice", ProPrice);
    formData.append("startingDate", startDate);
    formData.append("endingDate", endDate);
    formData.append("productId", ProId);
    formData.append("imageProduct", selectedFile); // Make sure this matches your backend field name

    try {
      const response = await fetch(`${apiUrl}/admin/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Data sent successfully");
        window.location.reload(false);
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  //_________________________________________________________________________________________________//

  const handleOpenEditing = (data) => {
    // Set the state with the data for editing
    SetProname(data.productName);
    SetProNum(data.stockNumber);
    SetProdis(data.productDiscription);
    SetProprice(data.productPrice);
    SetStartDate(data.startingDate);
    SetEndDate(data.endingDate);
    setProId(data._id);
    // SetProImage(data.proImage);

    // Open the edit modal
    setOpenEditModal(true);
  };
  // close the edit modal
  const handleCloseEditModal = () => setOpenEditModal(false);

  /*_____________________________________________________________________________________________*/

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      productName: ProName,
      stockNumber: ProNum,
      productDiscription: ProDis,
      productPrice: ProPrice,
      startingDate: startDate,
      endingDate: endDate,
    };

    try {
      const response = await fetch(`${apiUrl}/admin/update/${ProId}`, {
        method: "PUT", // or 'POST' depending on your API
        headers: {
          "Content-Type": "application/json",
          // Add any necessary headers like authorization token if needed
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Data updated successfully");
        // Close the edit modal after successful update
        setOpenEditModal(false);
        window.location.reload();
      } else {
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //________________________________________PRODUCT_DELETE___________________________________________//

  const handleDelete = async () => {
    // Check if ProId exists
    if (!ProId) {
      return; // Exit function early if ProId is undefined
    }

    if (window.confirm(`Are You Sure Want To Delete ${ProName}`)) {
      try {
        const response = await fetch(`${apiUrl}/admin/delete/${ProId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Product deleted successfully:", data.message);

          // Fetch and log the updated product list after deletion
          const updatedProductsResponse = await fetch(`${apiUrl}/admin/view`);
          const updatedProducts = await updatedProductsResponse.json();
          console.log("Updated product list:", updatedProducts);
          window.location.reload();
        } else {
          console.error("Failed to delete product:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  //_________________________________________________________________________________________________//

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/view`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="w-full mb-6">
        <div className="flex justify-between">
          <h5 className="mb-4">Products</h5>
          <button
            onClick={handleOpen}
            className="bg-violet-700 text-white py-2 px-4 rounded"
          >
            Add New product
          </button>
        </div>
      </section>
      <section className="flex gap-6">
        <TableContainer className="shadow-md-0-0 rounded-md">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="border-b">
                <TableCell component="th" scope="row">
                  Product
                </TableCell>

                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sale Date</TableCell>
                <TableCell align="right">Stock Left</TableCell>
                <TableCell align="right">Action </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* ................................ */}

              {Fetchdata ? (
                Fetchdata.map((e) => (
                  <TableRow className="border-b">
                    <TableCell component="th" scope="row">
                      {e.imageProduct && (
                        <img
                          src={`${apiUrl}/uploads/${e.imageProduct}`}
                          alt=""
                          className="w-[100px]"
                        />
                      )}
                    </TableCell>
                    <TableCell>{e.productName}</TableCell>
                    <TableCell align="right">₹{e.productPrice}</TableCell>
                    <TableCell align="right">{e.startingDate}</TableCell>
                    <TableCell align="right">{e.stockNumber}</TableCell>
                    <TableCell align="right">
                      <button
                        // onClick={handleOpenEditing}
                        onClick={() => handleOpenEditing(e)}
                        className="px-8 py-2 bg-violet-700 text-white rounded"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p></p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/*____________________________________________ADD_PRODUCT___________________________________________*/}

      <Modal
        className="left-[16.666667%]"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold"
          >
            Add Product
          </Typography>

          <form
            action=""
            className="flex flex-wrap gap-6 text-black"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full gap-x-6">
              <div className="input flex flex-col w-4/6">
                <label htmlFor="" className="">
                  Product Name
                </label>
                <input
                  type="text"
                  className="border"
                  value={ProName}
                  onChange={(e) => SetProname(e.target.value)}
                />
              </div>
              <div className="input flex flex-col w-2/6">
                <label htmlFor="">Item in Stock</label>
                <input
                  type="number"
                  className="border"
                  value={ProNum}
                  onChange={(e) => SetProNum(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6 w-full">
              <div className="input flex flex-col w-1/2 input-image">
                <h6>Product Image</h6>

                <label htmlFor="imgupload">
                  {ProImage && (
                    <img src={ProImage} alt="Preview" className=" label-img" />
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
              <div className="input flex flex-col w-1/2">
                <label htmlFor="">Product Description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="border"
                  value={ProDis}
                  onChange={(e) => SetProdis(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex w-full gap-x-6">
              <div className="flex flex-col w-2/6">
                <div className="input flex flex-col w-full">
                  <label htmlFor="">Starting Date</label>
                  <input
                    type="date"
                    className="border"
                    value={startDate}
                    onChange={(e) => SetStartDate(e.target.value)}
                  />
                </div>
                <div className="input flex flex-col w-full">
                  <label htmlFor="">Ending Date</label>
                  <input
                    type="date"
                    className="border"
                    value={endDate}
                    onChange={(e) => SetEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="input flex flex-col w-2/6">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="border"
                  value={ProPrice}
                  onChange={(e) => SetProprice(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-2/6">
                <span>Donation</span>
                <Switch {...label} />
              </div>
              <div className="flex flex-col w-2/6">
                <span>Variable product</span>
                <Switch {...label} />
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="px-8 py-2 bg-violet-700 rounded-md text-white float-none mx-auto"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/*______________________________________PRODUCT_EDITING_MODAL___________________________________ */}

      <Modal
        className="left-[16.666667%]"
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold"
          >
            Edit Product
          </Typography>

          <form action="" className="flex flex-wrap gap-6 text-black">
            <div className="flex w-full gap-x-6">
              <div className="input flex flex-col w-4/6">
                <label htmlFor="" className="">
                  Product Name
                </label>
                <input
                  type="text"
                  className="border"
                  value={ProName}
                  onChange={(e) => SetProname(e.target.value)}
                />
              </div>
              <div className="input flex flex-col w-2/6">
                <label htmlFor="">Item in Stock</label>
                <input
                  type="number"
                  className="border"
                  value={ProNum}
                  onChange={(e) => SetProNum(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6 w-full">
              <div className="input flex flex-col w-1/2 input-image">
                <h6>Product Image</h6>
                <label htmlFor="imgupload">
                  {ProImage && (
                    <img src={ProImage} alt="Preview" className=" label-img" />
                  )}

                  <span>Upload Image</span>
                </label>
                <input type="file" className="border" id="imgupload" />
              </div>
              <div className="input flex flex-col w-1/2">
                <label htmlFor="">Product Description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="border"
                  value={ProDis}
                  onChange={(e) => SetProdis(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex w-full gap-x-6">
              <div className="flex flex-col w-2/6">
                <div className="input flex flex-col w-full">
                  <label htmlFor="">Start Date</label>
                  <input
                    type="date"
                    className="border"
                    value={startDate}
                    onChange={(e) => SetStartDate(e.target.value)}
                  />
                </div>
                <div className="input flex flex-col w-full">
                  <label htmlFor="">End Date</label>
                  <input
                    type="date"
                    className="border"
                    value={endDate}
                    onChange={(e) => SetEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="input flex flex-col w-2/6">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="border"
                  value={ProPrice}
                  onChange={(e) => SetProprice(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-2/6">
                <span>Donation</span>
                <Switch {...label} />
              </div>
              <div className="flex flex-col w-2/6">
                <span>Variable product</span>
                <Switch {...label} />
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="button"
                onClick={() => handleDelete()}
                className="px-8 py-2 bg-red-700 rounded-md text-white float-none mx-auto"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={handleEditSubmit}
                className="px-8 py-2 bg-violet-700 rounded-md text-white float-none mx-auto"
              >
                Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
