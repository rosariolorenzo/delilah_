const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database', {useNewUrlParser: true, useUnifiedTopology: true});

const paymentsSchema =  new mongoose.Schema({ 
    description: String, 
});

const PaymentMethods = mongoose.model('paymentmethods', paymentsSchema);

module.exports.PaymentMethods = PaymentMethods;