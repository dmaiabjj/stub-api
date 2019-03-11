'use strict'

const Auth = require('@src/domain/auth');
const AuthNotAuthorizedError = require('@src/domain/auth/errors/auth-not-authorized-error');
const {
  generateToken
} = require('@src/helpers/');

module.exports = (service) => ({
  authenticate: async (request, head) => {
    const {
      username,
      password
    } = request.payload;

    try {
      const token = await service.authenticate(new Auth(username, password), generateToken);
      return token;

    } catch (error) {
      switch (error.constructor) {
        case AuthNotAuthorizedError:
          head.unauthorized(error.message);
          break;
        default:
          head.badImplementation(error.message);
          break;
      }
    }
  }
})
