const config = require("../Config/Configuracion").cargarConfiguracion();
const { DataBaseResult } = require("../Entities/Genericos");

const sql = require("mssql");

const DBACCESS = async function (consulta) {
   let dbResult = new DataBaseResult();

   console.log(". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .");
   console.log("\n" + consulta + "\n");
   console.log(". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .");

   try {
      let pool = await sql.connect(config.DATABASE);
      let res = await pool.request().query(consulta);

      dbResult.Data = res.recordset;
      dbResult.Cant = res.rowsAffected[0];
      dbResult.Output = res.output;
      dbResult.RowsAffected = res.rowsAffected;
   } catch (err) {
      dbResult.Error = err;
      dbResult.ErrorDetail = err;
      dbResult.Message = err.toString();
   } finally {
      return dbResult;
   }
};

module.exports = { DBACCESS };
