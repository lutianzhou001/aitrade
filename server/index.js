const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('../resolvers')
const { prisma } = require('../aitrade-datamodel/aitrade/src/generated/prisma-client')

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma,
  })
})

const options = { port: 4001 }
server.start(options, ({ port }) => console.log('Server is running on http://localhost:4001'))


