require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const UsersRepository = require('../../src/repositories/UsersRepository');
const updateUser = require('../../src/services/UpdateUserNicknameService');
const { AppErrors } = require('../../src/errors/AppErrors');

let usersRepository = UsersRepository;

describe('UpdateUserNickname', () => {
  const testDatabaseUrl = process.env.MONGO_TEST;

  beforeEach(async () => {
    mongoose.connect(testDatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch((err) => console.error(err));

    usersRepository = new UsersRepository();
    await User.deleteMany({}).exec();
  });

  it('should be able to update the nickname of the user', async () => {
    const user = await usersRepository.create({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    const updatedUser = await updateUser.execute({
      id: user._id,
      nickname: 'ajohndoe',
    });

    expect(updatedUser.nickname)
      .toBe('ajohndoe');
  });

  it('should not be able to updated the nickname if the provided nickname is already in use',
    async () => {
      await usersRepository.create({
        name: 'John',
        lastname: 'Doe',
        nickname: 'thejohndoe',
        address: 'Somewhere On Earth, 0, AnyCity-AC',
        bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      });

      const user = await usersRepository.create({
        name: 'John',
        lastname: 'Doe',
        nickname: 'ajohndoe',
        address: 'Somewhere On Earth, 0, AnyCity-AC',
        bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      });

      await expect(
        updateUser.execute({
          id: user._id,
          nickname: 'thejohndoe',
        }),
      )
        .rejects
        .toBeInstanceOf(AppErrors);
    });

  it('should not be able to update the nickname if it contains white space', async () => {
    const user = await usersRepository.create({
      name: 'John',
      lastname: 'Doe',
      nickname: 'ajohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    await expect(
      updateUser.execute({
        id: user._id,
        nickname: 'the john doe',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to update the nickname of non existent user', async () => {
    await expect(
      updateUser.execute({
        id: 'nonexistente',
        lastname: 'Trê',
        address: 'Somewhere On Mars, 0, Rock-MR',
      }),
    )
      .rejects
      .toBeInstanceOf(AppErrors);
  });
});
