const config = require("../config/configuracion").cargarConfiguracion();
const { DataBaseResult } = require("../entidades/Genericos");

const sql = require("mssql");

const DBACCESS = async function (consulta) {
  let dbResult = new DataBaseResult();

  try {

    let pool = await sql.connect(config.DATABASE);
    let res = await pool.request().query(consulta);

    dbResult.Data = res.recordset;
    dbResult.Cant = res.rowsAffected[0];
    dbResult.Output = res.output;
    dbResult.RowsAffected = res.rowsAffected;
  } catch (err) {
    dbResult.Error = err;
    dbResult.Message = err.toString();
  } finally {
    return dbResult;
  }
};

module.exports = { DBACCESS };
