const { response } = require("express");
const express = require("express");
const Conteiner = require("./Conteiner");
const exp = require("constants");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { Router } = express;
const routerProductos = Router();
const app = express();
const port = process.env.PORT || 4000;
const conteiner = new Conteiner("Trabajo.txt");
const carrito = new Conteiner("carrito.txt")
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

console.log(__dirname)
routerProductos.get("/", (req, res) => {
    res.sendFile("index.html");
});
routerProductos.get("/carrito",  (req, res) => {
  try {
    res.sendFile("index.html", { root: __dirname });
  } catch (error) {
    console.log(error)
  }

});

io.on("connection", async (socket) => {
  console.log(socket.id)
  let productos = await conteiner.bringAll();
  const mensaje = {
    productos,
  };
  socket.emit("mensaje-servidor", mensaje);

  
  socket.on("producto-nuevo", async (producto) => {
    console.log(producto)
    conteiner.save(producto);
    let productos = await conteiner.bringAll();
    const mensaje = {
      productos,
    };
    io.sockets.emit("mensaje-servidor", mensaje);
  });
//modificar producto
  socket.on("producto-modificado", async (datos) => {
   console.log(datos.id)
   let producto = {
       nombre : datos.nombre ,
       precio : datos.precio,
       descripcion : datos.descripcion
   }
conteiner.upById({id: parseInt(datos.id) , ...producto })
//enviamos la lista de productos nueva
let productos = await conteiner.bringAll();
const mensaje = {
  productos,
};
io.sockets.emit("mensaje-servidor2", mensaje);
  });

// delete for id
  socket.on("producto-borrar", async (id) => {
idParse = parseInt(id)
 conteiner.deleteForId(idParse)
 //enviamos la lista de productos nueva
 let productos = await conteiner.bringAll();
 const mensaje = {
   productos,
 };
 io.sockets.emit("mensaje-servidor2", mensaje);
   });
   

   //agregar al carrito
   socket.on("agregar-carrito", async (producto) => {
carrito.save(producto)
   console.log(producto)
  });
  //mostrar productos del carrito 

});
io.on("connection", async (socket) => {

  let productos = await carrito.bringAll();
  const mensaje = {
    productos,
  };
  socket.emit("mensaje-servidor6", mensaje);

  // delete for id carrito
  socket.on("producto-borrar-carrito", async (id) => {
    idParse = parseInt(id)
     carrito.deleteForId(idParse)
     //enviamos la lista de productos nueva de carrito 
     let productos = await carrito.bringAll();
     const mensaje = {
       productos,
     };
     io.sockets.emit("mensaje-servidor7", mensaje);
       });
})
app.use("/", routerProductos)




httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



