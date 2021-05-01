require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const UsersRepository = require('../../src/repositories/UsersRepository');
const showUser = require('../../src/services/ShowUserByNicknameService');
const { ErrorsApp } = require('../../src/errors/ErrorsApp');

let usersRepository = UsersRepository;

describe('ShowUserByNickname', () => {
  const testDatabaseUrl = process.env.MONGO_TEST;

  beforeEach(async () => {
    mongoose.connect(testDatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch((err) => console.error(err));

    usersRepository = new UsersRepository();
    await User.deleteMany({})
      .exec();
  });

  it('should be able to show the user by the nickname', async () => {
    await usersRepository.create({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    const userData = await showUser.execute('thejohndoe');

    expect(userData.name)
      .toBe('John');
    expect(userData.lastname)
      .toBe('Doe');
    expect(userData.nickname)
      .toBe('thejohndoe');
  });

  it('should not be able to show the information of non existent nickname ', async () => {
    await expect(
      showUser.execute('nonexistente'))
      .rejects
      .toBeInstanceOf(ErrorsApp);
  });
});
