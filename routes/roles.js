const server = require ('express');
const routerRoles = server.Router();
const roleController = require('../controllers/roles');
const rolesMiddleware = require('../middlewares/roles');


routerRoles.post('/role',rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, rolesMiddleware.validateRoleProperties, async ( req, res ) => {
    let saveRole = await roleController.insertRole( req.body );

    if( saveRole ) {
        res.statusCode = 200;  
        return res.json('rol agregado');
    }
     
});

routerRoles.get('/role', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let roles = await roleController.getRoles();

    res.statusCode = 200;
    res.json( roles );
});
routerRoles.delete('/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const roleId = req.params.id;

    let deleteRoleId = await roleController.deleteRole( roleId );

    if( deleteRoleId ) {
        res.statusCode = 200;
        res.json('rol eliminado');
    }
})
routerRoles.get('/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const roleId = req.params.id;
    let rol = await roleController.getRolebyId( roleId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(rol);
    
});

routerRoles.patch('/role/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, rolesMiddleware.validateRoleProperties, async ( req, res ) => {
    const roleId = req.params.id;
    const newRole = req.body;
   
    let updateRole = await roleController.updateRole( roleId, newRole );

    if( updateRole.ok === 1 ){
        res.statusCode = 200;
        res.json('rol editado');
    }
})

module.exports = routerRoles;