const {
  model,
  Schema,
} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', UserSchema);

module.exports = User;

