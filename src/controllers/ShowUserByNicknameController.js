const showUser = require('../services/ShowUserByNicknameService');

class ShowUserByNicknameController {
  async show(request, response) {
    const { nickname } = request.params;

    const user = await showUser.execute(nickname);

    return response.status(200).json(user);
  }
}

module.exports = new ShowUserByNicknameController();
