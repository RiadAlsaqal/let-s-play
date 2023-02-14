import { createGqlQuery } from "@src/shared/factory";

export const SEARCH_PLAYER_QUERY = createGqlQuery(
  `query searchPlayer($playerName: String!, $withoutFriend: Boolean!) {
    serchPlayer {
      data(playerName: $playerName, withoutFriend: $withoutFriend) {
        edges {
          node {
            pkPlayer
            userId {
              firstName
              lastName
              
            }
          }
        }
      }
      message
      status
    }
  }
  
      `
);
