const { auth } = require('./mutation/auth');
const { profile } = require('./mutation/profile');
const { follow } = require('./mutation/follow');
const { moment } = require('./mutation/moment');
const { users } = require('./query/query');
const { okex } = require('./query/okex');
const { bigdata } = require('./query/bigdata');

module.exports = {
  Query: {
    ...users,
    ...okex,
    ...bigdata
  },
  
  Mutation: {
    ...auth,
    ...profile,
    ...follow,
    ...moment
  }
};
