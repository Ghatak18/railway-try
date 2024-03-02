const mongoose = require('mongoose');
const hom1Schema = new mongoose.Schema({
name: {type: String, required: true},
desc: {type: String, required: true},
img: {type: String, required: true}
});


const hom1 = mongoose.model('hom1', hom1Schema);
module.exports = hom1;
