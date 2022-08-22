const server1 = io().connect();

const addProduct = (evt) => {
  console.log("llega")
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const descripcion = document.querySelector("#descripcion").value;

  const producto = { nombre, precio, descripcion };
  // console.log(producto)
  server1.emit("producto-nuevo", producto)
    return false;
  ;

} 

/* Listening for a message from the server. */


