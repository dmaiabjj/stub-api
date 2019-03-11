'use strict'

const AuthError = require('./auth-error');

module.exports = class AuthNotAuthorizedError extends AuthError {
  constructor(username, password) {
    super(
      `The credential with username: ${username} and password: ${password} is invalid or has not permission to access this resource`
    )
  }
}
