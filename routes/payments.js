const server = require('express');
const router = server.Router();
const paymentController = require('../controllers/payments');
const paymentMiddleware = require ('../middlewares/payments');
const rolesMiddleware = require('../middlewares/roles');

router.post('/paymentmethod', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    let savePayment = await paymentController.insertPaymentMethod( req.body );

    if( savePayment ) {
        res.statusCode = 200;  
        return res.json('metodo de pago agregado');
    }
     
});

router.get('/paymentmethod', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, async ( req, res ) => {
    let paymentMethods = await paymentController.getPaymentMethods();

    res.statusCode = 200;
    res.json( paymentMethods );
});

router.get('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async ( req, res ) => {
    const paymentId = req.params.id;
    let payment = await paymentController.getPaymentMethodBy( paymentId )
    .then( result => result );

    res.statusCode = 200;
    return res.json(payment);
    
});

router.delete('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin,  async( req, res ) => {
    const paymentId = req.params.id;

    let deletePayment = await paymentController.deletePaymentMethod( paymentId );

    if( deletePayment ) {
        res.statusCode = 200;
        res.json('metodo de pago eliminado');
    }
})

router.patch('/payment/:id', rolesMiddleware.validateToken, rolesMiddleware.validateRoleAdmin, paymentMiddleware.validatePaymentProps, async ( req, res ) => {
    const paymentId = req.params.id;

    let updatePayment = await paymentController.updatePaymentMethod( paymentId, req.body.description );
    //Analyze if update was made sucessfully
    if( updatePayment.ok === 1 ){
        res.statusCode = 200;
        res.json('metodo de pago editado');
    }
})


module.exports = router;