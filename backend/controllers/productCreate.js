//ProductCreation
const ProductDB = require("../models/productDB");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set unique file name
  },
});

// Set up multer upload
const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
  const {
    productName,
    stockNumber,
    productDiscription,
    productPrice,
    startingDate,
    endingDate,
    imageProduct,
  } = req.body;

  const productData = {
    productName,
    productDiscription,
    stockNumber,
    productPrice,
    startingDate,
    endingDate,
    imageProduct,
    stockLeft: stockNumber,
  };

  try {
    if (req.file) {
      // If a file was uploaded, add its details to the product data
      productData.imageProduct = req.file.filename;
    }

    await ProductDB.create(productData);
    res.status(200).send("Product created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating product CODE:ADMINERROR");
  }
};

module.exports = {
  createProduct,
};
