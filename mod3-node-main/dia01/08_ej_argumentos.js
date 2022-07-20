"use strict";
// Ejercicio:
// si llega -h y -iso quiero imprimir una data en formato ISO
// si llega -h imprimo data simple (ej: 7/07/2022)
// Ejemplo de llamada:
// node argumentos.js -h -iso
// node argumentos.js -h
// node argumentos.js

//console.log(process.argv[0]);

const args = process.argv.slice(2);
//console.log(args[0]);

const now = new Date();

if (args[0] === "-h") {
  if (args[1] === "-iso") {
    console.log(now.toISOString());
  } else {
    console.log(now.toLocaleDateString());
  }
} else {
  console.log("Error en los argumentos");
}
