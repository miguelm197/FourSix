var config = require("../config/configuracion");
const mssql = require("mssql");

/**
 * Función que ejecuta una query en la BD
 * @param {String} consulta (String) Query a ejecutar
 * @param {Function} callback (Function) Función que se ejecuta al realizar la query  (err, result)
 */
exports.query = function (consulta, callback) {
  mssql
    .connect(config.DATABASE)
    .then((pool) => {
      let result = pool.request().query(consulta);
      mssql.close();
      return result;
    })
    .then((result) => {
      mssql.close();
      callback(false, result.recordset);
    })
    .catch((err) => {
      console.log("error handler");
      mssql.close();
      callback(err);
    });
};
