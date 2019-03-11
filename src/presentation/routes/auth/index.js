'use strict'

const Joi = require('Joi');

const {
  failAction
} = require('@src/helpers');

const config = require('@config');
const source = require('@src/data/source/local');
const repository = require('@src/data/repositories/auth')(source);
const service = require('@src/services/auth')(repository);
const handlers = require('@src/presentation/routes/auth/handlers')(service);


module.exports = (app) => {
  app.route([{
    path: `${config.api.basePath('auth')}`,
    method: 'POST',
    config: {
      auth: false,
      validate: {
        failAction,
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: handlers.authenticate
  }])
};
