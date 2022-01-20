import nock from 'nock';
import { gql } from 'apollo-server';
import { query } from '../test-utils/apollo-server';
import breeds from '../mocks/breeds.json';

describe('Test Cat Wiki API', () => {
  const BASE_URL = 'https://api.thecatapi.com/v1';

  const GET_BREEDS = gql`
    query getBreeds($limit: Int) {
      getBreeds(limit: $limit) {
        name
        id
      }
    }
  `;

  const GET_BREEDS_BY_NAME = gql`
    query getBreedsByName($breedName: String!) {
      getBreedsByName(breedName: $breedName) {
        description
        name
        temperament
        strangerFriendly
        socialNeeds
        healthIssues
        intelligence
        grooming
        childFriendly
        affectionLevel
        adaptability
        lifeSpan
        origin
        id
      }
    }
  `;

  it('should return single breed', async () => {
    nock(BASE_URL).get('/breeds').query({ limit: 1 }).reply(200, breeds);

    const response = await query({
      query: GET_BREEDS,
      variables: { limit: 1 }
    });

    expect(response.errors).toBeUndefined();
    expect(response.data).toMatchSnapshot();
  });

  it('should return breeds by name', async () => {
    nock(BASE_URL).get('/breeds/search').query({ q: 'persian' }).reply(200, breeds);

    const response = await query({
      query: GET_BREEDS_BY_NAME,
      variables: { breedName: 'persian' }
    });
    expect(response.data).toMatchSnapshot();
  });

  it('should return null if breed name does not exist', async () => {
    nock(BASE_URL).get('/breeds/search').query({ q: 'whatever' }).reply(200);

    const response = await query({
      query: GET_BREEDS_BY_NAME,
      variables: { breedName: 'whatever' }
    });

    expect(response.data).toBeNull();
  });

  it('should throw error if no breed name is provided', async () => {
    nock(BASE_URL).get('/breeds/search').query({ q: '' }).reply(200);

    const response = await query({
      query: GET_BREEDS_BY_NAME,
      variables: { breedName: '' }
    });

    expect(response.errors).toHaveLength(1);
    expect(response.errors).toMatchSnapshot();
  });
});
