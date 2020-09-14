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
        let productPrice = await productsController.getProductPrice( productsId[i])
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

    let orders = await orderModel.Orders.find();

    return orders;
}
async function getOrderBy( orderId ) {
    let order = await orderModel.Orders.find( { _id: orderId } )
    .then( result => result );

    return order;
}

async function getMyOrders( userId ) {
    let order = await orderModel.Orders.find( { id_user: userId } )
    .then( result => result );
    
    return order;
}

async function deleteOrder( orderId ) {
    let deleteOrder = await orderModel.Orders.deleteOne( { _id: orderId } )
    .then( result => result );

    return deleteOrder;
}

async function updateOrder( orderId, orderStatusId ) {
    let updateOrder = await orderModel.Orders.updateOne( { _id: orderId }, { $set: { status_id: orderStatusId} })
    .then( result => result);
    
    return updateOrder;
}
//function that inserts an order status in OrderStatus table
async function insertOrderStatus( orderStatus ) {
    const newOrderStatus = new orderModel.OrderStatus( orderStatus );

    let saveOrderStatus = await newOrderStatus.save();
    return saveOrderStatus;
}

//function that returns orders status in OrderStatus table
async function getOrdersStatus() {
    let ordersStatus = await orderModel.OrderStatus.find();
    return ordersStatus;
}

//function that returns order status by id
async function getOrderStatusBy( orderStatusId ) {
    let orderStatus = await orderModel.OrderStatus.find( { _id: orderStatusId } )
    .then( result => result );

    return orderStatus;

}

//function that returns order status by id
async function getStatusDesc( orderStatusId ) {
    let statusDesc = await orderModel.OrderStatus.find( { _id: orderStatusId } )
    .then( result => result[0].description );

    return statusDesc;

}

//function that returns a status id by its description
async function getStatusDescriptionId( description ) {
    let statusId = await orderModel.OrderStatus.find({ description: description })
    .then( status => status[0]._id );

    return statusId;
}


async function deleteOrderStatus( orderStatusId ) {
    let deleteOrderStatus = await orderModel.OrderStatus.deleteOne( { _id: orderStatusId } )
    .then( result => result );

    return deleteOrderStatus;
}

async function updateOrderStatus( orderStatusId, description ) {
    let updateOrderStatus = await orderModel.OrderStatus.updateOne( { _id: orderStatusId }, { $set: { description: description} })
    .then( result => result);
    
    return updateOrderStatus;
}


module.exports.deleteOrder = deleteOrder;
module.exports.deleteOrderStatus = deleteOrderStatus; 
module.exports.getOrders = getOrders;
module.exports.getOrderBy = getOrderBy;
module.exports.getMyOrders = getMyOrders;
module.exports.getOrderStatusBy = getOrderStatusBy;
module.exports.getOrdersStatus = getOrdersStatus;
module.exports.getStatusDescriptionId = getStatusDescriptionId;
module.exports.insertOrder = insertOrder; 
module.exports.insertOrderStatus = insertOrderStatus;
module.exports.updateOrder = updateOrder;
module.exports.updateOrderStatus = updateOrderStatus;
module.exports.getStatusDesc = getStatusDesc;



