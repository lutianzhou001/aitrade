const { auth } = require('./mutation/auth');
const { profile } = require('./mutation/profile');
const { follow } = require('./mutation/follow');
const { moment } = require('./mutation/moment');
const { users } = require('./query/query');
const { okex } = require('./query/okex');

module.exports = {
  Query: {
    ...users,
    ...okex
  },
  Mutation: {
    ...auth,
    ...profile,
    ...follow,
    ...moment
  }
};
