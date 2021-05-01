const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

class CreateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(data) {
    const nicknameExists = await this.usersRepository.findByNickname(
      data.nickname,
    );

    if (nicknameExists) {
      throw new ErrorsApp('Nickname already in use!', 405);
    }

    return this.usersRepository.create(data);
  }
}

module.exports = new CreateUserService();
