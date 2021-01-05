module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/users', users.create);

    // Get all users
    app.get('/users', users.findAll);

    // Get a single user with user ID
    app.get('/users/:userId', users.findOne);

    // Update a single user with user ID
    app.put('/users/:userId', users.update);

    // Delete a single user
    app.delete('/users/:userId', users.delete);
}
