import { createGqlQuery } from "@src/shared/factory";

export const GET_AVAILABLE_DURATION_FOR_STADIUM = createGqlQuery(
  `
    query avaliableDurationByStadium($stadiumId:ID!,$date:Date!){
        avaliableDurationByStadium{
          data(stadium:$stadiumId,date:$date){
            edges{
              node{
                price
                startTime
                endTime
                pkDuration
               
                available
              }
            }
          }
          status
          message
        }
      }
    `
);
