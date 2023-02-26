import { createGqlQuery } from "@src/shared/factory";

export const GET_CLUBS = createGqlQuery(
  `
    query allClub {
        AllClub {
          data(available:true) {
            edges {
              node {
                pkClub
                name
                locationLat
                locationLong
                isAvailable
                numberStad
                
              }
            }
          }
          status
          message
        }
      }
      
    `
);
