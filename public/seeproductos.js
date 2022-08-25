const server = io().connect();

const modFormProducto = () => {
  let modificarubi = document.querySelector("#modificarubi");
  let modproducto = `<h2>modificar producto</h2>
      <form
        onsubmit="return modproducto(this)"
        class="mt-5"
        action="http://localhost:4000"
      >
        <div class="form-group">
          <label for="id">id del producto</label>
          <input
            type="number"
            class="form-control"
            id="id"
            required="required"
            name="id"
            placeholder="id del producto"
          />
        </div>
        <div class="form-group">
          <label for="nombre">Nombre producto:</label>
          <input
            type="text"
            class="form-control"
            id="nombremod"
            required="required"
            name="nombre"
            placeholder="Nombre"
          />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <input
            type="number"
            class="form-control"
            id="preciomod"
            required="required"
            name="precio"
            placeholder="Precio"
          />
        </div>
        <div class="form-group">
          <label for="descripcion"> descripcion:</label>
          <input
            type="text"
            class="form-control"
            required="required"
            id="descripcionmod"
            name="descripcion"
            placeholder="descripcion"
          />
        </div>
        <br />
        <div class="agregar-producto">
        <input type="submit" value="mod Product" />
      </div>
      </form>
   `;

  modificarubi.innerHTML = modproducto;
};
const formAddProducto = () => {
  let addUbi = document.querySelector("#ubiFormAdd");
  let formAddProducto = ` <div>
  <h2>Agregar producto</h2>
  <div>
    <form
      onsubmit="return addProduct(this)"
      class="mt-5"
      action="http://localhost:4000"
    >
      <div class="form-group">
        <label for="nombre">Nombre producto:</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required="required"
          name="nombre"
          placeholder="Nombre"
        />
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input
          type="number"
          class="form-control"
          id="precio"
          required="required"
          name="precio"
          placeholder="Precio"
        />
      </div>
      <div class="form-group">
        <label for="descripcion">descripcion:</label>
        <input
          type="text"
          class="form-control"
          required="required"
          id="descripcion"
          name="descripcion"
          placeholder="descripcion"
        />
      </div>
      <br />
      <input type="submit"  value="Add Product" />
    </form>
  </div>
 `;

  addUbi.innerHTML = formAddProducto;
};

 const render = (productos) => {
  console.log(productos)
  let administrador = true;
  if (administrador) {
    let listado = document.querySelector("#listado");

    let html = productos.map((prod) => {
      return `
          <div class="card" style="width: 18rem;">
                         <h5 class="card-title">${prod.id} </h5>
                         <h5 class="card-title" id="nombre">${prod.nombre}</h5>
                         <h5 class="card-title" id="precio">${prod.precio}</h5>
                         <h5 class="card-title"id="descripcion">${prod.descripcion}</h5>
                         <h5 class="card-title">${prod.hora}</h5>
                         <input type="submit" class="agregar-carrito"  value="agregar al carrito"/>
                         <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>        
           </div>
    `;
    });
    listado.innerHTML = html.join(" ");
    formAddProducto();
    modFormProducto();

  
  } else {
    let listado = document.querySelector("#listado");
    let html = productos.map((prod) => {
      return `   <div class="card" style="width: 18rem;">
                            <h5 class="card-title" id="nombre">${prod.nombre}</h5>
                            <h5 class="card-title" id="precio">${prod.precio}</h5>
                            <h5 class="card-title"id="descripcion">${prod.descripcion}</h5>
                            <h5 class="card-title">${prod.hora}</h5>
                            <input type="submit" class="agregar-carrito"  value="agregar al carrito"/>
                            <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>
     
                      </div>`;
    });
    listado.innerHTML = html;
  }
};
server.on("mensaje-servidor", (mensaje) => {
  console.log("holaa")
  render(mensaje.productos);
});

server.on("mensaje-servidor2", (mensaje) => {
  console.log("soy 2")
  render(mensaje.productos);
})





