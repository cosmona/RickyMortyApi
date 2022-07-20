require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { newUser } = require('./controllers/users');

const { getEntry, listEntries } = require('./controllers/entries');

const { PORT } = process.env;

const app = express();

//* añado middleware morgan para loguear las peticiones HTTP
app.use(morgan('dev'));

// middleware para parsear el json del body
app.use(express.json());

/**
 * END POINTS
 */

/**
 * End points users
 */

// POST - /users - Crear un usuario pendiente de activar
app.post('/users', newUser);

/**
 * End points entries
 */

//GET - /entries - JSON con lista todas las entradas y buscar entradas | Sin token
app.get('/entries', listEntries);

//GET - /entries/:id - JSON que muestra información de una entrada | Sin token
app.get('/entries/:id', getEntry);

// middleware de los errores
app.use((error, req, res, next) => {
  res.status(error.httpStatus).send({
    status: 'error',
    message: error.message,
  });
});

// middleware 404 not found
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// pondo en escucha express
app.listen(PORT, () => {
  console.log(`Servidor activo en http://127.0.0.1:${PORT}`);
});
