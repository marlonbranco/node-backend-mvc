const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

const usersRepository = new UsersRepository();

class DeleteUserService {
  async execute(userId) {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    return usersRepository.delete(userId);
  }
}

module.exports = DeleteUserService;
