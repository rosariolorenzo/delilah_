
function validatePostUser( req, res, next ) {
    const { username, name, email, tel, address, password } = req.body;

    if( username && name && email && tel && address && password ) {
        next();
    } else {
        res.statusCode = 400;
        res.json('error');
    }
}

function loginValidation( req, res, next ) { 
    const { username, password } = req.body;
    if( !username || !password ) { 
        res.statusCode = 400;
        res.json('errorr');
    } 
    next();
}

function validatePatchUser( req, res, next ) {
    for( let i = 0 ; i < Object.entries( req.body ).length; i++  ) {
         if( !Object.entries ( req.body )[i][1]) {
             res.statusCode = 400;
             return res.json('eror');
         }
     }
     next();
 }
 
function validatePatchUserRole(  req, res, next ) {
    if( !req.body.id_role ) {
        res.statusCode = 400;
        res.json('error');
    } else {
        next();
    }
}

module.exports.loginValidation = loginValidation;
module.exports.validatePatchUser = validatePatchUser;
module.exports.validatePatchUserRole = validatePatchUserRole;
module.exports.validatePostUser = validatePostUser;