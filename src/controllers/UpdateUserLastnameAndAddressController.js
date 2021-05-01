const updateUser = require('../services/UpdateUserLastnameAddressService');

class UpdateUserLastnameAndAddressController {
  async update(request, response) {
    const { id } = request.params;
    const { lastname, address } = request.body;

    const user = await updateUser.execute({ id, lastname, address });

    return response.status(200).json(user);
  }
}

module.exports = new UpdateUserLastnameAndAddressController();
