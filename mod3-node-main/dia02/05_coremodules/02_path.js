const path = require("path");

const directory = "../uploads";
const file_from_db = "foto.png";

const dir = path.join(__dirname, directory, file_from_db);

console.log(dir);

const basenameExt = path.basename(dir);
const basename = path.basename(dir, ".png");

console.log(basenameExt);
console.log(basename);

const p = "/Users/stefano/Hackaboss/JSB09RT/mod6-backend/uploads/foto.png";

// Saca el directorio donde está el fichero
console.log("Directorio fichero:", path.dirname(p));

// Sacar la extensión de un fichero
console.log("Ext. fichero:", path.extname(p));

const path_regular = "/home/stefano/../usuario/./uploads/../2010/docs.pdf";

console.log("Path sin normalize:", path_regular);
console.log("Path con normalize:", path.normalize(path_regular));
