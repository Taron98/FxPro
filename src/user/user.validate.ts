/** @format */

import * as Joi from 'joi';

export const createUserJoi = Joi.object({
  earnings: Joi.string().required(),
  country: Joi.string().required(),
  name: Joi.string().required(),
});
