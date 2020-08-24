const controllerUser = require ('../controllers/users');
const controllerRoles = require ('../controllers/roles');
const jwtFirma = 'mypassword';
const jwt = require('jsonwebtoken');

const roleUserDescription = 'user';
const roleAdminDescription = 'admin';



async function validateRoleUser ( req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtFirma );

        let rolDescription = await controllerUser.getUserId( verifyToken )
   
        .then( async (userId) => await controllerUser.getRoleIdBy( userId )
       
        .then( async (roleId) => await controllerRoles.getRoleDescription( roleId )
            .then( async (rolDesc) => rolDesc )
        )
        );
        if( rolDescription === roleUserDescription ) {
        next();
        } else {
        res.statusCode = 401;
        return res.json('usuario no autorizado');
        }
    } 
    catch( error ) {
    res.statusCode = 401;
    return res.json(error); 
}
}


async function validateRoleAdmin( req, res , next ) {
try { 
    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify( token, jwtFirma );

    let rolDescription = await controllerUser.getUserId( verifyToken )
   
    .then( async (userId) => await controllerUser.getRoleIdBy( userId )
      
        .then( async (roleId) => await controllerRoles.getRoleDescription( roleId )
            .then( async (rolDesc) => rolDesc )
        )
    );
    if( rolDescription === roleAdminDescription ) {
        next();
    } else {
        res.statusCode = 401;
        res.json('usuario no autorizado');
    }

} catch( error ) {
    res.statusCode = 401;
    res.json(error); 
}
}

module.exports.validateRoleUser = validateRoleUser;
module.exports.validateRoleAdmin = validateRoleAdmin;