import { createGqlQuery } from "@src/shared/factory";

export const GET_MY_TEAMS_QUERY = createGqlQuery(
  `
  query getMyTeams($onlyCaptin:Boolean) {
  
    myAllTeam{
      data(onlyCaptin:$onlyCaptin){
        edges{
          node{
            name
            pkTeam
            type_ {
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
