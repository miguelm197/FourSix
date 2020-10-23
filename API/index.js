const config = require("./Config/Configuracion");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();




//ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
function perimitirCrossDomain(req, res, next) {
   //en vez de * se puede definir SÓLO los orígenes que permitimos
   res.header('Access-Control-Allow-Origin', '*');

   //metodos http permitidos para CORS
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 }


 // Middlewares
app.use(perimitirCrossDomain);

// Parsea application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración global de rutas
app.use(require("./routes/Router"));

app.get("/", function (req, res) {
   res.json("Hello World");
});

config.cargarConfiguracion();

app.listen(config.GENERAL.puertoServidor, () => {
    console.log("Escuchando el puerto " + config.GENERAL.puertoServidor);
    console.log("localhost:" + config.GENERAL.puertoServidor + "/")
});
