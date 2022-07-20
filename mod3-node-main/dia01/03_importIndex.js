"use strict";
// va a leer el index.js dentro de ./modules
const { createUser, deleteUser, getUser } = require("./modules");

createUser();
deleteUser();
getUser();
