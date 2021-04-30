const User = require('../models/User');

class UsersRepository {
  async findById(id) {
    return User.findById(id)
      .select('-__v');
  }

  async findByNickname(nickname) {
    return User.findOne({
      nickname,
    })
      .select(['name', 'lastname', 'nickname', '-_id']);
  }

  async findByNameAndLastname(name, lastname) {
    // Query where it cointains the name and lastname and its case insensitive
    return User.find({
      name,
      lastname,
    })
      .select('-__v');
  }

  async findByName(name) {
    // Query where it cointains the name and its case insensitive
    return User.find({ name })
      .select('-__v');
  }

  async findByLastname(lastname) {
    // Query where it cointains the lastname and its case insensitive
    return User.find({ lastname })
      .select('-__v');
  }

  async updateNickname({
    id,
    nickname,
  }) {
    return User.findOneAndUpdate({ _id: id }, { $set: { nickname } })
      .exec();
  }

  async create(data) {
    const user = new User(data);
    return user.save();
  }

  async delete(id) {
    const user = this.findById(id);

    await user.remove();
  }

  async save(data) {
    const user = this.findById(data._id);

    Object.assign(user, data);

    user.updatedAt = Date.now;

    await user.save();

    return user;
  }
}

module.exports = UsersRepository;
