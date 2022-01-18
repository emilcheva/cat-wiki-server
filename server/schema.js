const { gql } = require('apollo-server');

const typeDefs = gql`
  "Image url for a breed"
  type BreedImage {
    id: ID!
    url: String!
  }

  "All the info about a cat's breed"
  type Breed {
    id: ID!
    description: String
    name: String
    temperament: String
    origin: String
    lifeSpan: String @snakeCase
    adaptability: Int
    affectionLevel: Int @snakeCase
    childFriendly: Int @snakeCase
    grooming: Int
    intelligence: Int
    healthIssues: Int @snakeCase
    socialNeeds: Int @snakeCase
    strangerFriendly: Int @snakeCase
    breedImage: [BreedImage!]!
  }

  type Query {
    "Get cat breeds with option to limit the results"
    getBreeds(limit: Int): [Breed!]!
    "Get breeds by name"
    getBreedsByName(breedName: String!): [Breed!]!
  }
`;
// Create the base executable schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Transform the schema by applying directive logic
schema = snakeCaseDirectiveTransformer(schema, "snakeCase");
module.exports = schema;
