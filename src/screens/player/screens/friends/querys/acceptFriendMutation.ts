import { createGqlQuery } from "@src/shared/factory";

export const ACCEPT_FRIEND_MUTATION = createGqlQuery(
  `
  mutation acceptFriend($playerPk: ID!) {
    acceptFriend(data: {playerPk: $playerPk}) {
      data {
        pkFriend
        friends {
          state
          userId {
            firstName
            lastName
          }
        }
      }
      message
      status
    }
  }
  
      
    `
);
