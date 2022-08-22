const { response } = require("express");
const express = require("express");
const Conteiner = require("./Conteiner");
const exp = require("constants");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const port = process.env.PORT || 4000;
const conteiner = new Conteiner("Trabajo.txt");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

io.on("connection", async (socket) => {
  let productos = await conteiner.bringAll();
  const mensaje = {
    productos,
  };
  socket.emit("mensaje-servidor", mensaje);


  //modificar producto
  socket.on("producto-nuevo", async (producto) => {
    conteiner.save(producto);
    let productos = await conteiner.bringAll();
    const mensaje = {
      productos,
    };
    io.sockets.emit("mensaje-servidor", mensaje);
  });

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
console.log(idParse)
 conteiner.deleteForId(idParse)
 //enviamos la lista de productos nueva
 let productos = await conteiner.bringAll();
 const mensaje = {
   productos,
 };
 io.sockets.emit("mensaje-servidor2", mensaje);
   });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



