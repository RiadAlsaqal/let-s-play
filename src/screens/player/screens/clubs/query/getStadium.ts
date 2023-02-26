import { createGqlQuery } from "@src/shared/factory";

export const GET_STADIUME = createGqlQuery(
  `
    
  query getStadium($id: ID!) {
    stadiumFilter {
      data(id: $id) {
        edges {
          node {
            name
            isAvailable
            hasLegua
            size
            pkStadium
            type_ {
              name
              pkType
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
