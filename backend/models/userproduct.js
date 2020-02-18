const mongoose = require('mongoose');

let Userproduct = new mongoose.Schema({
    userid: {
        type: String
    },
    buy_amount: {
        type: Number
    },
    productid: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Userproduct', Userproduct);