const express = require("express");
const connectionDB = require("../config/connection");
const router = express.Router();
const app = express();
const multer = require("multer");
connectionDB();
const deleteExpiredProducts = require ("../controllers/deleteExpiredProducts")
deleteExpiredProducts();

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

/*_______________________________________PRODUCT_CREATE__________________________________________*/

const productCreate = require("../controllers/productCreate");

router.post(
  "/create",
  upload.single("imageProduct"),
  productCreate.createProduct
);

/*_______________________________________PRODUCT_DISPLAY___________________________________________*/

const productDisplay = require("../controllers/productDisplay");

router.get("/view", productDisplay.viewProducts); //display products

router.get("/view/:id", productDisplay.viewProductById); //display product by id

/*______________________________________PRODUCT_UPDATE______________________________________________*/

const productUpdate = require("../controllers/productUpdate");

router.put("/update/:ProId", productUpdate.updateProduct);

/*______________________________________PRODUCT_DELETE______________________________________________*/

const adminController = require("../controllers/productDelete");

router.delete("/delete/:productIdToDelete", adminController.deleteProduct);

/*_______________________________________EXPORT_BUTTON______________________________________________*/

const exportController = require("../controllers/exportController");

router.get("/export", exportController.exportDataAsCSV);

/*_______________________________________SLOT_CREATION______________________________________________*/

const SlotNumbers = require("../controllers/slotNumbers");

router.post("/slot", SlotNumbers.saveSlot);

/*_______________________________________SLOT_VALIDATION________________________________________________*/

const SlotValidator = require("../controllers/slotValidatorController");

router.post("/slot/check", SlotValidator.checkNumberCombination);

/*_________________________________________SLOT_VIEW_________________________________________________*/

const SlotDisplay = require("../controllers/displaySlotData");

router.get("/slot/view", SlotDisplay.displaySlotData);

/*________________________________________USER_DISPLAY_______________________________________________*/

const UserDisplay = require("../controllers/displayUserData");

router.get("/user/view", UserDisplay.displayUserData);

router.get("/user/view/:id", UserDisplay.displayUserDataById);

/*__________________________________________ORDER_DISPLAY_____________________________________________*/

const PurchaseDisplay = require("../controllers/displayPaymentOrder");

router.get("/order/view", PurchaseDisplay.displayPurchaseData);

/*____________________________________REGISTRATION_EMAIL_CHECKER________________________________________*/

const registrationEmailChecker = require("../controllers/registrationEmailChecker");

router.post("/check/details", registrationEmailChecker.checkEmailDuplication);


/*____________________________________REGISTRATION_PHONE_CHECKER________________________________________*/

const registrationPhoneChecker = require("../controllers/registrationPhoneChecker");

router.post("/check/phone", registrationPhoneChecker.checkPhoneDuplication);

/*______________________________________________SMS_API______________________________________________*/

const loginOtpApi = require("../controllers/loginOtpApi");

router.post("/api/send-otp", loginOtpApi.sendOTP);

/*_________________________________________SMS_VERIFICATION_API_______________________________________*/

const loginVerifyOtp = require("../controllers/loginOtpApi");

router.post("/api/verify-otp", loginVerifyOtp.verifyOTP);

/*___________________________________________SMS_RESEND_API_______________________________________*/

const loginResendOtp = require ("../controllers/loginOtpApi");

router.post("api/resend-otp", loginResendOtp.resendOTP)

/*__________________________________________________________________________________________________*/

module.exports = router;
