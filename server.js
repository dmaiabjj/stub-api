'use strict'
require('module-alias/register')

const Hapi = require('hapi');
const HapiJwt = require('hapi-auth-jwt2');
const hapiBoomDecorators = require('hapi-boom-decorators');
const config = require('@config');
const routes = require('@src/presentation/routes');

const app = new Hapi.Server({
  port: config.server.PORT
})

const start = async () => {
  app.start();
  app.register([HapiJwt, hapiBoomDecorators]);

  app.auth.strategy('jwt', 'jwt', {
    key: config.credentials.JWT_TOKEN,
    options: {
      expiresIn: '15m'
    },
    validate: (data, request) => {
      return {
        isValid: true
      };
    }
  });

  app.auth.default('jwt');
  routes(app);

  console.log(`API running on PORT ${app.info.port}`);

  return app;
}

module.exports = start()
