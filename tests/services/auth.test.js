const sinon = require('sinon');
const expect = require('chai').expect;

const config = require('@config');
const Auth = require('@src/domain/auth');
const AuthNotAuthorizedError = require('@src/domain/auth/errors/auth-not-authorized-error');
const local = require('@src/data/source/local');
const repository = require('@src/data/repositories/auth')(local);
const services = require('@src/services/auth')(repository);

describe('[SERVICES/AUTH]]', function () {
  it('should return the user authenticated', async () => {
    const expected = {
      "iat": 1552143202,
      "exp": 1552144102,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRpZWdvIE1haWEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU1MjE0MzIwMiwiZXhwIjoxNTUyMTQ0MTAyfQ.VGZ1qTJ6jzfhptggR5whvcJ4NNHEB0LWwl65h7PM4pc"
    };

    var generateToken = sinon.fake.returns(expected);

    const token = await services.authenticate(new Auth(config.credentials.diverso.USER,
      config.credentials
      .diverso.PASSWORD), generateToken);

    expect(token).to.deep.equal(expected);
  });

  it('should return null instead of a user', async () => {
    const expected = new AuthNotAuthorizedError("", "");
    try {
      await services.authenticate(new Auth("", ""));
    } catch (error) {
      expect(error.constructor).to.deep.equal(AuthNotAuthorizedError);
      expect(error.message).to.equal(expected.message);
    }

  });


});
