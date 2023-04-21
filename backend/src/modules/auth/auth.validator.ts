import Joi from 'joi';

export const vSignup = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
  deviceName: Joi.string().required(),
});

export const vLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
  deviceName: Joi.string().required(),
});

export const vRefreshToken = Joi.object({
  accessToken: Joi.string().required(),
  refreshToken: Joi.string().length(50).required(),
});
