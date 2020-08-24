const mongoose = require('mongoose');
const userModel = require('./usersModel'); 
const productModel = require('./productsModel');
const paymentModel = require('./paymentsModel'); 

mongoose.connect('mongodb://localhost:27017/database',{useNewUrlParser: true, useUnifiedTopology: true});

const orderSchema =  new mongoose.Schema({ 
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${userModel.Users}`
    },
    products_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `${productModel.Products}` 
        }
    ],
    payment_method_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `${paymentModel.PaymentMethods}`
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderstatus'
    }, 
    total: Number,
    delivery_address: String
}); 
const orderStatusSchema =  new mongoose.Schema({ 
    description: String, 
});
const OrderStatus = mongoose.model('orderstatus', orderStatusSchema);  
const Orders = mongoose.model('orders', orderSchema);

module.exports.OrderStatus = OrderStatus;
module.exports.Orders = Orders;