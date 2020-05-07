const express = require("express");
const server= express();
const nodemon = require ("nodemon");
const bodyParser= require ('body-parser')

server.listen(3000, ()=>{
    console.log("servidor iniciado");
});

server.use(bodyParser.json())

//Arreglo productos y favoritos
let products=[
    {
        id:1,
        nombre:'Milanesa con papas ',
        precio: 400,
        foto:'asass'
    },
    {
        id:2,
        nombre:'Sorrentinos con salsa mixta',
        precio: 350,
        foto:'assaad'
    },
    {
        id:3,
        nombre:'Pizza barrigona',
        precio: 450,
        foto:'assaaddd'
    }
]

let favoritos=[]

 function validarId(req, res, next){
    products.forEach((producto)=>{
    if(producto.id == req.params.id){
        next()
    }else{
        res.status(404).json('Producto no exite')
    }    
    })
    
}

function validarProducto(req, res, next){
    const { id, nombre, precio, foto } = req.body;
    if(!id||!nombre||!precio||!foto){
        res.status(400).json('Falta informacion')
    }else{
        next();
    }
    
}

server.get('/productos',(req,res)=>{
    res.status(200).json(products)
})

server.get('/productos/:id', validarId , (req,res)=>{
    const productId = req.params.id;
    res.status(200).json(products[productId]);
})

server.get('/productos-favoritos', (req,res)=>{
    res.status(200).json(favoritos);
})

server.post('/productos', validarProducto, (req,res)=>{
    products.push(req.body);
    res.status(200).json('producto agregado');
})

server.post('/productos-favoritos/:id',validarId , (req,res)=>{
    const productId = req.params.id;
    favoritos.push(products[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})
