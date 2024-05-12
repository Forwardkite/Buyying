const WinnerDB = require("../models/winnerDB");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/winner"); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Set unique file name
    },
  });

const upload = multer({ storage: storage });

const createWinner = async (req, res) => {
        console.log('Damn', req.body); // Log the request body
      
  const { title, description, date, image } = req.body;

  const winnerData = {
    name:title,
    description,
    date,
    image,
  };

  try {
    if (req.file) {
      winnerData.image = req.file.filename;
    }

    await WinnerDB.create(winnerData);
    res.status(200).send("Winner created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating winner");
  }
};

module.exports = {
  createWinner,
  upload,
};
