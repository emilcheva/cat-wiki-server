const { RESTDataSource } = require('apollo-datasource-rest');

class catAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.thecatapi.com/v1/';
  }
  getImagesOfBreed(breedId, limit = 9) {
    return this.get(`images/search?breed_ids=${breedId}&limit=${limit}`);
  }
  getBreedsByName(breedName) {
    return this.get(`breeds/search?q=${breedName}`);
  }
  getBreeds(limit) {
    return this.get(`breeds?limit=${limit}`);
  }
}

module.exports = catAPI;
