const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

var isLoggedIn = false;

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
    if(req.body.username && req.body.email && req.body.password){
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            type: req.body.type
        });
        if(req.body.password){
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
    else res.status(400).json({error:"Empty args"})
});


function auth(req, res, next){
    const token = req.header('auth-token');

    if (!token) res.status(401).json({msg: "No token, authorisation denied!"});
    else{
        token = JSON.parse(token)
        if(token.key == "Secret"){
            req.user = token.id;
            next()
        }
        else res.status(400).json({msg: 'Token is not valid'})
    }
}

userRoutes.route('/login').post(function(req, res) {
    if(!req.body.username || !req.body.password){
        res.status(400).json({'User': 'Please enter both username and password'});
    }
    else{
        User.findOne({username: req.body.username}, function(err, user) {
            if(user && user.validPassword(req.body.password)){
                res.status(200).json({ user: {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    type: user.type
                } });
                // res.redirect('/');
            }
            else{
                res.status(401).json({'User': 'Invalid Credentials!'})
            }
        });
    }
});

// Getting a user by id
userRoutes.route('/search/:id').get(auth,function(req, res) {
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
