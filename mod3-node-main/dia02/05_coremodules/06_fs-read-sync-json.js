
// Metodo corto
//const json = require("./file.json");
//console.log(json.provincias);

// Método largo

const path = require("path");
const fs = require("fs");

try {
   // Creo la ruta al fichero
   const file = path.join(__dirname, "file.json");

   // Leo *sincronamente* la ruta
   const fileData = fs.readFileSync(file, "utf-8");

  // Convierto a json los contenidos leídos
  const json = JSON.parse(fileData);

  console.log(json.provincias);
  
} catch (error) {
  console.error(error);
}
