const express = require("express");
const app = express();
const router = express.Router();

// Controladores
const Login_ctrl = require("../controllers/login_Ctrl");
const RegistroUsuario = require("../controllers/registroUsuario_Ctrl");



// LOGIN
router.route("/login").post(Login_ctrl.login);

// REGISTRO USUARIO
router.route("/signup").post(RegistroUsuario.registroUsuario);




app.use(router);

module.exports = app;
