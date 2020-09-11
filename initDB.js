
conn = new Mongo("localhost:27017");
db = conn.getDB("database");

db.dropDatabase(); //limpiar base de datos

/*coleciones de nuestro modelo de datos*/
db.createCollection("roles");
db.createCollection("users");
db.createCollection("usersroles");
db.createCollection("payment");
db.createCollection("orders");

/* Usuarios */
print("Creacion de usuarios");


userAdmin = {
  
    "_id" : ObjectId("5f5c06c895ccb077dfa93bf3"),
    "username" : "admin", 
    "name" : "Rosario Lorenzo", 
    "email" : "admin@gmail.com", 
    "tel" : "37373648", 
    "address" : "San Martin 811", 
    "password" : "admin112345" 
}
    

print("Creacion de roles");

roleAdmin = {
     
    "_id" : ObjectId("5f5bfcc2bdb7f20c68ca9475"),
    "description" : "Administrator"
};

roleUser = {
     
    "_id" : ObjectId("5f5bfccabdb7f20c68ca9476"),
    "description" : "User"
};

print("Creacion de rol administrador");

userRoleAdmin = {
     
    "id_user" : ObjectId("5f5c06c895ccb077dfa93bf3"),
    "id_rol": ObjectId("5f5bfcc2bdb7f20c68ca9475")
};


paymentMethod1 = {
     
    "_id" : ObjectId("5f5bfd01bdb7f20c68ca9477"),
    "description": "Efectivo"
};

paymentMethod2 = {
     
    "_id" : ObjectId("5f5bfd04bdb7f20c68ca9479"),
    "description": "Débito"
};

paymentMethod3 = {
     
    "_id" : ObjectId("5f5bfd01bdb7f20c68ca9478"),
    "description": "Crédito"
};


orderStatus1 = {
     
    "_id" : ObjectId("5f5bfd2bbdb7f20c68ca947a"),
    "description": "Nuevo"
};

orderStatus2 = {
     
    "_id" : ObjectId("5f5bfd2bbdb7f20c68ca947b"),
    "description": "Confirmado"
};

orderStatus3 = {
     
    "_id" : ObjectId("5f5bfd2bbdb7f20c68ca947c"),
    "description": "En preparación"
};

orderStatus4 = {
     
    "_id" : ObjectId("5f5bfd2bbdb7f20c68ca947d"),
    "description": "En camino"
};

orderStatus5 = {
     
    "_id" : ObjectId("5f5bfd2cbdb7f20c68ca947e"),
    "description": "Entregado"
};


print("Guardando usuarios");
db.users.save(userAdmin);


print("Guardando roles");
db.roles.save(roleAdmin);
db.roles.save(roleUser);

print("Guardando rol de usuarios");
db.usersroles.save(userRoleAdmin);

print("Guardando metodos de pago");
db.paymentmethods.save(paymentMethod1);
db.paymentmethods.save(paymentMethod2);
db.paymentmethods.save(paymentMethod3);

print("Guardando estado de ordenes");
db.orderstatus.save(orderStatus1);
db.orderstatus.save(orderStatus2);
db.orderstatus.save(orderStatus3);
db.orderstatus.save(orderStatus4);
db.orderstatus.save(orderStatus5);


print("SCRIPT FINISHED");
