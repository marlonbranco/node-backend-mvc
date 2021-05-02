require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const createUser = require('../../src/services/CreateUserService');
const { AppErrors } = require('../../src/errors/AppErrors');

describe('CreateUser', () => {
  const testDatabaseUrl = process.env.MONGO_TEST;

  beforeEach(async () => {
    mongoose.connect(testDatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch((err) => console.error(err));


    await User.deleteMany({}).exec();
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    expect(user).toHaveProperty('_id');
  });

  it('should not be able to create a user with a nickname that contains white space', async () => {
    await expect(
      createUser.execute({
        name: 'John',
        lastname: 'Doe',
        nickname: 'the john doe',
        address: 'Somewhere On Earth, 0, AnyCity-AC',
        bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to create two users with the same nickname', async () => {
    await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });
    await expect(
      createUser.execute({
        name: 'John',
        lastname: 'Doe',
        nickname: 'thejohndoe',
        address: 'Somewhere On Earth, 0, AnyCity-AC',
        bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
