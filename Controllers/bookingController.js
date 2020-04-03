const Booking = require('../Models/BookingSchema')
const Package = require('../Models/PackageSchema')
const io = require('../socketIo')
const { validationResult } = require('express-validator')
const randomstring = require("randomstring");

// @desc check if rooms are available with the number of guest
exports.checkRooms = async (req, res, next)=> {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        gender,
        no_of_guest,
        no_of_night,
        check_in_date,
        check_out_date
    } = req.body  

    // create request object
    let requestDataObj = { 
        no_of_guest,
        no_of_night,
        check_in_date,
        check_out_date
    }
    // check if gender is sent
    if(gender) requestDataObj.gender = gender
    
    try {
        let query
        if(no_of_guest >= 4){
            query =  {$gte : 4}
        } else {
            query =  {$lte : 4}
        }

        const packages = await Package.find({no_of_beds: query})

        res.json({request_data : requestDataObj, rooms: packages})
        return 

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Down')
        return error
    }
}


// @Desc  Book a room
exports.bookRoom = async (req, res, next) => {
    const {
        request_data: { no_of_guest, check_in_date, check_out_date, no_of_night }, package_id
    } = req.body
    const guest_Id = randomstring.generate(7)

    const bookingObj = { package_id, guest_Id, no_of_guest, no_of_night, check_in_date, check_out_date  }
    const booking = new Booking(bookingObj)

    try {
        await booking.save()
        // Emit event to all connected user
        io.getIO().emit('Booking', {action: "A room have been booked", data: booking})

        res.json({booking: booking, msg: "Request Successfull"})
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Down')
    }
}

// @Desc  check all booked rooms
exports.checkBookings = async (req, res, next) => {
    try {
        const bookedRooms = await Booking.find()
        res.json(bookedRooms)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Down')
    }
}

exports.checkBookedById = async (req, res, next) => {
        // check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
    try {
        const booked = await Booking.findOne({guest_Id: req.body.booking_id})
        if(!booked) return res.status(400).json({error: [{msg: "Booking-ID not Found"}]})

        res.json(booked)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Down')
    }
}