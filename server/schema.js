const { gql } = require("apollo-server");
const _ = require("lodash");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");
const { defaultFieldResolver } = require("graphql");
const resolvers = require("./resolvers");

// This function takes in a schema and adds snake-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `snakeCase`)
function snakeCaseDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const snakeCaseDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (snakeCaseDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = (source, args, context, info) => {
          return source[_.snakeCase(info.fieldName)]
        }

        return fieldConfig;
      }
    },
  });
}

const typeDefs = gql`
  directive @snakeCase on FIELD_DEFINITION

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
