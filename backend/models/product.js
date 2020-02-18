const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name: {
        type: String
    },
    cost: {
        type: Number
    },
    total_amount: {
        type: Number
    },
    avail_amount: {
        type: Number
    },
    isDispatched: {
        type: String
    },
    userid: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', Product);