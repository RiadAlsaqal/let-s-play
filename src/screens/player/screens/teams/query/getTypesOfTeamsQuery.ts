import { createGqlQuery } from "@src/shared/factory";

export const GET_TYPES_OF_TEAMS_QUERY = createGqlQuery(
  `
query {
    type_{
      data{
        edges{
          node{
            name
            pkType
          }
        }
      }
      status
      message
    }
  }
    `
);
