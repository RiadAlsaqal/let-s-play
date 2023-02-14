import { createGqlQuery } from "@src/shared/factory";

export const GET_FRIEND_QUERY = createGqlQuery(
  `
  query getFriend($name: String!) {
    getFriend {
      data(name: $name) {
        edges {
          node {
            state
            friends {
              pkPlayer
              userId {
                firstName
                lastName
              }
            }
          }
        }
      }
      status
      message
    }
  }
  
    `
);
