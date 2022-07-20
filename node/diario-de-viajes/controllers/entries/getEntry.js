const getEntry = (req, res, next) => {
  // leer el detalle de la entry en el DB

  res.send({
    status: 'ok',
    message: 'Dettalle entry',
    data: {},
  });
};

module.exports = getEntry;
