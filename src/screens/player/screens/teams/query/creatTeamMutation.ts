import { createGqlQuery } from "@src/shared/factory";

export const CREATE_TEAM_MUTATION = createGqlQuery(
  `
    mutation createTeam($name:String!,$typeId:ID!) {
        createTeam(data:{name:$name,typeId:$typeId}){
          data{
            name
            pkTeam
            
          }
          message
          status
        }
      }
      
      
      
      
    `
);
