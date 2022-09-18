const { Console } = require("console");
const fs = require("fs");
const { options } = require("./mariaDB/conextionDB");
const knex = require("knex")(options);
class conteinerCarro {
  async crearTabla() {
    try {
      await knex.schema.createTable("Car", (table) => {
        table.increments("id");
        table.string("nombre");
        table.string("url");
        table.string("precio");
        table.string("hora");
        table.string("seccion");
        table.string("cantidad");
      });
    } catch (error) {
      console.log(error);
    }
  }
  async guardar(obj) {
    try {
      
      await knex("Car").insert({
        nombre: obj.nombre,
        precio: obj.precio,
        url: obj.url,
        hora: obj.hora ,
        seccion: obj.seccion ,
        cantidad: obj.cantidad
      });
      return console.log("guardado con  exito");
    } catch (error) {
      console.log(error);
    }
  }
  async modificar(obj) {
    try {
    let cantidadNueva = (obj.cantidad)
   await knex.from('car').where('nombre', obj.nombre).update({
 cantidad: 3
    })
    } catch (error) {
      console.log(error);
    }
  }
  async ver() {
    try {
      let rows = await knex().from("Car").select("*")
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async borrarDefinitivo(id){
    try {
    await  knex.from('car').where('id', '=', id).del()
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = conteinerCarro;