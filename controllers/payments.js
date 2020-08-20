const paymentsModel = require('../models/paymentsModel'); 


async function insertPaymentMethod( paymentMethod ) {
    const newPaymentMethod = new paymentsModel.PaymentMethods( paymentMethod );

    let savePaymentMethod = await newPaymentMethod.save();
    return savePaymentMethod;
}

async function getPaymentMethods() {
    let paymentMethods = await paymentsModel.PaymentMethods.find();

    return paymentMethods;
}

async function getPaymentMethodBy( paymentMethodId ) {
    let paymentMethod = await paymentsModel.PaymentMethods.find( { _id: paymentMethodId } )
    .then( result => result );

    return paymentMethod;

}

async function getPaymentDescription( paymentMethodId ) {
    let paymentDescription = await paymentsModel.PaymentMethods.find( { _id: paymentMethodId } )
    .then( result => result[0].description );

    return paymentDescription;

}

 async function getPaymentIdBy( description ) {
    let paymentId = await paymentsModel.PaymentMethods.find({ description: description })
    .then( payment => payment[0]._id );

    return paymentId;
} 

async function deletePaymentMethod( paymentMethodId ) {
    let deletePayment = await paymentsModel.PaymentMethods.deleteOne( { _id: paymentMethodId } )
    .then( result => result );

    return deletePayment;
}

async function updatePaymentMethod( paymentMethodId, description ) {
    let updatePayment = await paymentsModel.PaymentMethods.updateOne( { _id: paymentMethodId }, { $set: { description: description} })
    .then( result => result);
    
    return updatePayment;
}


module.exports.deletePaymentMethod = deletePaymentMethod;
module.exports.getPaymentMethods = getPaymentMethods;
module.exports.getPaymentMethodBy = getPaymentMethodBy;
module.exports.getPaymentIdBy = getPaymentIdBy; 
module.exports.insertPaymentMethod = insertPaymentMethod;
module.exports.updatePaymentMethod = updatePaymentMethod;
module.exports.getPaymentDescription = getPaymentDescription;