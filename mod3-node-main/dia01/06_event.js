"use strict";
let count = 0;

process.title = "Clase node";

let intervalId = setInterval(() => {
  console.log(count++);
  if (count === 10) {
    console.log(process.pid);
    // en la consola con "echo $?" puedo ver el exit code del ultimo proceso
    throw new Error("Este es el mensaje de error");
    // si quitamos los process.exit el programa sigue
    //process.exit(0);
  }
}, 1000);

//PID: 13969
process.on("exit", () => {
  console.log("El proceso node va a parar");
  // aqui podríamos cerrar una connexion con el DB,
  // o escribir en un fichero algo de importante antes de cerrar el proceso
});

process.on("uncaughtException", (err) => {
  console.log("Occurrió un error grave!");
  console.log(err.message);
  // si quitamos los process.exit el programa sigue
  //process.exit(1);
});
