const { createTestClient } = require("apollo-server-testing");
const catAPI = require("../datasources/cat-api");
const { ApolloServer } = require("apollo-server");
const resolvers = require('../resolvers');
const typeDefs = require('../schema');

const createApolloTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        catAPI: new catAPI(),
      };
    },
  });
  return server;
};

const apolloServer = createApolloTestServer();

export const { query } = createTestClient(apolloServer);
