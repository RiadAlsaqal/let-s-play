import { createGqlQuery } from "@src/shared/factory";

export const REJECT_FRIEND_MUTATION = createGqlQuery(
  `mutation rejectFriend($playerPk: ID!) {
        rejectFriend(data:{playerPk: $playerPk}) {
          data {
            state
            pkFriend
            friends {
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
