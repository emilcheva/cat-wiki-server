const resolvers = {
  Query: {
    // get all breeds, limit them if needed
    getBreeds: (_, { limit }, { dataSources }) => {
      return dataSources.catAPI.getBreeds(limit);
    },
    // get a single module by ID, for the module detail page
    getBreedsByName: (_, { breedName }, { dataSources }) => {
      return dataSources.catAPI.getBreedsByName(breedName);
    }
  },
  Breed: {
    // camelCase to snake_case mapping
    lifeSpan: (parent) => parent.life_span,
    affectionLevel: (parent) => parent.affection_level,
    childFriendly: (parent) => parent.child_friendly,
    healthIssues: (parent) => parent.health_issues,
    socialNeeds: (parent) => parent.social_needs,
    strangerFriendly: (parent) => parent.stranger_friendly,
    // get all images for a breed, given a breed id
    breedImage: ({ id }, _, { dataSources }) => {
      return dataSources.catAPI.getImagesOfBreed(id);
    }
  }
};

module.exports = resolvers;
