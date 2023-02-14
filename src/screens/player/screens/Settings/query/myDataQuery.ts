import { createGqlQuery } from "@src/shared/factory";

export const MY_DATA_QUERY = createGqlQuery(
  `
    query myData {
        playerMe{
          data{
            edges{
              node{
                availableOnMap
                userId{
                  username
                  firstName
                  lastName
                  email
                  
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
