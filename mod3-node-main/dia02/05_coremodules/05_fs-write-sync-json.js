const path = require("path");
const fs = require("fs");

// NOTA: uso métodos síncronos (no recomendado en un entorno de peticiones http)

// Datos a escribir
const data = { "provincias": ["lugo", "coruña", "ourense", "pontevedra"]}

// Creo la ruta donde escribir
const output = path.join(__dirname, "file.json");

// Escribo los datos en la ruta (convertidos a String)
fs.writeFileSync(output, JSON.stringify(data));

console.log("El fichero json está escrito");
