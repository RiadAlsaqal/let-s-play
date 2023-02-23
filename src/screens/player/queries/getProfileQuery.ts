import { createGqlQuery } from "@src/shared/factory";

export const GET_PROFILE_QUERY = createGqlQuery(
  `
  query getProfile($playerId:ID!) {
    getPLayerById {
      data(playerId: $playerId) {
        edges{
          node{
            pkPlayer
            state
            userId{
              firstName
              lastName
              
              
            }
          }
        }
      }
    }
  }
    
    `
);
