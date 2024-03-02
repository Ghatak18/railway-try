const mongoose = require('mongoose');
const hom2Schema = new mongoose.Schema({
email: {type: String, required: true},
name: {type: String, required: true},
desc: {type: String, required: true},
img: {type: String, required: true}
});


const hom2 = mongoose.model('hom2', hom2Schema);
module.exports = hom2;
