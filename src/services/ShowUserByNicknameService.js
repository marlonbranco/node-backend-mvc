const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

class ShowUserByNicknameService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute(nickname) {
    const user = await this.usersRepository.findByNickname(nickname);

    if (!user) {
      throw new ErrorsApp('User not found with the provided nickname!', 404);
    }

    return user;
  }
}

module.exports = new ShowUserByNicknameService();
