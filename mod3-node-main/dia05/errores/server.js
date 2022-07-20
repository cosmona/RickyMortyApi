require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const { PORT } = process.env;

const app = express();

app.use(morgan("dev"));

// function crea una nueva entry
const newEntry = (req, res) => {
  res.send({
    status: "ok",
    message: "Creo nueva entry",
  });
};

// function que comprueba la esistencia de una entry
const existEntry = (req, res, next) => {
  // Path params
  console.log("req.params:", req.params);
  // compruebo en el db que la entry exista
  // simulo que en el DB exixta solo la entry 1
  if (Number(req.params.id) === 1) {
    // la entry existe
    next();
  } else {
    // res.status(404).send({
    //   status: "error",
    //   message: "Entry no encontrada",
    // });
    const error = new Error("Entry no encontrada");
    error.httpStatus = 404;
    next(error);
  }
};

// function que modifica una entry
const modifyEntry = (req, res) => {
  res.send({
    status: "ok",
    message: "Modifico entry",
  });
};

// function que devuelve todas las entries
const getEntries = (req, res, next) => {
  //next();
  res.send({
    status: "ok",
    message: "Listado de entries",
  });
};

// function que elimina una entry
const deleteEntry = (req, res) => {
  res.send({
    status: "ok",
    message: "Borro entry",
  });
};

/**
 *
 * ENDPOINTS
 *
 **/
app.delete("/prueba", (req, res) => {
  res.set("miheader", "valor");
  res.status(200).end();
});

app.get("/", (req, res) => {
  res.send({
    status: "ok",
    message: "Home",
  });
});

app.get("/entries", getEntries);

// endpoint duplicado! La petición entra en el anterior
// app.get("/entries", (req, res) => {
//   res.send({
//     status: "ok",
//     message: "Listado de entries 2",
//   });
// });

app.post("/entries", newEntry);

// middleware
app.use((req, res, next) => {
  console.log("Paso por aqui!!!!");
  next();
});

// endpoint para modificar una entry
// Path params /:id
app.patch("/entries/:id", existEntry, modifyEntry);

// endpoint para modificar una entry
// Path params /:id
app.delete("/entries/:id", existEntry, deleteEntry);

app.use((error, req, res, next) => {
  res.status(error.httpStatus).send({
    status: "error",
    message: error.message,
  });
});

// middleware error 404 ruta no encontrada
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

app.listen(PORT, () => {
  console.log("Escuchando en el puerto", PORT);
});
