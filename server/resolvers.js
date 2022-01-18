const resolvers = {
  Query: {
    // get all breeds, limit them if needed
    getBreeds: (_, { limit }, { dataSources }) => {
      return dataSources.catAPI.getBreeds(limit);
    },
    // get a single module by ID, for the module detail page
    getBreedsByName: (_, { breedName }, { dataSources }) => {
     return dataSources.catAPI.getBreedsByName(breedName)
    },
  },
  Breed: {
    // get all images for a breed, given a breed id, also get 9 unique images
    breedImage : ({ id }, _, { dataSources }) => {
      return dataSources.catAPI.getImagesOfBreed(id, limit = 9);
    },
  },
};

module.exports = resolvers;
