const server10 = io().connect();
let ordenes = document.querySelector("#ordenes");
const render = (datos) => {
  if (datos !== undefined) {
    ordenes.innerHTML = ""
    let html = datos.map((dat) => {
      let row = document.createElement("tr");
      row.innerHTML = `<td > ${dat.cliente}  </td>
                    <td class ="tddejs" > ${dat.mesa}  </td>`
      ordenes.appendChild(row);
      for(let i = 0 ; i < dat.productos.length ; i++){
        let raw = document.createElement("tr");
        raw.innerHTML = `<td > ${dat.productos[i].nombre}  </td>
                      <td class ="tddejs" > ${dat.productos[i].precio} </td>
                      <td class ="tddejs" >cantidad: ${dat.productos[i].cantidad} </td>`
        ordenes.appendChild(raw);
      }
})

}
 // for(let i = 0 ; i < dat.productos.length ; i++){}

   else {


    let html = `
         <h3>no hay ordenes</h3>
          `;
    ordenes.innerHTML = html;
  }
};

server10.on("mensaje-servidor10", (mensaje) => {
  render(mensaje.datos);
});

