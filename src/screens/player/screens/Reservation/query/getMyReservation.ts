import { createGqlQuery } from "@src/shared/factory";

export const GET_MY_RESERVATION = createGqlQuery(`
query myReservation($teamReserve:Boolean!) {
  myReservation {
    data(teamReserve:$teamReserve) {
      edges {
        node {
          durationId {
            pkDuration
            startTime
            endTime
            price
            stadium {
              name
              pkStadium
              section {
                clubId {
                  name
                  pkClub
                  locationLat
                  locationLong
                }
              }
              type_ {
                pkType
                name
              }
            }
          }
          kind
          date
          pkReservation
          owner
          
        }
      }
    }
    message
    status
  }
}

  
`);
