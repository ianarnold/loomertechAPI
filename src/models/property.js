const mongoose = require('../database');

const PropertySchema = new mongoose.Schema({

    zipcode: {
        type: String,
        required: true,
    },
    propertyNumber: {
        type: Number,
        required: true,
    },
    complement: {
        type: String,
        required: true,
    },
    rent_value: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }, 

});



const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;