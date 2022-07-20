const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const dir = path.join(__dirname, "dirA", "dirB", "dirC");
    console.log(dir);

    await fs.mkdir(dir, {
      recursive: true,
    });

    console.log("Directorios creados");
  } catch (error) {
    console.log(error.message);
  }
}

main();
