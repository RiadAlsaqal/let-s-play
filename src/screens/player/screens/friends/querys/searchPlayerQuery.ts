import { createGqlQuery } from "@src/shared/factory";

export const SEARCH_PLAYER_QUERY = createGqlQuery(
  `query searchPlayer($playerName: String!, $withoutFriend: Boolean!) {
    serchPlayer {
      data(playerName: $playerName, withoutFriend: $withoutFriend) {
        edges {
          node {
            state
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
