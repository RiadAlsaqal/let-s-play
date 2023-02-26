import { createGqlQuery } from "@src/shared/factory";

export const REMOVE_MEMBER_MUTATION = createGqlQuery(
  `
    mutation removeMember($teamPk:ID!,$members:[Int]!){
        removeMemmbers(data:{teamPk:$teamPk,members:$members}){
          
          message
          status
        }
      }
    `
);
