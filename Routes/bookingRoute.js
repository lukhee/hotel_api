const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const bookingController = require('../controllers/bookingController')


// @create POST api/booking
// @desc   Create Package
// @access public
router.post('/', [
        check('no_of_guest', 'number of guest field is required').not().isEmpty(),
        check('check_in_date', 'check_in_date field is required').not().isEmpty(),
        check('check_out_date', 'check_out_date field is required').not().isEmpty(),
], bookingController.checkRooms)

// @create POST api/booking/room_request
// @desc   Create Booking
// @access public
router.post('/room_request', bookingController.bookRoom)

// @create GET api/booking/room_request
// @desc   Check all Booking
// @access Private/authentcation required
router.get('/booked_rooms', bookingController.checkBookings)

// @create POST api/booking/booked_id
// @desc   Check all Booking
// @access public
router.post('/booked_id',[
        check('booking_id', 'Please Attach the booking Id').not().isEmpty()],
        bookingController.checkBookedById)

module.exports = router 