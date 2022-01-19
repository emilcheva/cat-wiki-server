const { gql } = require("apollo-server");

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
    lifeSpan: String 
    adaptability: Int
    affectionLevel: Int 
    childFriendly: Int
    grooming: Int
    intelligence: Int
    healthIssues: Int 
    socialNeeds: Int 
    strangerFriendly: Int 
    breedImage: [BreedImage!]!
  }

  type Query {
    "Get cat breeds with option to limit the results"
    getBreeds(limit: Int): [Breed!]!
    "Get breeds by name"
    getBreedsByName(breedName: String!): [Breed!]!
  }
`;
module.exports = typeDefs;
