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
    const nameRegex = new RegExp(name, 'i');
    const lastnameRegex = new RegExp(lastname, 'i');
    // Query where it cointains the name and lastname and its case insensitive
    return User.find({
      name: { $regex: nameRegex },
      lastname: { $regex: lastnameRegex },
    })
      .select('-__v');
  }

  async findByName(name) {
    const nameRegex = new RegExp(name, 'i');
    // Query where it cointains the name and its case insensitive
    return User.find({ name: { $regex: nameRegex } })
      .select('-__v');
  }

  async findByLastname(lastname) {
    const lastnameRegex = new RegExp(lastname, 'i');
    // Query where it cointains the lastname and its case insensitive
    return User.find({ lastname: { $regex: lastnameRegex } })
      .select('-__v');
  }

  async updateNickname({
    id,
    nickname,
  }) {
    return User.findOneAndUpdate({ _id: id }, {
      $set: {
        nickname,
        updatedAt: Date.now(),
      },
    },
    { new: true })
      .exec();
  }

  async checkNickname(nickname) {
    return User.findOne({
      nickname,
    });
  }

  async updateLastnameAddress({
    id,
    lastname,
    address,
  }) {
    return User.findOneAndUpdate({ _id: id }, {
      $set: {
        lastname,
        address,
        updatedAt: Date.now(),
      },
    },
    { new: true })
      .exec();
  }

  async create(data) {
    const user = new User(data);
    return user.save();
  }

  async delete(id) {
    return User.findOneAndDelete({ _id: id }).exec();
  }
}

module.exports = UsersRepository;
