import { createGqlQuery } from "@src/shared/factory";

export const GET_TEAM_QUERY = createGqlQuery(
  `
    query getMyTeams($id: ID!) {
  
        myTeamById{
          data(id:$id){
            edges{
              node{
                name
                memberCount
                pkTeam
                
                type_{
                  name
                  
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
