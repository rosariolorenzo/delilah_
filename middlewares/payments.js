function validatePayment(  req, res, next ) {
    const { description } = req.body;

    if( !description ) {
        res.statusCode = 400;
        res.json('error');
    } else {
        next();
    }
}

module.exports.validatePayment = validatePayment