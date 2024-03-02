const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type: String, required: true},
    pass:{type: String, required: true }
})

const users = new mongoose.model('users', userSchema);
module.exports = users;