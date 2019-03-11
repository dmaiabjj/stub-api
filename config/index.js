require('dotenv-flow').config({
  node_env: process.env.NODE_ENV,
  cwd: './config'
});


const packageJson = require('@root/package.json');
const API_ROOT = '/api';

module.exports = {
  server: {
    PORT: process.env.PORT || 3000,
    CORS: {
      exposedHeaders: ['x-content-range']
    }
  },
  api: {
    VERSION: process.env.API_VERSION || packageJson.version,
    basePath: (path) => {
      return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    }
  },
  credentials: {
    JWT_TOKEN: process.env.JWT_TOKEN,
    diverso: {
      USER: process.env.DIVERSO_GAMES_API_USER,
      PASSWORD: process.env.DIVERSO_GAMES_API_PASSWORD,
    }
  },
  rdstation: {
    API_URL: process.env.RD_STATION_API,
    CLIENT_ID: process.env.RD_STATION_CLIENT_ID,
    CLIENT_SECRET: process.env.RD_STATION_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.RD_STATION_REFRESH_TOKEN,
    CODE: process.env.RD_STATION_CODE,
    CONTACT_OWNER_EMAIL: process.env.RD_STATION_CONTACT_OWNER_EMAIL

  }

};
