const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123qweasd",
  database: "db",
});
conexion.connect((error) => {
  if (error) {
    console.error("El error de conexión es: " + error);
    return;
  }
  console.log("¡Conectado a la Base de Datos!");
});
module.exports = conexion;
