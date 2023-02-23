import { createGqlQuery } from "@src/shared/factory";

export const LEAVE_TEAM_MUTATION = createGqlQuery(
  `
    mutation leaveTeam($teamPk:ID!) {
        leaveTeam(data:{teamPk:$teamPk}){
         
          message
          status
        }
      }
    `
);
