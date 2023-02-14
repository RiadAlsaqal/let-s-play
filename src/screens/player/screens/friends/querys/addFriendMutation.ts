import { createGqlQuery } from "@src/shared/factory";

export const ADD_FRIEND_MUTATION = createGqlQuery(
  `mutation addFriend($playerPk: ID!) {
    addFreind(data: {playerPk: $playerPk}) {
      data {
        id
        pkFriend
        friends {
          userId {
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
