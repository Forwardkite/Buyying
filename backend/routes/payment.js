//paymentGateway Integration API
const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const payment = require("../models/transactionsPayment")

// create order
router.post('/orders', async (req, res) => {
  
    const {name, productName, amount} = req.body; // Log the request JSON
    const instance = new Razorpay({ key_id:process.env.KEY_ID, key_secret:process.env.KEY_SECRET })

   const order = await instance.orders.create({
    amount:amount,
    currency:"INR"
   })

   await payment.create({
    order_id:order.id,
    name:name,
    amount:amount
   })

   

   console.log({order}) 
   res.json({order})
});


//payment verification checking
router.post("/payment-verify", async(req,res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sha = crypto.createHmac("sha256", process.env.KEY_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");


        if (digest == razorpay_signature) {

            res.status(200).json({ message: "Payment Verified Successfully"});
            
        } else {
            return res.status(400).json({ message: "Invalid Signature Error!"});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error!"});
        
    }
})

module.exports = router;