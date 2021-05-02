const UsersRepository = require('../repositories/UsersRepository');
const { AppErrors } = require('../errors/AppErrors');
const hasWhiteSpace = require('../utils/whiteSpaceCheck');

class UpdateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(data) {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppErrors('User not found', 404);
    }
    const nicknameHasWhiteSpace = hasWhiteSpace(data.nickname);

    if (nicknameHasWhiteSpace) {
      throw new AppErrors('White spaces are not allowed on the nickname!', 405);
    }
    const nicknameExists = await this.usersRepository.findByNickname(
      data.nickname,
    );

    if (nicknameExists && user._id !== data.id) {
      throw new AppErrors('Nickname already in use!', 405);
    }

    return this.usersRepository.updateNickname(data);
  }
}

module.exports = new UpdateUserService();
