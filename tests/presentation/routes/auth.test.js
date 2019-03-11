const expect = require('chai').expect;

const config = require('@config');
const AuthNotAuthorizedError = require('@src/domain/auth/errors/auth-not-authorized-error');

describe('[PRESENTATION/ROUTER/AUTH]]', function () {
  let app = {};
  let user = {};

  before(async () => {
    app = await require('@root/server');
  });

  beforeEach(async () => {
    user = {
      username: config.credentials.diverso.USER,
      password: config.credentials.diverso.PASSWORD
    };
  });

  it('should return the user authenticated - POST(api/auth)', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `${config.api.basePath('auth')}`,
      payload: user
    });

    const data = JSON.parse(result.payload);

    expect(result.statusCode).to.deep.equal(200);
    expect(data).to.have.all.keys('iat', 'exp', 'token');
  });

  it('should return BAD_REQUEST - POST(api/auth)', async () => {
    const expected = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child \"password\" fails because [\"password\" is not allowed to be empty]'
    };

    user.password = '';

    const result = await app.inject({
      method: 'POST',
      url: `${config.api.basePath('auth')}`,
      payload: user
    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).to.deep.equal(400);
    expect(data).to.deep.equal(expected);
  });

  it('should return NOT_AUTHORIZED - POST(api/auth)', async () => {
    user.password = 'a';

    const expected = {
      statusCode: 401,
      error: 'Unauthorized',
      message: new AuthNotAuthorizedError(user.username, user.password).message
    };

    const result = await app.inject({
      method: 'POST',
      url: `${config.api.basePath('auth')}`,
      payload: user

    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).to.deep.equal(401);
    expect(data).to.deep.equal(expected);
  });
});
