'use strict'

const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const config = require('@config');

exports.failAction = (_req, head, error) => {
  head.badRequest(error.message);
};

exports.headers = Joi.object({
  authorization: Joi.string().required()
}).unknown();


exports.generateToken = (user) => {
  const token = Jwt.sign(user, config.credentials.JWT_TOKEN, {
    expiresIn: '15m' // token expires in 15 minutes
  })

  // retrieve issue and expiration times
  const {
    iat,
    exp
  } = Jwt.decode(token);

  return {
    iat,
    exp,
    token
  };
}
