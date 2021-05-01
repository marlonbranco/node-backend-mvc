const createUser = require('../services/CreateUserService');
const deleteUser = require('../services/DeleteUserService');

class UsersController {
  async create(request, response) {
    const data = request.body;

    const user = await createUser.execute(data);

    return response.status(201).json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    await deleteUser.execute(id);

    return response.status(200);
  }
}

module.exports = new UsersController();
