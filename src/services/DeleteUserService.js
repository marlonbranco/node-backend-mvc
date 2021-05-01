const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

class DeleteUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(userId) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }
    await this.usersRepository.delete(userId);

    return undefined;
  }
}

module.exports = new DeleteUserService();
