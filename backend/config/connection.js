// const mongoose = require("mongoose");

// const connectionDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI,
//       {}
//     );

//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

// module.exports = connectionDB;

const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const connectionDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI, // Use environment variable for connection URL
      {}
    );

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectionDB;


// 97fvTcy1zllzpUcY
// I7nfqAXi6kTt518y
// 0WnAhdaletmY6FAF
// XORJNaCZ0pM63gJU
// VDQ0UXJE8kPVFl8s
//mongodb+srv://sreeraj:jsusZU6OJsLzpYVO@cluster0.wdcchv9.mongodb.net/?retryWrites=true&w=majority//
// mongodb+srv://sreerajmack7:VDQ0UXJE8kPVFl8s@cluster0.w9rwknn.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://abhinavshyjupc:97fvTcy1zllzpUcY@cluster0.0j5pjr2.mongodb.net/?retryWrites=true&w=majority
