# delilah_

Delilah es un proyecto que permite crear, editar, eliminar y obtener productos e inventarios en el contexto de una empresa de entrega de alimentos.


Realizado con Javascript, NodeJs y MongoDB.

## Instalación:
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

1) Instalar [Community Server](https://www.mongodb.com/) 


2) Crear la siguiente carpeta

    ```bash
    C:\data\db
     ```
     
3) Ingresar desde la consola de Mongo DB al directorio:
cd a ``` C:\Program Files\MongoDB\Server\4.4\bin>```


 Ingresar comando 
 
 ```bash 
  mongod
  ```
 
 
  De forma predeterminada, el servidor Mongo DB se iniciará en el puerto 27017

4) Copiar el path del archivo "initDB" que se encuentra en el repositorio y ejecutarlo en otra consola


     ```bash
      mongo path-initDB
     ```
     
Este archivo crea las colecciones en la base de datos. 

5) En el caso de que el punto anterior no funcione ingresar en consola


    ```bash
    mongo
    ```



      ```bash 
      use database
      ```
      
      
      
      
      ``` bash
      db.users.find()   #retorna usuario administrador 
      ``` 
  
 
 
 ## Inicializar servidor 
 
 Ejecutar comando 
 ``` bash
 node server.js
  ```
 
 
 
 
 Se comenzará a ejecutar en el puerto 3000
 
 
 
 ## Usuarios
 
 ---> Crear un nuevo usuario
 
 
  ``
   POST /register
  ``
  
  
  Formato para la creacion de un nuevo usuario:
 
 
  ```
  {
      username: String,
    
      name: String,
    
      email: String,
    
     tel: String,
    
     address: String,
    
     password: String
     
  }
  ```
 
 
  Respuesta esperada 
  ```
    Usuario agregado
  ```
 
 
  En el caso de que tanto el email como el name ya existan se mostrara en pantalla
 
 
  ```
   Usuario ya existe
 ```
 
 
---> Inicio de sesión con un usuario existente
 
 
 ```
  POST / login
```


En el caso de que se acceda a la sesión se retorna un token de usuario


En caso contrario se retornará 


```
 Usuario no encontrado 
```


---> Actualizar usuario existente 


```
PATCH /user/:id

```


Agregar los parametros que desea editar.
El token proporcionado en la solicitud de inicio de sesión es necesario para comprobar el usuario que intenta actualizar información.


---> Eliminar usuario


```
  DELETE user/:id
```


---> Obtener usuarios


```
GET /user
```


## Solicitudes de productos 


---> Crear un nuevo producto


Tenga en cuenta que SOLO un usuario con el rol de Administrador puede crear un nuevo producto, y no puede haber ningún producto repetido.


```
GET /product
```


Formato de producto


```
{
    name: String,
    price: Number,
    img: String
 
}

```


Respuesta esperada


```
Producto agregado

```


---> Editar producto por ID


Usuario con rol de administrador puede editar productos por ID


```
PATCH /product/:id
```


---> Eliminar producto por ID


Usuario con rol de administrador puede eliminar producto por ID


```
DELETE /product/id
```


---> Obtener productos


Usuario con rol de administrador puede obtener productos


```
GET /product
```


--->Obtener producto por ID


Usuario con rol de administrador puede obtener producto por ID


```
GET /product/:id
```


## Productos favoritos


---> Agregar producto favorito


Usuario con rol de administrador puede agregar producto favorito


```
POST /favorite
```

Respuesta esperada


```
Producto favorito agregado
```


---> Eliminar producto favorito por ID


Usuario con rol de administrador puede eliminar producto favorito por ID


```
DELETE /favorite/:id
```


## Ordenes
.

---> Crear una nueva orden


Usuario con rol de usuario puede crear una nueva orden


```
POST /order 
```


Formato de orden


```
{
   usernameId : string,
   productsId : type string array,
   payment_methodId: string,
   delivery_address : atring
   
}
```


Respuesta esperada


```
 Orden agregada
```


---> Obtener pedidos


Usuario con rol de administrador tiene acceso a todos los pedidos.


```
 GET /order
```


---> Editar pedido por id


Usuario con rol de administrador tiene acceso a editar pedidos.


```
PATCH order/:id
```


---> Eliminar orden


Usuario con rol de administrador tiene acceso a eliminar pedidos.


```
DELETE order/:id
```


---> Obtener orden por id


Usuario con rol de administrador tiene acceso a obtener orden por id


```
GET /order/:id
```


---> Obtener orden 


Usuario con rol de usuario solo podra ver sus pedidos


```
GET /myorder
```


---> Obtener orden por id


Usuario con rol de usuario solo podra ver su pedido por id


```
GET /myorder/:id
```


---> Agregar estado de orden


Usuario con rol de administrador puede agregar un estado


```
POST /order/status
```


Formato de estado de orden


```
{
    description: string
    
 }
```


---> Obtener estado de los pedidos


Usuario con rol de administrador puede obtener estado de los pedidos


```
GET /order/status
```


---> Editar estado de un pedido


Usuario con rol de administrador puede editar estado de pedidos


```
PATCH /order/status/:id
```


Formato de estado de orden


```
{
    description: ID del estado del pedido a modificar
    
}
```


---> Eliminar estado de un pedido


```
DELETE /order/status/:id
```


## Roles


---> Agregar rol


Usuario con rol de administrador puede agregar un rol


```
POST /role
```


Formato de rol


```
{
    description: string
   
}
```


---> Obtener todos los roles


Usuario con rol de administrador puede obtener todos los roles


```
GET /role
```


---> Editar rol


Usuario con rol de administrador puede editar rol 


```
PATCH /role/:id
```

---> Eliminar rol


Usuario con rol de administrador puede eliminar rol


```
DELETE /role/:id
```


---> Obtener todos los usuarios con sus roles
 

Usuario con rol de administrador puede obtener los usuarios con sus roles


```
GET /user/role
```

---> Editar un usuario y rol por su ID


Usuario con rol de administrador puede editar un usuario y rol por su ID


```
PATCH /user/role/:id
```

---> Eliminar un usuario y rol por su ID


```
DELETE /user/role/:id
```


## Métodos de pago


---> Agregar método de pago


Usuario con rol de administrador puede agregar método de pago


```
POST /payment
```


Formato de método de pago


```
{
    description: string
    
}
```


---> Obtener métodos de pago


Usuario con rol de administrador puede obtener todos los métodos de 


```
GET /payment
```


---> Editar método de pago


Usuario con rol de administrador puede editar método de pago


```
PATCH /payment/:id
```

---> Eliminar método de pago


Usuario con rol de administrador puede eliminar método de pago


```
DELETE /payment/:id
```


---> Obtener método de pago por ID


Usuario con rol de administrador puede obtener método de pago por ID


```
GET /payment/:id
```






