function validatePostFavorite( req, res, next ) {
    if( Array.isArray(req.body.products) && req.body.products.length ) {
        req.body.products.forEach( productId => {
            if( !productId ) {
                res.statusCode = 400;
                return res.json('error');
            } 
        })
        next(); 
    } 
    else {
    res.statusCode = 400;
    return res.json('error');  
    }
}

function validateUpdateProduct( req, res, next ) {
    for( let i = 0 ; i < Object.entries( req.body ).length; i++  ) {
         if( !Object.entries ( req.body )[i][1]) {
             res.statusCode = 400;
             return res.json('error');
         }
     }
     next();
 }

function validatePostProduct( req, res , next ){
    const { name, image, price  } = req.body;

    if( name && image && price ) {
        next();
    } 
    
    else {
        res.statusCode = 400;
        res.json('error');
    }
}


 

module.exports.validatePostFavorite = validatePostFavorite;
module.exports.validateUpdateProduct = validateUpdateProduct;
module.exports.validatePostProduct = validatePostProduct;