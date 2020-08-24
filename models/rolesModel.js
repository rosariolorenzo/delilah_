const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database',{useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;
const rolesSchema =  new Schema({ 
    description: String
});

const Roles = mongoose.model('roles' , rolesSchema);
module.exports.roles = Roles;