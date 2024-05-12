const JackpotDB = require("../models/jackpotDB");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/jackpot"); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set unique file name
  },
});

const upload = multer({ storage: storage });

const createJackpot = async (req, res) => {
  const { title, description, date, image } = req.body;

  const jackpotData = {
    name:title,
    description,
    date,
    image,
  };

  try {
    if (req.file) {
      jackpotData.image = req.file.filename;
    }

    await JackpotDB.create(jackpotData);
    res.status(200).send("Jackpot created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating jackpot");
  }
};

module.exports = {
  createJackpot,
  upload,
};
