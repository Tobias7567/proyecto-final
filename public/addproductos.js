const server1 = io().connect();

const addProduct = (evt) => {
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const descripcion = document.querySelector("#descripcion").value;
  let hora = new Date().toLocaleTimeString();

  const producto = { nombre, precio, descripcion, hora };
  // console.log(producto)
  server1.emit("producto-nuevo", producto);
  return false;
};


