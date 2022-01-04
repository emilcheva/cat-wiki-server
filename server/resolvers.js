const resolvers = {
  Query: {
    // get all images for a breed, given by Breed Name
    getImagesOfBreed: (_, { breedId, limit }, { dataSources }) => {
      return dataSources.catAPI.getImagesOfBreed(breedId, limit);
    },
    // get all breeds, limit them if needed
    getBreeds: (_, { limit }, { dataSources }) => {
      return dataSources.catAPI.getBreeds(limit);
    },
    // get a single module by ID, for the module detail page
    getBreedsByName: (_, { breedName }, { dataSources }) => {
      return dataSources.catAPI.getBreedsByName(breedName);
    },
  }
};

module.exports = resolvers;
