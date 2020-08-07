const server = require ('express');
const router = server.Router();

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

router.get('/',(req,res)=>{
    res.status(200).json(products)
})

router.get('/productos/:id', validarId , (req,res)=>{
    const productId = req.params.id;
    res.status(200).json(products[productId]);
})

router.get('/favoritos', (req,res)=>{
    res.status(200).json(favoritos);
})

router.post('/', validarProducto, (req,res)=>{
    products.push(req.body);
    res.status(200).json('producto agregado');
})

router.post('/favoritos',validarId , (req,res)=>{
    const productId = req.params.id;
    favoritos.push(products[productId]);
    res.status(200).json('Producto agregado a Favoritos');
})
module.exports=router;
