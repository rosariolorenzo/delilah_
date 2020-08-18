const rolesModel = require('../models/rolesModel'); 

async function insertRole( rol ) {
    const newRole = new rolesModel.Roles( rol );

    let saveRole = await newRole.save();
    return saveRole;
}

async function getRoles() {
    let roles = await rolesModel.Roles.find()
    .then( result => result );

    return roles;
}


async function clearRolesDocuments() {
    let clearResult = await rolesModel.Roles.deleteMany( {} )
    .then( result => result );

    return clearResult;
}

async function deleteRole( id ) {
    let deleteRole = await rolesModel.Roles.deleteOne( { _id: id } )
    .then( result => result );

    return deleteRole;
}


async function getRolebyId( id ) {
    let role = await rolesModel.Roles.find({ _id: id })
    .then( result => result );

    return role;
}


async function getRoleDescription( id ) {
    let roleDescription = await rolesModel.Roles.find({ _id: id })
    .then( role => role[0].description );

    return roleDescription;
}


async function getRoleDescriptionId( description ) {
    let roleId = await rolesModel.Roles.find({ description: description })
    .then( role => role[0]._id );

    return roleId;
}

async function updateRole( id, role ) {
    let updateRole = await rolesModel.Roles.updateOne( { _id: id }, { $set: role })
    .then( result => result);
    
    return updateRole;
}

module.exports.clearRolesDocuments = clearRolesDocuments;
module.exports.deleteRole = deleteRole
module.exports.getRoles = getRoles;
module.exports.getRoleDescription = getRoleDescription;
module.exports.getRolebyId = getRolebyId;
module.exports.getRoleDescriptionId = getRoleDescriptionId;
module.exports.insertRole = insertRole;
module.exports.updateRole = updateRole;