const { Router } = require('express');

const users = require('../controllers/UsersController');
const listUsersByNameLastname = require('../controllers/ListUsersByNameLastnameController');
const showUserByNickname = require('../controllers/ShowUserByNicknameController');
const updateUserLastnameAddress = require('../controllers/UpdateUserLastnameAndAddressController');
const updateUserNickname = require('../controllers/UpdateUserNicknameController');
const { validateObjectIdParams } = require('../middlewares/validateObjectId');

const usersRouter = Router();

// Create User
usersRouter.post('/', users.create);

// List and filter users by name and/or lastname
usersRouter.get('/', listUsersByNameLastname.index);

// Show user by nickname
usersRouter.get('/:nickname', showUserByNickname.show);

// Update user nickname by id
usersRouter.put('/change-nickname/:id', validateObjectIdParams, updateUserNickname.update);

// Update user lastname and address by id
usersRouter.put('/update-lastname-address/:id', validateObjectIdParams, updateUserLastnameAddress.update);

// Delete user by id
usersRouter.delete('/:id', validateObjectIdParams, users.delete);

module.exports = { usersRouter };
