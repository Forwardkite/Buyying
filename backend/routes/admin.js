const express = require("express");
const mongoose = require("mongoose");
const connectionDB = require("../config/connection");
const LotteryGenerator = require("../components/LotteryGenerator");
const ProductDB = require("../models/productDB");
const router = express.Router();
const app = express();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
connectionDB();

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

router.get("/", (req, res) => {
  res.render("admin/batch");
});

/*____________________________________PRODUCT_CREATE_______________________________________________*/

const productCreate = require("../controllers/productCreate");

router.post("/create",upload.single("imageProduct"),productCreate.createProduct);

/*_______________________________________PRODUCT_DISPLAY___________________________________________*/

const productDisplay = require("../controllers/productDisplay");

router.get("/view", productDisplay.viewProducts);

router.get('/view/:id', productDisplay.viewProductById);

/*______________________________________PRODUCT_UPDATE______________________________________________*/

const productUpdate = require("../controllers/productUpdate"); // Import the product controller

router.put("/update/:ProId", productUpdate.updateProduct);

/*______________________________________PRODUCT_DELETE______________________________________________*/

const adminController = require("../controllers/productDelete");

router.delete("/delete/:productIdToDelete", adminController.deleteProduct);

/*_______________________________________EXPORT_BUTTON______________________________________________*/

const exportController = require("../controllers/exportController");

router.get("/export", exportController.exportDataAsCSV);

/*_______________________________________SLOT_CREATION______________________________________________*/

const SlotNumbers = require("../controllers/slotNumbers");

router.post("/slot",SlotNumbers.saveSlot);

const SlotValidator = require("../controllers/slotValidatorController");

router.post("/slot-validator",SlotValidator.validator);

/*_________________________________________SLOT_VIEW_________________________________________________*/

const SlotDisplay = require("../controllers/displaySlotData");

router.get("/slot/view",SlotDisplay.displaySlotData);

/*__________________________________________________________________________________________________*/

module.exports = router;
