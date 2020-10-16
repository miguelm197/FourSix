const { DBACCESS } = require("./index");

const consultaClientes = (desde, hasta) => {
  return new Promise((resolve) => {
    let queryDB = ` SELECT * FROM PERSONA 
        INNER JOIN CLIENTE ON PERSONA.Id = CLIENTE.IdPersona
        WHERE PERSONA.Id = ${id} ORDER BY PERSONA.Id
        OFFSET ${desde} ROWS FETCH NEXT ${hasta} ROWS ONLY;`;

    DBACCESS(queryDB).then((data) => {
      resolve(data);
    });
  });
};

module.exports = { consultaClientes };
