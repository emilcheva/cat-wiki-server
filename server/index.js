const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const catAPI = require("./datasources/cat-api");

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      catAPI: new catAPI(),
    };
  },
});

async function startApolloServer(server) {
  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(` 🚀 Server ready at ${url}`);
}
startApolloServer(server);
