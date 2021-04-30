const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

const usersRepository = new UsersRepository();

class UpdateUserService {
  async execute(data) {
    const user = await usersRepository.findById(data.id);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    return usersRepository.save(data);
  }
}

module.exports = UpdateUserService;
