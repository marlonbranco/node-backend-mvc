const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

const usersRepository = new UsersRepository();

class CreateUserService {
  async execute(data) {
    const nicknameExists = await usersRepository.findByNickname(
      data.nickname,
    );

    if (nicknameExists) {
      throw new ErrorsApp('Nickname already in use!', 405);
    }

    return usersRepository.create(data);
  }
}

module.exports = CreateUserService;
