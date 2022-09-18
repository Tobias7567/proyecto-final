const server6 = io().connect();
const formSendOrden = () => {
  let sendUbi = document.querySelector("#sendUbi");
  let formSend = ` <div>
  <h2>Agregar producto</h2>
  <div>
    <form
      onsubmit="return sendOrden(this)"
      class="mt-5"
      action="http://localhost:4000/carrito"
    >
      <div class="form-group">
        <label for="nombre">Nombre completo:</label>
        <input
          type="text"
          class="form-control"
          id="cliente"
          required="required"
          name="cliente"
          placeholder="Nombre"
        />
        <div class="form-group">
        <label for="nombre">Numero de mesa:</label>
        <input
          type="number"
          class="form-control"
          id="mesa"
          required="required"
          name="mesa"
          placeholder="numero de mesa"
        />
        <div class="form-group">
        <label for="nombre">Gmail:</label>
        <input
          type="number"
          class="form-control"
          id="gmail"
          required="required"
          name="gmail"
          placeholder="Gmail"
        />
      </div>
      <br />
      <input type="submit"  value="Enviar orden" />
    </form>
  </div>
 `;

  sendUbi.innerHTML = formSend;
};


const render = (productos) => {

  if (productos !== undefined) {
    formSendOrden();
    let listado = document.querySelector("#listado");

    let html = productos.map((prod) => {
      return `
              <div class="card" style="width: 18rem;">
                             <img  id="url" src=${prod.url}>
                             <h5 class="card-title">${prod.id}</h5>
                             <h5 class="card-title" id="nombre">${prod.nombre}</h5>
                             <h5 class="card-title" id="precio">${prod.precio}</h5>
                             <h5 class="card-title" id="cantidad">${prod.cantidad}</h5>
                             <input type="submit" class="borrar-producto" id="${prod.id}" value="x"/>
         </div>
        `;
    });
    listado.innerHTML = html.join(" ");
  } else {
    let listado = document.querySelector("#listado");

    let html = `
       <h3>no hay productos en el carrito</h3>
        `;
    listado.innerHTML = html;
  }
};

server6.on("mensaje-servidor6", (mensaje) => {
  render(mensaje.productos);
});

