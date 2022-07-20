"use strict";
//const miModule = require("./lib/module");
//const hello = miModule.hello;
//const sum = miModule.sum;

const { hello, sum, PI, arraySum } = require("./lib/module");

//miModule.hello();
hello();

//console.log("Suma:", miModule.sum(10, 3));
console.log("Suma:", sum(10, 3));

// console.log("PI:", miModule.PI);
console.log("PI:", PI);

const miArray = [1, 2, 3, 4, 5, 6];

//console.log("Suma array:", miModule.arraySum(miArray));
console.log("Suma array:", arraySum(miArray));
