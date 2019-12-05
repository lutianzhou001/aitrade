//const { query } = require('./query/query')
const { auth } = require('./mutation/auth');
const { profile } = require('./mutation/profile');
const { follow } = require('./mutation/follow');
const { moment } = require('./mutation/moment');
const { users } = require('./query/query');

module.exports = {
  Query: {...users},
  Mutation: {
    ...auth,
    ...profile,
    ...follow,
    ...moment
  }
};
