const NewsDB = require("../models/newsDB");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/news"); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Set unique file name
    },
  });

const upload = multer({ storage: storage });

const createNews = async (req, res) => {
  const { title, date, description, image } = req.body;

  const newsData = {
    name:title,
    date,
    description,
    image,
  };

  try {
    if (req.file) {
      newsData.image = req.file.filename;
    }

    await NewsDB.create(newsData);
    res.status(200).send("News created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating news");
  }
};

module.exports = {
  createNews,
  upload,
};
