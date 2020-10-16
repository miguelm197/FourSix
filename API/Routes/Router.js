const express = require("express");
const app = express();
const router = express.Router();

// Controladores
const Proveedores_Ctrl = require("../controllers/Proveedores_Controller");



// Alta Proveedor
 router.route("/altaProveedor").post(Proveedores_Ctrl.AltaProveedor);

app.use(router);

module.exports = app;
