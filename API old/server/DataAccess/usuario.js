const { DBACCESS } = require("./index");
const { PERSONA, USUARIO } = require("./mapeado");

const altaUsuario = async (usuario) => {
  let PER = new PERSONA(usuario);
  let USR = new USUARIO(usuario);

  try {
    let insertPersona = await DBACCESS(` 
      INSERT INTO PERSONA (Nombre, Apellido, Email, Borrado)
      VALUES ('${PER.Nombre}', '${PER.Apellido}', '${PER.Email}', 0); 
      SELECT SCOPE_IDENTITY() AS IdPersona  `);

    let IdPersona = insertPersona.Data[0].IdPersona;

    await DBACCESS(` 
      INSERT INTO USUARIO  (IdPersona, Usuario, IdRol, Contrasena, Habilitado, Borrado)
      VALUES (${IdPersona}, '${USR.Usuario}', 1, '${USR.Contrasena}', 1, 0) `);

    let usuarioInsertado = await consultaUsuarioPorId(IdPersona);

    return usuarioInsertado;
  } catch (error) {
    return error;
  }
};

const consultaUsuarioPorUsuario = (usuario = "") => {
  return new Promise((resolve) => {
    let queryDB = ` SELECT * FROM usuario WHERE usuario ='${usuario}'`;

    DBACCESS(queryDB).then((data) => {
      resolve(data);
    });
  });
};

const consultaUsuarioPorEmail = (email = "") => {
  return new Promise((resolve) => {
    let queryDB = ` SELECT * FROM persona WHERE email ='${email}'`;

    DBACCESS(queryDB).then((data) => {
      resolve(data);
    });
  });
};

const consultaUsuarioPorId = (id) => {
  return new Promise((resolve) => {
    let queryDB = ` SELECT * FROM PERSONA 
      INNER JOIN USUARIO ON PERSONA.Id = USUARIO.IdPersona
      WHERE PERSONA.Id = ${id}`;

    DBACCESS(queryDB).then((data) => {
      resolve(data);
    });
  });
};

module.exports = { altaUsuario, consultaUsuarioPorUsuario, consultaUsuarioPorEmail };
