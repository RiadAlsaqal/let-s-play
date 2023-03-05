import { createGqlQuery } from "@src/shared/factory";

export const RESERVATE_MUTATION = createGqlQuery(`
mutation reservate($durationId: ID!,$date: Date!,$kind: String!,$teamId: ID) {
  reserveDuration(data:{durationId:$durationId,date:$date,kind:$kind,count:0,teamId:$teamId}){
    message
    status
  }
}
`);
