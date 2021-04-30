const UsersRepository = require('../repositories/UsersRepository');

const usersRepository = new UsersRepository();

class ListUsersByNameLastnameService {
  async execute({ name, lastname }) {
    if (name && lastname) {
      return usersRepository.findByNameAndLastname(name, lastname);
    }
    if (name && !lastname) {
      return usersRepository.findByName(name);
    }
    if (lastname && !name) {
      return usersRepository.findByLastname(lastname);
    }
    return { message: 'No user was found with the name and/or lastname provided!' };
  }
}

module.exports = ListUsersByNameLastnameService;
