const UpdateUserService = require('../services/UpdateUserService');

const updateUser = new UpdateUserService();

class UpdateUserLastnameAndAddressController {
  async update(request, response) {
    const { id } = request.params;
    const { lastname, address } = request.body;

    const user = await updateUser.execute({ id, lastname, address });

    return response.status(200).json(user);
  }
}

const updateUserLastnameAndAddress = new UpdateUserLastnameAndAddressController();

module.exports = updateUserLastnameAndAddress;
