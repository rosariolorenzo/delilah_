const productsModel = require('../models/productsModel');

async function getProducts() {
    let products = await productsModel.Products.find();
    return products;
}

async function insertProduct( product ) {
    const newProduct = new productsModel.Products( product );
    let saveProduct = await newProduct.save();
    return saveProduct;
}

async function deleteProduct( id ) {
    let deleteProduct = await productsModel.Products.deleteOne( { _id: id } )
    .then( r => r );
    
    return deleteProduct;
}

async function updateProduct( id, product ) {
    let updateProduct = await productsModel.Products.updateOne( { _id: id }, { $set: product })
    .then( r => r);
    
    return updateProduct;
}

async function getProductBy( description ) {
    let productId = await productsModel.Products.find({ name: description })
    .then( product => product[0]._id );

    return productId;
}

async function getProductsIdBy ( products ) {
    let productsId = await products.map( async( description ) => {
     await getProductBy( description )
     .then( productId => productId )
 })
 return productsId;
} 

async function getProductPrice( productId ) {
    let productPrice = await productsModel.Products.find({ _id: productId })
    .then( product => product[0].price );

    return productPrice;
}

async function getProductById( id ) {
    let product = await productsModel.Products.find({ _id: id })
    .then( result => result );

    return product;
}

async function getProductDescription( id ) {
    let productName = await productsModel.Products.find({ _id: id })
    .then( result => result[0].name );
    return productName;
}






//favorite products

async function clearFavoriteProduct( id ) {
    let clearFavProduct = await productsModel.FavoriteProducts.deleteOne( { _id: id } )
    .then( result => result );

    return clearFavProduct;
}

async function updateFavorite( id, product ) {
    let updateFavorite = await productsModel.FavoriteProducts.updateOne( { _id: id }, { $set: { product: product}})
    .then( result => result);
    
    return updateFavorite;
}

async function findProductBy( productId ) {
    let product = await productsModel.Products.find( { _id: productId } )
    .then( product => product );

    return product;
}

async function findFavoriteProductId( product ) {
    let favoriteProdId = await productsModel.FavoriteProducts.find( { product: product } )
    .then( result => result);
    
    return favoriteProdId;
}
 
async function validateProduct( products ) {
    let response = true;
    let i = 0;

    while( i < products.length && response ) {
        product = await productsModel.Products.find({ _id: products[i]})
        .then( p => p);
        
        if( !product.length ) {
            response = false;
        }
        i++;
    }
    return response;
}

async function insertFavoriteProduct( productId ){
    let newProductId = { product: productId};
    const newFavoriteProduct = new productsModel.FavoriteProducts( newProductId );
    let saveFavoriteProduct = await newFavoriteProduct.save();

    return saveFavoriteProduct;
}

// returns array of favorites products
async function getFavoriteProducts() {
    let favoriteProducts = await productsModel.FavoriteProducts.find();

    return favoriteProducts;
}

module.exports.clearFavoriteProduct = clearFavoriteProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.findFavoriteProductId = findFavoriteProductId;
module.exports.findProductBy = findProductBy;
module.exports.getProducts = getProducts;
module.exports.getProductBy = getProductBy;
module.exports.getProductById = getProductById;
module.exports.getProductPrice = getProductPrice;
module.exports.getProductsIdBy = getProductsIdBy; 
module.exports.getFavoriteProducts = getFavoriteProducts;
module.exports.insertProduct = insertProduct;
module.exports.insertFavoriteProduct = insertFavoriteProduct;
module.exports.updateFavorite = updateFavorite;
module.exports.updateProduct = updateProduct;
module.exports.validateProduct = validateProduct;
module.exports.getProductDescription = getProductDescription;