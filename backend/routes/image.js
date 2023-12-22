const express = require('express');
const multer = require('multer');
const Image = require('../models/imageDB'); // Replace with your image model
const router = express.Router();



// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET route to render the form page for image upload
router.get('/', (req, res) => {
  res.render('uploadImage'); // Assuming 'uploadImage.hbs' is your form page
});

// POST route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer, mimetype } = req.file;
    
    // Save image details to MongoDB using your Image model
    await Image.create({
      filename: originalname,
      data: buffer,
      contentType: mimetype
    });
    
    res.redirect('/images'); // Redirect to page showing uploaded images
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
});

router.get('/images', async (req, res) => {
    try {
      // Fetch all images from MongoDB using your Image model
      const images = await Image.find({});
      res.render('imageGallery', { images }); // Assuming 'imageGallery.hbs' is your image gallery page
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching images');
    }
  });

module.exports = router;
