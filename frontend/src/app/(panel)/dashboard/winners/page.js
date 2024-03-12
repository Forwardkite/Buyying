"use client";

import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import TextField from "@mui/material/TextField";

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




export default function Winners() {
  const [sort, setSort] = React.useState("");
  const [lotteryData, setLotteryData] = useState([]);
  
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  // Function to download CSV
  const downloadCSV = () => {
    let csvContent = "Token,Name,Email,Date,Product,Quantity,Price,Action\n";
  
    // Add table data
    lotteryData.forEach((item) => {
      csvContent += `${item.combinedString},${item.name},${item.email},${item.date},${item.product},${item.quantity},₹${item.cost}/-,\n`;
    });
  
    // Create a Blob and initiate download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lottery_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  useEffect(() => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/lottery`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLotteryData(data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-full ">
        <div className="flex justify-between items-center">
          <h5 className="mb-4 font-bold">
            Winners<span> - Contest Name</span>
          </h5>
        </div>
      </section>
      <section className="flex flex-col  gap-6 h-[98%] pb-4">
        <div className="flex items-center justify-between">
          <div className="flex justify-between">
            <Box component="form" sx={{}} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                className="border px-4 py-4 mr-4  rounded"
                InputLabelProps={{
                  style: { color: "#6d28d9" },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 160, marginRight: 4 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="text-violet-700 border-violet-700"
                >
                  Active Contest
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="sort"
                  onChange={handleChange}
                  className="border"
                >
                  <MenuItem value={"az"}>A - Z</MenuItem>
                  <MenuItem value={"za"}>Z - A</MenuItem>
                  <MenuItem value={"product"}>Product</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 160, marginRight: 4 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="text-violet-700 border-violet-700"
                >
                  Inactive Contest
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="sort"
                  onChange={handleChange}
                  className="border"
                >
                  <MenuItem value={"az"}>A - Z</MenuItem>
                  <MenuItem value={"za"}>Z - A</MenuItem>
                  <MenuItem value={"product"}>Product</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 160, marginRight: 4 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="text-violet-700 border-violet-700"
                >
                  All Winners
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="sort"
                  onChange={handleChange}
                  className="border"
                >
                  <MenuItem value={"az"}>A - Z</MenuItem>
                  <MenuItem value={"za"}>Z - A</MenuItem>
                  <MenuItem value={"product"}>Product</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <button className="px-4 py-2 bg-violet-700 text-white rounded-md flex" onClick={downloadCSV}>
            <span className="mr-2">Export</span>
          </button>
          <button className="px-4 py-2 bg-violet-700 text-white rounded-md flex">
            <span className="mr-2">Select Winner</span> <EmojiEventsIcon />
          </button>
        </div>
        <TableContainer className="shadow-md-0-0 rounded-md">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="border-b">
                <TableCell>Token String</TableCell>
                <TableCell >Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Product</TableCell>
                <TableCell >Quantity</TableCell>
                <TableCell >Price</TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lotteryData.map((item) => (
                <TableRow key={item._id} className="border-b">
                  <TableCell>{item.combinedString}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.cost}/-</TableCell>
                  <TableCell>More Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
}
