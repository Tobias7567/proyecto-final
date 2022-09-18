const { response } = require("express");
const express = require("express");
const Conteiner = require("./rutas/contenedores/ConteinerArchivo");
const ConteinerMongo = require("./rutas/contenedores/ConteinerMongo");
const conteinerCarro = require("./conteinerCarro")
const mongoConnect = require("conect/ConectMongo.js")
const exp = require("constants");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { Router } = express;
const routerProductos = Router();
const app = express();
const port = process.env.PORT || 4000;
const conteiner = new Conteiner();
const carrito = new conteinerCarro()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
mongoConnect()
app.use(express.static("public"));

routerProductos.get("/", (req, res) => {
  try{
    res.sendFile("index.html");
  }
  catch(error){ 
    console.log(error)
  }

});
routerProductos.get("/carrito",  (req, res) => {
  try {
    res.sendFile("index.html", { root: __dirname });
  } catch (error) {
    console.log(error)
  }
});
routerProductos.get("/ordenes",  (req, res) => {
  try {
    res.sendFile("ordenes.html", { root: __dirname });
  } catch (error) {
    console.log(error)
  }
});

io.on("connection", async (socket) => {
  try {
    let productos = await conteiner.ver();
    const mensaje = {
      productos,
    };
    socket.emit("mensaje-servidor", mensaje);
  } catch (error) {
    console.log(error)
  }

  //produucto nuevo
  socket.on("producto-nuevo", async (producto) => {
    try {
    await conteiner.guardar(producto);
    let productos = await conteiner.ver();
    
    const mensaje = {
      productos,
    };
    io.sockets.emit("mensaje-servidor", mensaje);
    } catch (error) {
      console.log(error)
    }
   
  });
//modificar producto
  socket.on("producto-modificado", async (datos) => {
    try {
    
      let producto = {
          nombre : datos.nombre ,
          precio : datos.precio,
          url : datos.url ,
          hora : datos.hora
      }
      await conteiner.modificar({id: parseInt(datos.id) , ...producto })
    //enviamos la lista de productos nueva
    let productos = await conteiner.ver();
    const mensaje = {
     productos,
    };
    io.sockets.emit("mensaje-servidor", mensaje);
    } catch (error) {
      console.log(error)
    }
  });

// delete for id
  socket.on("producto-borrar", async (id) => {
    try {
      console.log(id)
      idParse = parseInt(id)
      console.log(idParse)
      await conteiner.borrar(idParse)
 //enviamos la lista de productos nueva
 let productos = await conteiner.ver();
 const mensaje = {
   productos,
 };
 io.sockets.emit("mensaje-servidor", mensaje);
    } catch (error) {
      console.log(error)
    }

   });
  // agregar al carrito
   socket.on("agregar-carrito", async (producto) => {
    try {
      await carrito.modificar(producto)
      let productos = await carrito.ver();
      const mensaje = {
        productos,
      };
      io.sockets.emit("mensaje-servidor6", mensaje);
    } catch (error) {
      
    }
  });

});

io.on("connection", async (socket) => {
  try {
       //mostrar productos del carrito ;
    let productos = await carrito.ver()
  
    const mensaje = {
      productos,
    };
    socket.emit("mensaje-servidor6", mensaje);
  } catch (error) {
    console.log(error)
  }
  // delete for id carrito
  socket.on("producto-borrar-carrito", async (id) => {
    try {
      idParse = parseInt(id)
      await carrito.borrarDefinitivo(idParse)
     //enviamos la lista de productos nueva de carrito 
     let productos = await carrito.ver();
     const mensaje = {
       productos,
     };
     io.sockets.emit("mensaje-servidor6", mensaje);
    } catch (error) {
      console.log(error)
    }
    
       });
      })
     /*  //enviar la orden
       socket.on("orden-nueva", async (datosOrden) => {
        try {
          let productos = await carrito.bringAll();
          nuevaOrden = {
            cliente : datosOrden.cliente ,
            mesa : datosOrden.mesa ,
            gmail : datosOrden.gmail ,
            productos : productos
          }
        await Ordenes.save(nuevaOrden)
        let datos = await Ordenes.bringAll();
        const mensaje = {
          datos,
        };
        io.sockets.emit("mensaje-servidor10", mensaje);
        
        } catch (error) {
          console.log(error)
        }
        
           });


io.on("connection", async (socket) => {
 try {
  let datos = await Ordenes.bringAll();
  const mensaje = {
    datos,
  };
  socket.emit("mensaje-servidor10", mensaje);
 } catch (error) {
  console.log(error)
 }
})
*/
app.use("/", routerProductos)




httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



