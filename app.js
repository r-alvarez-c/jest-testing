const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set('port',process.env.PORT || 3000)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./router"));

app.listen(app.get('port'), () => {
  console.log("SERVER corriendo en puerto "+app.get('port'));
});
