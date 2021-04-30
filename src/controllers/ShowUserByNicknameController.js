const ShowUserByNicknameService = require('../services/ShowUserByNicknameService');

const showUser = new ShowUserByNicknameService();

class ShowUserByNicknameController {
  async show(request, response) {
    const { nickname } = request.params;

    const user = await showUser.execute(nickname);

    return response.status(200).json(user);
  }
}

const showUserByNickname = new ShowUserByNicknameController();

module.exports = showUserByNickname;
