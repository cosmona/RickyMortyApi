const listEntries = (req, res, next) => {
  // leer las entries en la base de datos

  res.send({
    status: 'ok',
    message: 'Listado entries',
    data: [],
  });
};

module.exports = listEntries;
