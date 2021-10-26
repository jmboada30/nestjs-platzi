import * as Joi from 'joi';

const configSchema = Joi.object({
  API_KEY: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),

  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),

  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_HOST: Joi.string().hostname().required(),
});

export default configSchema;