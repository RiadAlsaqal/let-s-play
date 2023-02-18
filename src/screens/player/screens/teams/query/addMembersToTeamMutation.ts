import { createGqlQuery } from "@src/shared/factory";

export const ADD_MEMBERS_TO_TEAM_MUTATION = createGqlQuery(
  `
    mutation addMembersToTeam($teamPk:ID!,$members:[Int]!) {
        addMember(data:{teamPk:$teamPk,members:$members}){
          
          message
          status
        }
      }
    `
);
