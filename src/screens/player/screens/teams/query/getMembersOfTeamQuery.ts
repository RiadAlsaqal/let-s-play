import { createGqlQuery } from "@src/shared/factory";

export const GET_MEMBERS_OF_TEAM_QUERY = createGqlQuery(
  `
    query getMembersOfTeam($id:ID!) {
        memmberTeamById{
          data(id:$id){
            edges{
              node{
                isCaptin
                member{
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
          message
          status
        }
      }
    `
);
