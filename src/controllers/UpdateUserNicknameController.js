const UpdateUserNicknameService = require('../services/UpdateUserNicknameService');

const updateUser = new UpdateUserNicknameService();

class UpdateUserNicknameController {
  async update(request, response) {
    const { id } = request.params;
    const { nickname } = request.body;

    const user = await updateUser.execute({ id, nickname });

    return response.status(200).json(user);
  }
}

const updateUserNickname = new UpdateUserNicknameController();

module.exports = updateUserNickname;
