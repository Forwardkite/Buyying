const mongoose = require('mongoose');

const lotterySchema = new mongoose.Schema({
    combinedString: {
        type: String,
        required: true}, // Define numbers as an array of strings
        email: String,
});

const lottery = mongoose.model('lottery', lotterySchema);

module.exports = lottery;
