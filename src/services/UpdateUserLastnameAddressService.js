const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

const usersRepository = new UsersRepository();

class UpdateUserLastnameAddressService {
  async execute({ id, lastname, address }) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    return usersRepository.updateLastnameAddress({ id, lastname, address });
  }
}

module.exports = new UpdateUserLastnameAddressService();
