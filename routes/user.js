
const express = require('express');
const routerUser = express.Router();
const userController = require('../controllers/users');
const userMiddleware = require('../middlewares/users');
const rolesMiddleware = require('../middlewares/roles');
const jwt = require('jsonwebtoken');
const routerOrder = require('./order');
const jwtSign = "mypassword";



routerUser.post( '/login', userMiddleware.loginValidation, async ( req, res ) => {
    const { username, password } = req.body;
    let findUser = await userController.searchUserByCredentials( username, password );

    if( findUser.length ) {
        const token = jwt.sign( username, jwtSign );
        res.statusCode = 200;

        return res.json( token );
    } else {
        res.statusCode = 400;

        return res.json("usuario no encontrado");
    } 
});

routerUser.get('/user', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let users = await userController.getUsers();
    
    res.statusCode = 200;
    res.json( users );
});

routerUser.post( '/register', userMiddleware.validatePostUser, async ( req, res ) => {
    const { username, email } = req.body;
    let findUser = await userController.findUserBy( username, email );

    if( !findUser.length ) {
        let saveUser = await userController.insertUser( req.body );

        if( saveUser ) {
            res.statusCode = 200;
            res.json('usuario agregado');
        }
    } else {
        res.statusCode = 403;
        res.json('usuario ya existe');
    }
});

routerUser.patch('/user/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleUser, userMiddleware.validatePatchUser, async ( req, res ) => {
    const idUser = req.params.id;
    const updateUuser = req.body;
   
 let updateUser = await userController.updateUser( idUser, updateUuser );
    if( updateUser.ok === 1 ){
        res.statusCode = 200;
        res.json('usuario editado');
    } 
    
    if ( !updateUser ) {
        res.statusCode = 403;
        res.json('usuario o email ya existen');
    }

});

routerUser.delete('/user/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const userId = req.params.id;

    let deleteUserId = await userController.clearUser( userId );

    if( deleteUserId.ok === 1 ) {
        let deleteUserRoleId = await userController.clearUserRole( userId );
        res.statusCode = 200;
        res.json('usuario eliminado');
    }
})



routerUser.patch('/user/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, userMiddleware.validatePatchUserRole,  async ( req, res ) => {
    const idUser = req.params.id;
    const updateUserRoleId = req.body.id_rol;
   
 let updateUser = await userController.updateUserRole( idUser, updateUserRoleId );

    if( updateUser.ok === 1 ){
        res.statusCode = 200;
        res.json('rol de usuario editado');
    } 
});

routerUser.get('/user/role', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let userRoles = await userController.getUsersRoles();

    res.statusCode = 200;
    res.json( userRoles );
});

routerUser.get('/user/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const userRoleId = req.params.id;
    let userRole = await userController.getUserRoleBy( userRoleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(userRole);
    
});

routerUser.delete('/user/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const userRoleId = req.params.id;

    let deleteUserRoleId = await userController.deleteUserRole( userRoleId );

    if( deleteUserRoleId ) {
        res.statusCode = 200;
        res.json('rol de usuario eliminado');
    }
})


module.exports = routerUser;