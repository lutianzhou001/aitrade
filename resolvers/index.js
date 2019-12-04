//const { query } = require('./query/query')
const { auth } = require('./mutation/auth')

module.exports = {
  //Query: query,
  Mutation: {
    ...auth,
  }
}
