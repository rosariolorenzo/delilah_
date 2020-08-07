const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

const Schema = mongoose.Schema;
const rolesSchema =  new Schema({ 
    description: String, require:true
});