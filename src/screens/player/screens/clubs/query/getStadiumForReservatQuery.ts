import { createGqlQuery } from "@src/shared/factory";

export const GET_STADIUM_FOR_RESERVATE_QUERY = createGqlQuery(
  `query getStadiumForReservat($typeId:ID!,$date:Date) {
    stadiumFilter{
      data(typeId:$typeId,date:$date){
        edges{
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
          section{
            clubId{
              name
              locationLat
              locationLong
              pkClub
            }
          }
              }
        }
      }
      message
      status

    }
    }
    `
);
