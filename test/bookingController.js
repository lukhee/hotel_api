const {expect} = require('chai')
const sinon = require('sinon')
const mongoose = require('mongoose')

const bookingController = require('../Controllers/bookingController')
const Booking = require('../Models/BookingSchema')

describe('BookingController-checkrooms', function() {
    // it('Should throw 500 error if DB fails', async function(){
        // sinon.stub(Booking, 'find');
        // Booking.find.throws()

        // const req = {
        //     body: {
        //         no_of_guest: 4
        //     }
        // }
        // try {
        //     const result = await bookingController.checkRooms(req, {}, ()=>{})
        //     console.log(result)
        // } catch (err) {
        //     expect(result).to.have.property('statusCode', 500);
        //     console.log(err)
        //     expect(err).to.throws()
        // }
        // Booking.find.restore()
    // })

});