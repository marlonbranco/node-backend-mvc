require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const UsersRepository = require('../../src/repositories/UsersRepository');
const updateUser = require('../../src/services/UpdateUserLastnameAddressService');

const testDatabaseUrl = process.env.MONGO_TEST;

mongoose.connect(testDatabaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

let usersRepository = UsersRepository;

describe('UpdateUser', () => {
  beforeEach(() => {
    User.collection.drop();
    usersRepository = new UsersRepository();
  });

  it('should be able to update the user lastname and address', async () => {
    const user = await usersRepository.create({
      name: 'John',
      lastname: 'Doe',
      nickname: 'thejohndoe',
      address: 'Somewhere On Earth, 0, AnyCity-AC',
      bio: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    });

    const updatedUser = await updateUser.execute({
      id: user._id,
      lastname: 'Trê',
      address: 'Somewhere On Mars, 0, Rock-MR',
    });
    expect(updatedUser.lastname).toBe('Trê');
    expect(updatedUser.address).toBe('Somewhere On Mars, 0, Rock-MR');
  });
});
