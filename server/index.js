const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const catAPI = require('./datasources/cat-api');

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      catAPI: new catAPI()
    };
  }
});

async function startApolloServer(server) {
  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(` 🚀 Server ready at ${url}`);
}
startApolloServer(server);
