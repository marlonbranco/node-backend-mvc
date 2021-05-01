require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const UsersRepository = require('../../src/repositories/UsersRepository');
const deleteUser = require('../../src/services/DeleteUserService');
const { ErrorsApp } = require('../../src/errors/ErrorsApp');

let usersRepository = UsersRepository;

describe('DeleteUser', () => {
  const testDatabaseUrl = process.env.MONGO_TEST;

  beforeEach(async () => {
    mongoose.connect(testDatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch((err) => console.error(err));

    await User.deleteMany({})
      .exec();
    usersRepository = new UsersRepository();
  });

  it('should be able to delete the user by the id', async () => {
    const user = await usersRepository.create({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    const deletedUser = await deleteUser.execute(user._id);

    expect(deletedUser).toBeUndefined();
  });

  it('should not be able to delete that does not exist', async () => {
    await expect(
      deleteUser.execute('nonexistente'))
      .rejects
      .toBeInstanceOf(ErrorsApp);
  });
});
