const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    avg_review: {
        type: Number,
        default: 0
    },
    no_of_reviews: {
        type: Number,
        default: 0.0
    },
    time: {
        type: Date,
        default: Date.now
    }
});

User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);