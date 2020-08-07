const express = require('express');
const productos = require('./routes/products');
const server= express();
const nodemon = require ('nodemon');
const bodyParser= require ('body-parser')

server.use(bodyParser.json());

server.listen(3000, ()=>{
    console.log("servidor iniciado");
});


