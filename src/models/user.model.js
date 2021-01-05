const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    alias: [
        { 
            letter: String, 
            color: String, 
            description: String,
            posts: [
                { 
                    title: String, 
                    subtitle: String, 
                    content: String, 
                    date: String 
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
