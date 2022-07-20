"use strict";

var _cowsay = require("cowsay");

var _const = require("./constants/const.js");

// ES module
// ES module
// commonJS
const {
  miFun
} = require("./utility"); // npm install -D @babel/cli @babel/core @babel/preset-env @babel/node


console.log((0, _cowsay.say)({
  text: "Hola!!!!"
}));
miFun();
console.log("PI:", _const.PI);