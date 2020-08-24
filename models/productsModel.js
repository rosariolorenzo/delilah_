const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database',{useNewUrlParser: true, useUnifiedTopology: true});

const ProductSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    img: {type: String}
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