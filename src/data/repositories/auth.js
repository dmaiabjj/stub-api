'use strict'

module.exports = (dataSource) => ({
  authenticate: (auth, generateToken) => {
    return dataSource.authenticate(auth, generateToken);
  }
})
