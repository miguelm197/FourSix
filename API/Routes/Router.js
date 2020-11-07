const express = require("express");
const app = express();
const router = express.Router();

// Controladores
const Proveedores_Ctrl = require("../controllers/Proveedores_Controller");
const Clientes_Ctrl = require("../Controllers/Clientes_Controller");

// Proveedores
router.route("/AltaProveedor").post(Proveedores_Ctrl.AltaProveedor);
router.route("/EditarProveedor/:id").put(Proveedores_Ctrl.EditarProveedor);
router.route("/ObtenerProveedores").post(Proveedores_Ctrl.ObtenerProveedores);

// Clientes
router.route("/AltaCliente").post(Clientes_Ctrl.AltaCliente);
router.route("/ObtenerClientes").get(Clientes_Ctrl.ObtenerClientes);

app.use(router);

module.exports = app;
