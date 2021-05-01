const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

class UpdateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(data) {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const nicknameExists = await this.usersRepository.findByNickname(
      data.nickname,
    );

    if (nicknameExists && user._id !== data.id) {
      throw new ErrorsApp('Nickname already in use!', 405);
    }

    return usersRepository.updateNickname(data);
  }
}

module.exports = new UpdateUserService();
