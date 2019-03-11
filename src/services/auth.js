'use strict'

const AuthNotAuthorizedError = require('@src/domain/auth/errors/auth-not-authorized-error');

module.exports = (repository) => ({
  authenticate: async (auth, generateToken) => {
    const user = await repository.authenticate(auth, generateToken);
    if (user)
      return user;
    else
      throw new AuthNotAuthorizedError(auth.username, auth.password);
  }
})
