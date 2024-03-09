//LotteryDataBase
const mongoose = require('mongoose');

const lotteryModel = new mongoose.Schema({

    combinedString: { type: String, required: true },
    email: String,
    name: String,
    product: String,
    quantity: Number,
    cost: Number,
    date: String,

});

const LotteryDB = mongoose.model('Lottery', lotteryModel);

module.exports = LotteryDB;