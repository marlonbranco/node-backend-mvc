const updateUser = require('../services/UpdateUserNicknameService');

class UpdateUserNicknameController {
  async update(request, response) {
    const { id } = request.params;
    const { nickname } = request.body;

    const user = await updateUser.execute({ id, nickname });

    return response.status(200).json(user);
  }
}

module.exports = new UpdateUserNicknameController();
