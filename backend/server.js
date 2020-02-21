const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Userproduct = require('./models/userproduct');
let Review = require('./models/reviews');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the reviews
userRoutes.route('/reviews/get').post(function (req, res) {
    Review.find({ productid: req.body.productid }, function (err, reviews) {
        if (err) {
            console.log(err);
        } else {
            res.json(reviews);
        }
    });
});

// Getting all the vendors
userRoutes.route('/vendors').get(function (req, res) {
    User.find({ type: "Vendor" }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


// Adding a new product
userRoutes.route('/reviews/add').post(function (req, res) {
    if (req.body.username && req.body.productid && req.body.review && req.body.vendorid) {
        let review = new Review({
            username: req.body.username,
            productid: req.body.productid,
            review: req.body.review,
            vendorid: req.body.vendorid,
        });
        review.save()
            .then(review => {
                res.status(200).json(review);
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    }
    else res.status(413).send('Some values missing !')
});

// Getting all my products
userRoutes.route('/products/my').post(function (req, res) {
    Product.find({ userid: req.body.userid })
        .sort({ time: -1 })
        .exec(function (err, body) {
            if (err) {
                console.log(err);
            } else {
                res.json(body);
            }
        });
});

// Getting all my products
userRoutes.route('/products/get').get(function (req, res) {
    Product.find()
        .sort({ time: -1 })
        .exec(function (err, body) {
            if (err) {
                console.log(err);
            } else {
                res.json(body);
            }
        });
});


// Updating a product by its productid
userRoutes.route('/products/update').post(function (req, res) {
    Product.findById(req.body.id, function (err, result) {
        if (err) console.log(err);
        else if (!result && !req.body.avail_amount && !req.body.isDispatched)
            res.status(404).send("data is not found");
        else {
            result.avail_amount = req.body.avail_amount;
            result.isDispatched = req.body.isDispatched;
            result.save()
                .then(body => {
                    res.json({
                        body
                    });
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});


// Adding a new product
userRoutes.route('/products/add').post(function (req, res) {
    if (req.body.name && req.body.cost && req.body.total_amount && req.body.userid) {
        let product = new Product({
            name: req.body.name,
            cost: req.body.cost,
            total_amount: req.body.total_amount,
            avail_amount: req.body.total_amount,
            isDispatched: "No",
            userid: req.body.userid
        });
        product.save()
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    }
    else res.status(413).send('Some values missing !')
});

// Adding a new userproduct or order
userRoutes.route('/userproducts/add').post(function (req, res) {
    if (req.body.userid && req.body.buy_amount && req.body.productid) {
        let userproduct = new Userproduct({
            userid: req.body.userid,
            buy_amount: req.body.buy_amount,
            productid: req.body.productid
        });
        userproduct.save()
            .then(userproduct => {
                res.status(200).json(userproduct);
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    }
    else res.status(413).send('Some values missing !')
});

// Getting all my ordered products
userRoutes.route('/userproducts/my').post(function (req, res) {
    Userproduct.find({ userid: req.body.userid })
        .sort({ time: -1 })
        .exec(function (err, body) {
            if (err) {
                console.log(err);
            } else {
                res.json(body);
            }
        });
});

// Updating a product by its productid
userRoutes.route('/userproducts/update').post(function (req, res) {
    Userproduct.findById(req.body.id, function (err, result) {
        if (err) console.log(err);
        else if (!result && !req.body.buy_amount)
            res.status(404).send("data is not found");
        else {
            result.buy_amount = req.body.buy_amount;
            result.save()
                .then(body => {
                    res.json({
                        body
                    });
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});


// Getting product details
userRoutes.route('/userproducts/get').post(function (req, res) {
    Product.findById(req.body.productid)
        .sort({ time: -1 })
        .exec(function (err, body) {
            if (err) {
                console.log(err);
            } else {
                res.json(body);
            }
        });
});


// Adding a new user
userRoutes.route('/add').post(function (req, res) {
    if (req.body.username && req.body.email && req.body.password) {
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            type: req.body.type
        });
        if (req.body.password) {
            user.password = user.generateHash(req.body.password);
        }
        user.save()
            .then(user => {
                res.status(200).json({
                    user: {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        type: user.type
                    }
                });
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    }
    else res.status(400).json({ error: "Empty args" })
});


// Adding a new user rating
userRoutes.route('/addrating').post(function (req, res) {
    User.findById(req.body.id, function (err, result) {
        if (err) console.log(err);
        else if (!result && !req.body.newReview)
            res.status(404).send("data is not found");
        else {
            result.avg_review = (result.avg_review * result.no_of_reviews + req.body.newReview) / (++result.no_of_reviews)
            result.save()
                .then(body => {
                    res.json({
                        body
                    });
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});


function auth(req, res, next) {
    const token = req.header('auth-token');

    if (!token) res.status(401).json({ msg: "No token, authorisation denied!" });
    else {
        token = JSON.parse(token)
        if (token.key == "Secret") {
            req.user = token.id;
            next()
        }
        else res.status(400).json({ msg: 'Token is not valid' })
    }
}

userRoutes.route('/login').post(function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ 'User': 'Please enter both username and password' });
    }
    else {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user && user.validPassword(req.body.password)) {
                res.status(200).json({
                    user: {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        type: user.type
                    }
                });
                // res.redirect('/');
            }
            else {
                res.status(401).json({ 'User': 'Invalid Credentials!' })
            }
        });
    }
});

// Getting a user by id
userRoutes.route('/search/:id').get(function (req, res) {
    let id = req.params.id;
    if (id == "61") {
        Product.find(function (err, product) {
            res.json(product);
        });
    }
    else {
        Product.find({ name: id }, function (err, product) {
            res.json(product);
        });
    }
});

app.use('/', userRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
    console.log("http://localhost:" + PORT + "/")
});
