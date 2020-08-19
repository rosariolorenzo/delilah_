const usersModel = require ('../models/usersModel');

const roleController = require('./roles');

const roleUser = "roleUser";

async function searchUserByCredentials( username, password ) {
    let user = await usersModel.Users.find( { $and: [ { $or: [ { username: username }, { email: username } ]}, { password: password}]})
    .then(user => user);

    return user;
}

async function findUserBy(username , email){

    let user = await usersModel.Users.find({ $or: [ { username: username }, { email: email } ]})
    .then( user => user );

    return user;
}

async function existUserEmail ( email ) {
    let user = await usersModel.Users.find({ email: email } )
     .then( user => user );
 
     return user;
}

async function insertUser( user ) {
    const newUser = new usersModel.Users( user ); 
    
    let saveUserId = await newUser.save()
    .then(user => user._id);

    let rolUserId = await roleController.getRoleDescriptionId( roleUser )
    .then( result => result);

    let userRole = {
        id_user: saveUserId,
        id_rol: rolUserId
    }

    let saveUserRole = await insertUserRole( userRole )
    .then( result => result );

    return saveUserId;
}


async function getUserUsername( id ) {
    let userUsername = await usersModel.Users.find({ _id: id })
    .then( user => user[0].username );

    return userUsername;
}

async function insertUserRole( userRole ) {
    const newUserRole = new usersModel.UserRoleSchema( userRole ); 
    
    let saveUserRole = await newUserRole.save();
    return saveUserRole;
}


async function getRoleIdBy( usernameId ) {
    let roleId = await usersModel.UserRoleSchema.find({ id_user: usernameId })
    .then( userRole => userRole[0].id_rol );

    return roleId;
}


async function getUserId( username ) {
    let userId = await usersModel.Users.find({ username: username })
    .then( user => user[0]._id );

    return userId;
}

async function updateUser( id, newUserData ) {
    if ( newUserData.email ) {
        let existUser = await existUserEmail( newUserData.email )
            .then( user => user);

        if( !existUser.length ) {
            let newUpdateUser = await usersModel.Users.updateOne( { _id: id }, { $set: newUserData })
            .then( result => result ); 
    
            return newUpdateUser;
        } else {
            return false;
        }
    }

    let newUpdateUser = await usersModel.Users.updateOne( { _id: id }, { $set: newUserData })
        .then( result => result ); 
    return newUpdateUser;
}


async function clearUser( id ) {
    let clearUserId = await usersModel.Users.deleteOne( { _id: id } )
    .then( result => result );

    return clearUserId;
}


async function updateUserRole( id , newRoleId ) {
    let newUserRole = await usersModel.UserRoleSchema.updateOne( { id_user: id }, { $set: { id_rol: newRoleId } })
    .then( result => result );
    return newUserRole;
}


async function getUsersRoles() {
    let usersRoles = await usersModel.UserRoleSchema.find();

    return usersRoles;
}


async function getUserRoleBy( id ) {
    let userRole = await usersModel.UserRoleSchema.find({ _id: id })
    .then( result => result );

    return userRole;
}


async function deleteUserRole( id ) {
    let deleteUserRole = await usersModel.UserRoleSchema.deleteOne( { _id: id } )
    .then( result => result );

    return deleteUserRole;
}

async function clearUserRole( userId ) {
    let clearUserRoleId = await usersModel.UserRoleSchema.deleteOne( { id_user: userId } )
    .then( result => result );

    return clearUserRoleId;
}


async function getUsers() {
    let users = await usersModel.Users.find();

    return users;
}

async function getUserBy( userId ) {
    let user = await usersModel.Users.find( { _id: userId } )
    .then( result => result );

    return user;
}


module.exports.clearUser = clearUser;
module.exports.clearUserRole = clearUserRole;
module.exports.searchUserByCredentials = searchUserByCredentials;
module.exports.findUserBy = findUserBy;
module.exports.getUsers = getUsers;
module.exports.getUsersRoles = getUsersRoles;
module.exports.getUserRoleBy = getUserRoleBy;
module.exports.deleteUserRole = deleteUserRole;
module.exports.getUserBy = getUserBy;
module.exports.getUserId = getUserId;
module.exports.getRoleIdBy = getRoleIdBy;
module.exports.insertUser = insertUser; 
module.exports.insertUserRole = insertUserRole;
module.exports.updateUser = updateUser;
module.exports.updateUserRole = updateUserRole;
module.exports.getUserUsername = getUserUsername;
