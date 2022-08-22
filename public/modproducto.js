
const server2 = io().connect();


const modproducto = (evt) => {
  const id = document.querySelector("#id").value;
  const nombre = document.querySelector("#nombremod").value;
  const precio = document.querySelector("#preciomod").value;
  const descripcion = document.querySelector("#descripcionmod").value;

  const producto = {id, nombre, precio, descripcion };
  // console.log(producto)
  server2.emit("producto-modificado", producto)
  return false;
};

/* Listening for a message from the server. */
