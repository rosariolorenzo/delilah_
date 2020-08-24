const orderModel = require('../models/ordersModel');
const userController = require ('./users');
const productsController = require('./products');
const paymentController = require ('./payments');

//insert order 

async function insertOrder ( order ) {

    const { usernameId, productsId, payment_methodId, delivery_address } = order;
    let total = 0;

    const newStatusId = await getStatusDescriptionId( "new order");
    
    for( i = 0; i<productsId.length; i++) {
        let productPrice = await productController.getProductPrice( productsId[i])
            .then(price => price);

        total = total + productPrice ;
    }
    let orderDescription = {
        id_user : usernameId,
        products_id : productsId,
        payment_method_id : payment_methodId,
        status_id : newStatusId,
        total: total,
        delivery_address: delivery_address
    }
    
    const newOrder = new orderModel.Orders( orderDescription );
    let saveOrder = await newOrder.save();

    return saveOrder;   
}

async function getOrders() {

    let orders = await databaseModel.Orders.find();

    return orders;
}
async function getOrderBy( orderId ) {
    let order = await databaseModel.Orders.find( { _id: orderId } )
    .then( result => result );

    return order;
}

async function getMyOrders( userId ) {
    let order = await databaseModel.Orders.find( { id_user: userId } )
    .then( result => result );
    
    return order;
}

async function deleteOrder( orderId ) {
    let deleteOrder = await databaseModel.Orders.deleteOne( { _id: orderId } )
    .then( result => result );

    return deleteOrder;
}

async function updateOrder( orderId, orderStatusId ) {
    let updateOrder = await databaseModel.Orders.updateOne( { _id: orderId }, { $set: { status_id: orderStatusId} })
    .then( result => result);
    
    return updateOrder;
}




