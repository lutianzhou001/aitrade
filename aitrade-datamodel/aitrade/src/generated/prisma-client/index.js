"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Setting",
    embedded: false
  },
  {
    name: "Wallet",
    embedded: false
  },
  {
    name: "Token",
    embedded: false
  },
  {
    name: "Follow",
    embedded: false
  },
  {
    name: "Subscribe",
    embedded: false
  },
  {
    name: "Transactions",
    embedded: false
  },
  {
    name: "Moment",
    embedded: false
  },
  {
    name: "Rate",
    embedded: false
  },
  {
    name: "Mycoin",
    embedded: false
  },
  {
    name: "Battle",
    embedded: false
  },
  {
    name: "OnchainExchange",
    embedded: false
  },
  {
    name: "BtcPlaceOrder",
    embedded: false
  },
  {
    name: "Distribution",
    embedded: false
  },
  {
    name: "Onchain",
    embedded: false
  },
  {
    name: "Closeout",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
