const UsersRepository = require('../repositories/UsersRepository');
const { ErrorsApp } = require('../errors/ErrorsApp');

const usersRepository = new UsersRepository();

class ShowUserByNicknameService {
  async execute(nickname) {
    const user = await usersRepository.findByNickname(nickname);

    if (!user) {
      throw new ErrorsApp('User not found with the provided nickname!', 404);
    }

    return user;
  }
}

module.exports = ShowUserByNicknameService;
