const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    },
    guest_Id: {
        type: String,
    },
    no_of_guest: {
        type: Number,
        required: true,
    },
    no_of_night: {
        type: Number
    },
    check_in_date: {
        type: Date,
        required: true,
    },
    check_out_date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = Booking = mongoose.model('booking ', BookingSchema )
