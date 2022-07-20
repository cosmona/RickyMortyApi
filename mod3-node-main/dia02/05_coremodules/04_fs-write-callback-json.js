const fs = require("fs");
const path = require("path");

const file = "data.json";

const content = {
  date: "13/07/2022",
  userName: "Stefano",
};

fs.writeFile(path.join(__dirname, file), JSON.stringify(content), (error) => {
  if (error) {
    console.error("El fichero no pudo ser escrito");
  } else {
    console.log("El fichero fué escrito correctamente");
  }
});
