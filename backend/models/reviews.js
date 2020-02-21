const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    username: {
        type: String
    },
    productid: {
        type: String
    },
    vendorid: {
        type: String
    },
    review: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', Review);