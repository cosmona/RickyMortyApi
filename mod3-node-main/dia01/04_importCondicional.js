"use strict";
const flag = false;

let imported;

if (flag) {
  imported = require("./lib/module");
} else {
  imported = require("./lib/module2");
}

imported.hello();
