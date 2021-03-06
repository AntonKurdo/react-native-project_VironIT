import Joi from 'react-native-joi';

export const validationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});