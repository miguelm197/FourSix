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
router.route("/Proveedor/:id").get(Proveedores_Ctrl.ObtenerProveedorPorId);
router.route("/BorrarProveedor/:id").delete(Proveedores_Ctrl.BajaProveedor);

// Clientes
router.route("/cliente/btenerClientes").get(Clientes_Ctrl.ObtenerClientes);
router.route("/cliente/alta").post(Clientes_Ctrl.AltaCliente);
router.route("/cliente/:id").get(Clientes_Ctrl.ObtenerClientePorId);
router.route("/cliente/:id").put(Clientes_Ctrl.EditarCliente);
router.route("/cliente/:id").delete(Clientes_Ctrl.BajaCliente);

app.use(router);

module.exports = app;
