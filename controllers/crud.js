//Invocamos a la conexion de la DB
const conexion = require("../database/db");
//GUARDAR un REGISTRO
exports.save = (req, res) => {
  const firstname = req.body.firstname;
  const lastname1 = req.body.lastname1;
  const lastname2 = req.body.lastname2;
  const email = req.body.email;
  const phone = req.body.phone;
  conexion.query(
    "INSERT INTO users SET ?",
    {
      firstname: firstname,
      lastname1: lastname1,
      lastname2: lastname2,
      email: email,
      phone: phone,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(results);
        res.redirect("/");
      }
    }
  );
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res) => {
  const id = req.body.id;
  const firstname = req.body.firstname;
  const lastname1 = req.body.lastname1;
  const lastname2 = req.body.lastname2;
  const email = req.body.email;
  const phone = req.body.phone;
  conexion.query(
    "UPDATE users SET ? WHERE id = ?",
    [
      {
        firstname: firstname,
        lastname1: lastname1,
        lastname2: lastname2,
        email: email,
        phone: phone,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};
