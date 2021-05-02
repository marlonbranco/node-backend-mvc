const UsersRepository = require('../repositories/UsersRepository');
const { AppErrors } = require('../errors/AppErrors');
const hasWhiteSpace = require('../utils/whiteSpaceCheck');

class CreateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(data) {
    const nicknameHasWhiteSpace = hasWhiteSpace(data.nickname);

    if (nicknameHasWhiteSpace) {
      throw new AppErrors('White spaces are not allowed on the nickname!', 405);
    }

    const nicknameExists = await this.usersRepository.checkNickname(
      data.nickname,
    );

    if (nicknameExists) {
      throw new AppErrors('Nickname already in use!', 405);
    }

    return this.usersRepository.create(data);
  }
}

module.exports = new CreateUserService();
