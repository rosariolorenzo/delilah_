const express = require('express');
const routerProducts = require('./routes/products');
const routerOrder= require('./routes/order');
const routerPayment= require ('./routes/payments');
const routerRoles = require('./routes/roles');
const routerUser = require ('./routes/user');
const server= express();
const nodemon = require ('nodemon');
const bodyParser= require ('body-parser')


server.use(bodyParser.json());

server.listen(3000, ()=>{
    console.log("servidor iniciado");
});


server.use(routerPayment);
server.use(routerProducts);
server.use(routerRoles);
server.use(routerUser);
server.use(routerOrder);
