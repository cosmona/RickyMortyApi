const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const path_photos = path.join(__dirname, "photos");

    try {
      await fs.access(path_photos);
    } catch (error) {
      throw new Error("El directorio no existe o no tengo permisos");
    }

    const dirContent = await fs.readdir(path_photos);

    for (const elemento of dirContent) {
      //   console.log(elemento);

      const pathElemento = path.join(path_photos, elemento);

      const info = await fs.stat(pathElemento);

      if (info.isFile()) {
        console.log(`${elemento}: es un fichero`);
      } else if (info.isDirectory()) {
        console.log(`${elemento}: es una directory`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();
