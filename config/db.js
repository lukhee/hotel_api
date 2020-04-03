const mongoose = require('mongoose')
const config = require('config')
const Booking = require('../Models/BookingSchema')
const db = config.get('mongoURI')

const connectDB = async ()=> {
    try {
        await mongoose.connect(db, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('mongodb connected ...')
    } catch(err) {
        console.error(err.message)
        // exit process on failure
        process.exit(1);
    }
}

module.exports = connectDB