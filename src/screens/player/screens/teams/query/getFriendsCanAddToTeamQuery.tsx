import { createGqlQuery } from "@src/shared/factory";

export const GET_FRIENDS_CAN_ADD_TO_TEAM_QUERY = createGqlQuery(
  `
    query getFriendsCanAddToTeam($teamId:ID!) {
        getFriendCanAddToTeam{
          data(teamId:$teamId){
            edges{
              node{
                friends{
                  pkPlayer
                  userId{
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
