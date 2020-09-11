const server = require ('express');
const routerProducts = server.Router();
const prodController = require('../controllers/products');
const prodMiddleware = require('../middlewares/products');
const rolesMiddleware = require('../middlewares/roles');

routerProducts.post('/favorite', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, prodMiddleware.validatePostFavorite, async ( req, res ) => {
    let clearResult = await prodController.clearFavoriteDocuments();
  
    if( clearResult.ok === 1 ) {
        
        let existProducts = await prodController.validateProduct( req.body.products );
            if( existProducts ) {
                req.body.products.forEach( async (productId) => {
                    await prodController.insertFavoriteProduct( productId );
                 });
                res.statusCode = 200;
                return res.json('producto favorito agregado'); 
            } 
        res.statusCode = 400;
        return res.json('el producto favorito ya existe'); 
    }
});

routerProducts.get('/favorite', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let favoriteProducts = await prodController.getFavoriteProducts();

    let newFavorites = [];
    for( let i = 0; i < favoriteProducts.length; i ++ ){
        let favoriteDesc = await prodController.getProductDescription( favoriteProducts[i].product );

        newFavorites.push({
            _id: favoriteProducts[i]._id,
            favorites_description: favoriteDesc
            })
    }
 
        res.statusCode = 200;
        res.json( newFavorites ); 
});

routerProducts.delete('/favorite/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const favoriteId = req.params.id;

    let deleteFavoriteId = await prodController.clearFavoriteProduct( favoriteId );

    if( deleteFavoriteId ) {
        res.statusCode = 200;
        res.json('producto favorito eliminado');
    }
})


routerProducts.get('/product', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let products = await prodController.getProducts();

    res.statusCode = 200;
    res.json( products );
});

routerProducts.post('/product', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, prodMiddleware.validatePostProduct, async ( req, res ) => {
    let saveProduct = await prodController.insertProduct( req.body );

    if( saveProduct ) {
        res.statusCode = 200;
        res.json('producto agregado');
    }
});

routerProducts.delete('/product/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const productId = req.params.id;

    let deleteProductId = await prodController.deleteProduct( productId );

    if( deleteProductId ) {
        res.statusCode = 200;
        res.json('producto eliminado');
    }
})

routerProducts.patch('/product/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, prodMiddleware.validateUpdateProduct, async ( req, res ) => {
    const productId = req.params.id;
    const newProperties = req.body;
   
    let updateProduct = await prodController.updateProduct( productId, newProperties );
    
    if( updateProduct.ok === 1 ){
        res.statusCode = 200;
        res.json('producto editado');
    }
})

routerProducts.get('/product/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const productId = req.params.id;
    let product = await prodController.getProductById( productId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(product);
    
});
module.exports=routerProducts;
