const fs = require("fs");

const Utils = {
   /**
    * ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
    */
   permitirCrossDomain: (req, res, next) => {
      //en vez de * se puede definir SÓLO los orígenes que permitimos
      res.header("Access-Control-Allow-Origin", "*");

      //metodos http permitidos para CORS
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
   },

   /**
    * Retorna el archivo leido en formato `String`.
    * @param {String} path Ruta del archivo que se quiere leer
    */
   leerArchivo(path) {
      return new Promise((resolve, reject) => {
         fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
               console.log("ERROR AL LEER ARCHIVO " + path);
               console.log(err + "\n\n\n");
               reject(err);
            } else {
               console.log(" ARCHIVO LEIDO CORRECTAMENTE \n");
            }

            resolve(data);
         });
      });
   },

   leerArchivoJson(path) {
      try {
         let extension = path.split(".")[path.split(".").length - 1];
         path = extension !== "json" ? path + ".json" : path;

         let cjson = fs.readFileSync(path);
         return JSON.parse(cjson);
      } catch (error) {
         if (error.toString().indexOf("SyntaxError") >= 0) {
            console.log("ERROR en el formato del archivo  -  " + path);
         } else {
            console.log("ERROR al intenetar leer el archivo " + path);
         }

         return error;
      }
   },

   guardarArchivoJson(path, content) {
      return new Promise((resolve, reject) => {
         fs.writeFile(path, JSON.stringify(content), (err) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
               resolve(true);
            }
         });
      });
   },

   /**
    * Transforma y retorna el formato de fecha (String 24/08/20 -> String 2020/08/24).
    */
   parseFecha: (fecha) => {
      let secciones = fecha.split("/");
      return `20${secciones[2]}-${secciones[1]}-${secciones[0]}`;
   },

   /**
    * Retorna un número exadecimal aleatorio de 32 dígitos
    * Ejemplo: 54875d4e3b8b4b2fb49c1b9bdbafdf31
    */
   generarUID: () => {
      var d = new Date().getTime();
      var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
         var r = (d + Math.random() * 16) % 16 | 0;
         d = Math.floor(d / 16);
         return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
   },

   abrirNavegadorWeb: (url) => {
      (async () => {
         await open(url, { allowNonzeroExitCode: true });
      })();
   },

    setDefaultDataClass: (clase, datos) => {
       console.log(clase)
       if (datos) {
            Object.keys(datos).forEach((key) => {
                try { clase[key] = datos[key] } catch (e) { }
          });
        }
   }
  
};

module.exports = Utils;
