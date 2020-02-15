const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User({
        username: req.body.username,
        email: req.body.email
    });
    if(req.body.password){
        user.password = user.generateHash(req.body.password);
    }
    else{
        user.password = '';
    }
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


userRoutes.route('/login').post(function(req, res) {
    console.log("Entered ::"+req.body.username+":"+req.body.password);
    if(!req.body.username || !req.body.password){
        console.log("LS"+req.body.username+":"+req.body.password);
        res.status(409).json({'User': 'Please enter both username and password'});
    }
    else{
        User.findOne({username: req.body.username}, function(err, user) {
            if(user && user.validPassword(req.body.password)){
                console.log("Logged in: "+ req.body.username);
                res.status(200).json({ 'User': 'Logged in as: '+req.body.username });
                // res.redirect('/');
            }
            else{
                console.log("Invalid");
                res.status(401).json({'User': 'Invalid Credentials!'})
            }
        });
    }
});

// Getting a user by id
userRoutes.route('/search/:id').get(function(req, res) {
    let id = req.params.id;
    User.find({username: id}, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
    console.log("http://localhost:"+PORT+"/")
});
