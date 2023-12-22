const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abhinavshyjupc:97fvTcy1zllzpUcY@cluster0.0j5pjr2.mongodb.net/?retryWrites=true&w=majority', {
        });

        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};


module.exports = connectionDB;


// 97fvTcy1zllzpUcY