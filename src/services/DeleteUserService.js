const UsersRepository = require('../repositories/UsersRepository');
const { AppErrors } = require('../errors/AppErrors');

class DeleteUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(userId) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppErrors('User not found', 404);
    }
    await this.usersRepository.delete(userId);

    return undefined;
  }
}

module.exports = new DeleteUserService();
