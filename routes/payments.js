const server = require('express');
const routerPayments = server.Router();
const paymentController = require('../controllers/payments');
const paymentMiddleware = require ('../middlewares/payments');
const rolesMiddleware = require('../middlewares/roles');

routerPayments.post('/paymentmethod', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    let savePayment = await paymentController.insertPaymentMethod( req.body );

    if( savePayment ) {
        res.statusCode = 200;  
        return res.json('metodo de pago agregado');
    }
     
});

routerPayments.get('/paymentmethod', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let paymentMethods = await paymentController.getPaymentMethods();

    res.statusCode = 200;
    res.json( paymentMethods );
});

routerPayments.get('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async ( req, res ) => {
    const paymentId = req.params.id;
    let payment = await paymentController.getPaymentMethodBy( paymentId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(payment);
    
});

routerPayments.delete('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async( req, res ) => {
    const paymentId = req.params.id;

    let deletePayment = await paymentController.deletePaymentMethod( paymentId );

    if( deletePayment ) {
        res.statusCode = 200;
        res.json('metodo de pago eliminado');
    }
})

routerPayments.patch('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    const paymentId = req.params.id;

    let updatePayment = await paymentController.updatePaymentMethod( paymentId, req.body.description );
    
    if( updatePayment.ok === 1 ){
        res.statusCode = 200;
        res.json('metodo de pago editado');
    }
})


module.exports = routerPayments;