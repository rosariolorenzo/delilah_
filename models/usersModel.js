const mongoose = require('mongoose');
 const rolesModel = require('./rolesModel');

 mongoose.connect('mongodb://localhost:27017/database');

const Schema = mongoose.Schema
const usersSchema =  new Schema({ 
    username: String,
    name: String,
    email: String,
    tel: String,
    address: String,
    password: String
});

const userRolesSchema =  new mongoose.Schema({ 
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    id_rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${rolesModel.Roles}`
    }
});
const Users = mongoose.model('users', usersSchema); 
const UserRoleSchema = mongoose.model('usersroles', userRolesSchema);
module.exports.Users = Users;
module.exports.UserRoleSchema = UserRoleSchema;
