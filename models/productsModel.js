const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
    img: {type: String, required: true}
});

const favoriteProductsSchema =  new mongoose.Schema({ 
    product: {
        type: mongoose.Schema.Types.ObjectId, //type a given path should have
        ref: 'Products'
    }
});
const Products = mongoose.model('Products', ProductSchema)
const FavoriteProducts = mongoose.model('FavoritePproducts', favoriteProductsSchema);
module.exports.Product= Products;
module.exports.FavoriteProducts = FavoriteProducts;