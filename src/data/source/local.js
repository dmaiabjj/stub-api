'use strict'



const config = require('@config');

module.exports = {
  authenticate: (auth, generateToken) => {
    return new Promise(function (resolve, _reject) {
      if (auth.username === config.credentials.diverso.USER && auth.password === config.credentials
        .diverso.PASSWORD) {

        const user = {
          id: 1,
          name: 'Diego Maia',
          admin: false
        };

        resolve(generateToken(user));

      } else
        resolve(null);

    });
  }
};
