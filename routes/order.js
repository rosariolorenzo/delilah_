const express = require('express');
const routerOrder = express.Router();
const jwt = require('jsonwebtoken');
const jwtSign = "mypassword";

const orderController = require('../controllers/orders');
const paymentController = require('../controllers/payments');
const productController = require('../controllers/products');
const userController = require('../controllers/users');

const orderMiddleware = require('../middlewares/orders');
const rolesMiddleware = require('../middlewares/roles');

routerOrder.post('/order', rolesMiddleware.validateToken, rolesMiddleware.validateRoleUser, orderMiddleware.validatePostOrder, async ( req, res ) => {
     let saveOrder = await orderController.insertOrder( req.body );

    if( saveOrder ) {
        res.statusCode = 200;  
        return res.json('orden agregada');
    } 
});

routerOrder.patch('/order/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, orderMiddleware.validateUpdateOrder, async ( req, res ) => {
    const orderId = req.params.id;

    let updateOrderId = await orderController.updateOrder( orderId, req.body.orderStatusId );
    if( updateOrderId.ok === 1 ){
        res.statusCode = 200;
        res.json('orden editada');
    }
});

routerOrder.delete('/order/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const orderId = req.params.id;

    let deleteOrder = await orderController.deleteOrder( orderId );

    if( deleteOrder ) {
        res.statusCode = 200;
        res.json('orden eliminada');
    }
});

routerOrder.get('/order', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async ( req, res ) => {
    let orders = await orderController.getOrders();
      
    let newOrders = [];

    for( let i = 0; i <orders.length; i++ ) {
        let productsDescription = [];

        for( let j = 0; j < orders[i].products_id.length; j++) {
            let product = await productController.getProductDescription(orders[i].products_id[j]);
            productsDescription.push(product);  
        }

        let user = await userController.getUserBy(orders[i].id_user);
        let username = await userController.getUserUsername( orders[i].id_user );
        let paymentDescription = await paymentController.getPaymentDescription( orders[i].payment_method_id );
        let statusDesc = await orderController.getStatusDesc( orders[i].status_id );

        newOrders.push({
            _id: orders[i]._id,
            products_description: productsDescription,
            username: username,
            payment_description: paymentDescription,
            status_description: statusDesc,
            total: orders[i].total,
            delivery_address: orders[i].delivery_address,
            name_lastname: user[0].name_lastname,
            user_email: user[0].email,
            user_telephone: user[0].telephone,
            user_address: user[0].delivery_address,
        })
    }
    res.statusCode = 200;
    return res.json(newOrders);  
});

routerOrder.get('/order/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const orderId  = req.params.id;

    let order = await orderController.getOrderBy( orderId )
    .then( result => result );
    let user = await userController.getUserBy(order[0].id_user);

    let productsId = order[0].products_id;
    let newOrder = [];
    let productsDescription = [];

    for( i = 0; i < productsId.length; i++) {
        
        let product = await productController.getProductDescription(productsId[i]);
        productsDescription.push(product); 
    }  

    let username = await userController.getUserUsername( order[0].id_user );
    let paymentDescription = await paymentController.getPaymentDescription( order[0].payment_method_id );
    let statusDesc = await orderController.getStatusDesc( order[0].status_id );  
    
    newOrder.push({
        _id: order[0]._id,
        products_description: productsDescription,
        username: username,
        payment_description: paymentDescription,
        status_description: statusDesc,
        total: order[0].total,
        delivery_address: order[0].delivery_address,
        name_lastname: user[0].name_lastname,
        user_email: user[0].email,
        user_telephone: user[0].telephone,
        user_address: user[0].delivery_address,
        })

    res.statusCode = 200;
    return res.json(newOrder);  
});

routerOrder.get('/myorder', rolesMiddleware.validateToken, rolesMiddleware.validateRoleUser, async ( req, res ) => {
    try {  
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );
    
        let orders = await userController.getUserId( verifyToken )
            .then( async( userId ) => await orderController.getMyOrders( userId )
                .then( order => order ) );
 
            let newOrders = [];
            for( let i = 0; i < orders.length; i++ ) {
                let productsDescription = [];
                for( let j = 0; j < orders[i].products_id.length; j++) {
                    let product = await productController.getProductDescription(orders[i].products_id[j]);
                    productsDescription.push(product);  
            } 

            let username = await userController.getUserUsername( orders[i].id_user );
            let paymentDescription = await paymentController.getPaymentDescription( orders[i].payment_method_id );
            let statusDesc = await orderController.getStatusDesc( orders[i].status_id );

            newOrders.push({
                _id: orders[i]._id,
                products_description: productsDescription,
                username: username,
                payment_description: paymentDescription,
                status_description: statusDesc,
                total: orders[i].total,
                delivery_address: orders[i].delivery_address
            })
        }

        res.statusCode = 200;
        return res.json(newOrders) ;   

    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  } 
});

 routerOrder.get('/myorder/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleUser, async ( req, res ) => {
    const orderId  = req.params.id;

    try { 
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify( token, jwtSign );

        let userId = await userController.getUserId( verifyToken );
        let order = await orderController.getOrderBy( orderId );
        let productsId = order[0].products_id;

        if( order[0].id_user.toString() === userId.toString() ) {
            let newOrder = []; 
            let productsDescription = [];

            
            for( i = 0; i < productsId.length; i++) {
                
                let product = await productController.getProductDescription(productsId[i]);
                productsDescription.push(product); 
            }  

            let username = await userController.getUserUsername( order[0].id_user );
            let paymentDescription = await paymentController.getPaymentDescription( order[0].payment_method_id );
            let statusDesc = await orderController.getStatusDesc( order[0].status_id );  
            
            newOrder.push({
                _id: order[0]._id,
                products_description: productsDescription,
                username: username,
                payment_description: paymentDescription,
                status_description: statusDesc,
                total: order[0].total,
                });

            res.statusCode = 200;
            return res.json( newOrder );   
        } 
        
    } catch( error ) {
        res.statusCode = 401;
        return res.json(error); 
  }
});




routerOrder.post('/order/status', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, orderMiddleware.validateStatusOrderProps, async ( req, res ) => {
    let saveOrderStatus = await orderController.insertOrderStatus( req.body );

    if( saveOrderStatus ) {
        res.statusCode = 200;  
        return res.json('estado de orden agregado');
    }
     
});
 
routerOrder.get('/order/status', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let ordersStatus = await orderController.getOrdersStatus();

    res.statusCode = 200;
    return res.json( ordersStatus );
});

routerOrder.get('/order/status/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    const statusId = req.params.id;
    let status = await orderController.getOrderStatusBy( statusId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(status);
    
});

routerOrder.delete('/order/status/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async( req, res ) => {
    const statusId = req.params.id;

    let deleteStatus = await orderController.deleteOrderStatus( statusId );

    if( deleteStatus ) {
        res.statusCode = 200;
        res.json('estado de la orden eliminado')
    }
})

routerOrder.patch('/order/status/:id',  rolesMiddleware.validateToken,  rolesMiddleware.validateRoleAdmin, orderMiddleware.validateStatusOrderProps, async ( req, res ) => {
    const statusId = req.params.id;

    let updateStatusId = await orderController.updateOrderStatus( statusId, req.body.description );
    if( updateStatusId.ok === 1 ){
        res.statusCode = 200;
        res.json('estado de la orden editado');
    }
})


module.exports = routerOrder;