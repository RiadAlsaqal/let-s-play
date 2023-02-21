import { createGqlQuery } from "@src/shared/factory";

export const DELETE_TEAM_MUTATION = createGqlQuery(
  `
mutation deleteTeam($pk:ID!) {
    deleteTeam(data:{pk:$pk}){
    
      message
      status
    }
  }
`
);
