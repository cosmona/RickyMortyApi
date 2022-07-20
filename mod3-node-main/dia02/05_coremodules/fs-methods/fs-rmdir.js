const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const path_dir = path.join(__dirname, "dirA");

    // DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed.
    // Use fs.rm(path, { recursive: true }) instead

    // await fs.rmdir(path_dir, {
    //   recursive: true,
    // });

    await fs.rm(path_dir, {
      recursive: true,
    });

    console.log("Directorio eliminado");
  } catch (error) {
    console.log(error.message);
  }
}

main();
