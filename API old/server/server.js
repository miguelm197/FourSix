require("./config/config");

const config = require("./config/configuracion");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Parsea application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración global de rutas
app.use(require("./routes/index"));

app.get("/", function (req, res) {
  res.json("Hello World");
});

config.cargarConfiguracion();

app.listen(config.GENERAL.puertoServidor, () => {
  console.log("Escuchando el puerto " + config.GENERAL.puertoServidor);
});
