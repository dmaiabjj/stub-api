const sinon = require('sinon');
const expect = require('chai').expect;

const config = require('@config');
const Auth = require('@src/domain/auth');
const local = require('@src/data/source/local');
const repository = require('@src/data/repositories/auth')(local);

describe('[DATA/REPOSITORIES/AUTH]]', function () {
  it('should return the user authenticated', async () => {

    const expected = {
      "iat": 1552143202,
      "exp": 1552144102,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRpZWdvIE1haWEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU1MjE0MzIwMiwiZXhwIjoxNTUyMTQ0MTAyfQ.VGZ1qTJ6jzfhptggR5whvcJ4NNHEB0LWwl65h7PM4pc"
    };

    var generateToken = sinon.fake.returns(expected);

    const token = await repository.authenticate(new Auth(config.credentials.diverso.USER,
      config.credentials
      .diverso.PASSWORD), generateToken);

    expect(token).to.deep.equal(expected);
  });

  it('should return null instead of a user', async () => {
    const expected = null;
    const token = await repository.authenticate(new Auth("", ""));
    expect(token).to.deep.equal(expected);
  });


});
