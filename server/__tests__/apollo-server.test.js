import nock from "nock";
import { gql } from "apollo-server";
import { query } from "../test-utils/apollo-server";
import breed from "../mocks/breed.json";

describe("Test Cat Wiki API", () => {
  const baseURL = "https://api.thecatapi.com/v1";

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

  it("should return single breed", async () => {
    nock(baseURL).get("/breeds").query({ limit: 1 }).reply(200, breed);

    const response = await query({
      query: GET_BREEDS,
      variables: { limit: 1 },
    });

    expect(response.errors).toBeUndefined();
    expect(response).toMatchSnapshot();
  });

  it("should return breeds by name", async () => {
    nock(baseURL)
      .get("/breeds/search")
      .query({ q: "persian" })
      .reply(200, breed);

    const response = await query({
      query: GET_BREEDS_BY_NAME,
      variables: { breedName: "persian" },
    });
    expect(response).toMatchSnapshot();
  });

  it("should throw error if no breed name is given", async () => {
    nock(baseURL)
      .get("/breeds/search")
      .query({ q: "persian" })
      .reply(200);

    const response = await query({
      query: GET_BREEDS_BY_NAME
    });

    expect(response.data).toBeUndefined();
  });
});
