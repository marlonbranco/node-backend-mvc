const { AppErrors } = require('../errors/AppErrors');

const errorHandling = (err, request, response, _) => {
  if (err instanceof AppErrors) {
    return response
      .status(err.statusCode)
      .json({
        status: 'Error',
        message: err.message,
      });
  }

  console.error(err);

  return response
    .status(500)
    .json({
      status: 'Error',
      message: 'Erro interno do servidor.',
    });
};

module.exports = errorHandling;
