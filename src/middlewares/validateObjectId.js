const ObjectId = require('mongoose').Types.ObjectId;

const { ErrorsApp } = require('../errors/ErrorsApp');

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
    throw new ErrorsApp('Invalid ObjectId.', 406);
  }
}

module.exports = { validateObjectIdParams };
