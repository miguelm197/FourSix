const express = require("express");
const app = express();
const router = express.Router();

// Controladores
const Login_ctrl = require("../controllers/login_controller");



// LOGIN
router.route("/login").post(Login_ctrl.login);






app.use(router);

module.exports = app;
