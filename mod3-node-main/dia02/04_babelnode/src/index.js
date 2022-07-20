// ES module
import { say } from "cowsay";

// ES module
import { PI } from "./constants/const.js";

// commonJS
const { miFun } = require("./utility");

// npm install -D @babel/cli @babel/core @babel/preset-env @babel/node

console.log(say({ text: "Hola mundo!!!!" }));
miFun();
console.log("PI:", PI);
