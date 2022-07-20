/* 
El módulo nativo http de Node se usa para crear servidores web y es muy potente pero no destaca por su simplicidad.
Por ello, vamos a usar express, un framework para construir servidores web en Node.
Existen otros frameworks similares a express como koa, fastify, o nest.js, que también son muy interesantes y potentes.
Todos tienes sus ventajas y desventajas, pero express es sin duda el de uso más extendido.
El módulo express es una extensión del módulo http por lo que realmente cuando lo usamos,
por detrás express está usando el módulo http para realizar las acciones. 
*/

require("dotenv").config();
const express = require("express");

// creo una instancia de express
const app = express();

// middleware: body parser json
app.use(express.json());

app.use((req, resp) => {
  console.log("req.method:", req.method);
  // console.log("req.url:", req.url);
  // console.log("req.headers.host:", req.headers.host);
  // console.log("req.headers['user-agent']:", req.headers["user-agent"]);
  // console.log("req.headers.micabecera", req.headers.micabecera);
  // console.log(req.headers);
  // console.log("req.query:", req.query);
  // const { order, algo } = req.query;
  // console.log(order, algo);
  // console.log("req.body:", req.body);
  return resp.status(200).send("Hola desde express!!!");
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
