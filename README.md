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

4) Copiar el path del archivo "initBD" que se encuentra en el repositorio y ejecutarlo en otra consola


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
