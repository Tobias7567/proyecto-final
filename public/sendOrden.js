const server7 = io().connect();
const sendOrden = (evt) => {
    const cliente = document.querySelector("#cliente").value;
    const mesa = document.querySelector("#mesa").value;
    const gmail = document.querySelector("#gmail").value;
    datosOrden = {
      cliente: cliente,
      mesa: mesa,
      gmail : gmail
    };
    console.log(datosOrden);
    server7.emit("orden-nueva", datosOrden);

    return false
  };