const fs = require("fs").promises;
const path = require("path");

// fs.access accede a un fichero (y si da error el fichero no existe o no se puede leer)
// fs.unlink borra un fichero

async function main() {
  try {
    // const path_file = path.join(__dirname, "hola.txt");
    const path_file = path.join(__dirname, "..", "file.json");
    await fs.unlink(path_file);
    console.log("Fichero borrado");
  } catch (error) {
    console.error(error.message);
  }
}

main();
