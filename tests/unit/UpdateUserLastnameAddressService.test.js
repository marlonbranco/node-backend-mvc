require('dotenv/config');

const mongoose = require('mongoose');

const User = require('../../src/models/User');
const UsersRepository = require('../../src/repositories/UsersRepository');
const updateUser = require('../../src/services/UpdateUserLastnameAddressService');
const { AppErrors } = require('../../src/errors/AppErrors');

let usersRepository = UsersRepository;

describe('UpdateUserLastnameAndAddress', () => {
  const testDatabaseUrl = process.env.MONGO_TEST;

  beforeEach(async () => {
    mongoose.connect(testDatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch((err) => console.error(err));

    await User.deleteMany({}).exec();
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
  it('should not be able to update the data of non existent user', async () => {
    await expect(
      updateUser.execute({
        id: 'nonexistente',
        lastname: 'Trê',
        address: 'Somewhere On Mars, 0, Rock-MR',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
