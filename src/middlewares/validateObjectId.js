const ObjectId = require('mongoose').Types.ObjectId;

const { AppErrors } = require('../errors/AppErrors');

function validateObjectIdParams(request, response, next) {
  const { id } = request.params;

  const validateId = (objectId) => {
    if (ObjectId.isValid(objectId)) {
      if (String(new ObjectId(objectId)) === id) {
        next();
        return true;
      }
      return false;
    }
    return false;
  };

  const check = validateId(id);

  if (!check) {
    throw new AppErrors('ID inválido.', 406);
  }
}

module.exports = { validateObjectIdParams };
