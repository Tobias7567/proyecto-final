const server = io().connect();

const mod = () => {
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
}

const render = (productos) => {
  let administrador = true;
  if (administrador) {
    let listado = document.querySelector("#listado");
    let html = productos.map((prod) => {
      return `<tbody> 
                    <tr>
                         <th scope="row">${prod.id} </th>
                         <td>${prod.nombre}</td>
                         <td>${prod.precio}</td>
                         <td>${prod.descripcion}</td>
                         <td><input type="submit" class="borrar-producto" id="${prod.id}" value="x"></td>;
        </tr>
    </tbody>`;
    })
    listado.innerHTML = html.join(" ");
    mod()
  } else {
    let listado = document.querySelector("#listado");
    let html = productos.map((prod) => {
      return `<tbody> 
                    <tr>
                       
                         <td>${prod.nombre}</td>
                         <td>${prod.precio}</td>
                         <td>${prod.descripcion}</td>
                        
        </tr>
    </tbody>`;
    });
    listado.innerHTML = html.join(" ");
  }
};
server.on("mensaje-servidor", (mensaje) => {
  render(mensaje.productos);
});
server.on("mensaje-servidor2", (mensaje) => {
  render(mensaje.productos);
});

