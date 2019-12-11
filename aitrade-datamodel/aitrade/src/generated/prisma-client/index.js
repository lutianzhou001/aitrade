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
    name: "Token",
    embedded: false
  },
  {
    name: "Follow",
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
    name: "rate",
    embedded: false
  },
  {
    name: "onchain",
    embedded: false
  },
  {
    name: "margincloseout",
    embedded: false
  },
  {
    name: "contract",
    embedded: false
  },
  {
    name: "KOL",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
