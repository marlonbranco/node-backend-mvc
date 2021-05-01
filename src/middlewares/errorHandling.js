const { ErrorsApp } = require('../errors/ErrorsApp');

const errorHandling = (err, request, response, _) => {
  if (err instanceof ErrorsApp) {
    return response
      .status(err.statusCode)
      .json({
        status: 'error',
        message: err.message,
      });
  }

  console.error(err);

  return response
    .status(500)
    .json({
      status: 'error',
      message: 'Erro interno do servidor.',
    });
};

module.exports = errorHandling;
