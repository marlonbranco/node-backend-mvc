require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const createUser = require('../../src/services/CreateUserService');
const { ErrorsApp } = require('../../src/errors/ErrorsApp');

const testDatabaseUrl = process.env.MONGO_TEST;

mongoose.connect(testDatabaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

describe('CreateUser', () => {
  beforeEach(async () => {
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
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
