const UsersRepository = require('../repositories/UsersRepository');
const { AppErrors } = require('../errors/AppErrors');

class ShowUserByNicknameService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(nickname) {
    const user = await this.usersRepository.findByNickname(nickname);

    if (!user) {
      throw new AppErrors('User not found with the provided nickname!', 404);
    }

    return user;
  }
}

module.exports = new ShowUserByNicknameService();
