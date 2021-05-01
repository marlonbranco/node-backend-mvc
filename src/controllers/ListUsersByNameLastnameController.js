const listUsers = require('../services/ListUsersByNameLastnameService');

class ListUsersByNameLastnameController {
  async index(request, response) {
    const { name, lastname } = request.query;
    const users = await listUsers.execute({
      name,
      lastname,
    });

    return response.status(200)
      .json(users);
  }
}

module.exports = new ListUsersByNameLastnameController();
