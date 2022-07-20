const newUser = (req, res, next) => {
  // crear el usuario en la base de datos

  res.status(201).send({
    status: 'ok',
    message: 'Usuario creado',
    data: 1,
  });
};

module.exports = newUser;
