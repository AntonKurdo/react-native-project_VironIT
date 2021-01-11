import Joi from 'react-native-joi';

export const shopValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  shopType: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});