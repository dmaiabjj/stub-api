'use strict'

module.exports = (app) => ([
  require('./auth')(app)
]);
