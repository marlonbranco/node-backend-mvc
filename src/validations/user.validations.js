const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const createUserFormValidation = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string()
        .required(),
      lastname: Joi.string()
        .required(),
      nickname: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .lowercase(),
      address: Joi.string()
        .required(),
      bio: Joi.string()
        .max(100),
    },
  },
  {
    abortEarly: false,
  },
);

const updateUserAddressLastnameValidation = celebrate(
  {
    [Segments.BODY]: {
      lastname: Joi.string()
        .required(),
      address: Joi.string()
        .required(),
    },
  },
  {
    abortEarly: false,
  },
);
const updateUserNicknameValidation = celebrate(
  {
    [Segments.BODY]: {
      nickname: Joi.string()
        .max(30)
        .trim()
        .lowercase(),
    },
  },
  {
    abortEarly: false,
  },
);

module.exports = {
  createUserFormValidation,
  updateUserAddressLastnameValidation,
  updateUserNicknameValidation,
};
