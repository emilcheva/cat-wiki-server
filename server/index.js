const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const catAPI = require('./datasources/cat-api');

const normalizeCamelToSnakeCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? '_' : '') + word.toLowerCase()
  ), '')
)

const snakeCaseFieldResolver = (source, args, contextValue, info) => {
  return source[normalizeCamelToSnakeCase(info.fieldName)]
}

const server = new ApolloServer({
  fieldResolver: snakeCaseFieldResolver,
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
