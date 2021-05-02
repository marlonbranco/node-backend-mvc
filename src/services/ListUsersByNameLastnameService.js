const UsersRepository = require('../repositories/UsersRepository');

class ListUsersByNameLastnameService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ name, lastname }) {
    if (name && lastname) {
      return this.usersRepository.findByNameAndLastname(name, lastname);
    }

    if (name && !lastname) {
      return this.usersRepository.findByName(name);
    }

    if (lastname && !name) {
      return this.usersRepository.findByLastname(lastname);
    }
    return [];
  }
}

module.exports = new ListUsersByNameLastnameService();
