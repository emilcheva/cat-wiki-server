const { gql } = require("apollo-server");

const typeDefs = gql`
"All the info about a cat's breed"
  type Breed{
    id: ID!
    description: String
    name: String
    temperament: String
    origin: String
    life_span: String
    adaptability: Int
    affection_level: Int
    child_friendly: Int
    grooming: Int
    intelligence: Int
    health_issues: Int
    social_needs: Int
    stranger_friendly: Int
  }

  type CatInfo{
    breeds: [Breed ]
    id: ID!
    url: String
  }

  type Query{
    "Get cat breeds with option to limit the results"
    getBreeds(limit: Int): [Breed]
    "Get a set of images by cat breed ID"
    getImagesOfBreed (breedId: ID!, limit: Int): [ CatInfo ]
    "Get breeds by name"
    getBreedsByName(breedName: String): [ Breed ]
  }
`;
module.exports = typeDefs;
