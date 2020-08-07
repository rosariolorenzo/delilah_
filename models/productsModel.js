const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    img: {type: String, required: true}
});