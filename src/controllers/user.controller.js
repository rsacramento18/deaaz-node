const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({
            message: "User username can not be empty"
        });
    }

    const User = new User({
        username: req.body.username,
        email: req.body.email,
        alias: [
            { 
                letter: req.body.alias.letter, 
                color: req.body.alias.color, 
                description: req.body.alias.description,
                posts: [
                    { 
                        title: req.body.alias.posts.title, 
                        subtitle: req.body.alias.posts.subtitle, 
                        content: req.body.alias.posts.content, 
                        date: req.body.alias.posts.date
                    }
                ]
            }
        ]
    });

    user.save()
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {

    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "User username can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username || "Untitled Note",
        email: req.body.email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
