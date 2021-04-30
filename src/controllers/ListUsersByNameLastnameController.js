const ListUsersByNameLastname = require('../services/ListUsersByNameLastnameService');

const listUsers = new ListUsersByNameLastname();

class ListUsersByNameLastnameController {
  async index(request, response) {
    const {
      name,
      lastname,
    } = request.query;

    const users = await listUsers.execute({
      name,
      lastname,
    });

    return response.status(200)
      .json(users);
  }
}

const listUsersByNameLastname = new ListUsersByNameLastnameController();

module.exports = listUsersByNameLastname;
