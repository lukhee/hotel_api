const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    genders: {
        type: String,
        required: true,
    },
    no_of_beds: {
        type: String,
        required: true,
    }, 
    bed_type: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Package = mongoose.model('package', PackageSchema )