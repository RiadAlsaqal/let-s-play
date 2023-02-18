import { createGqlQuery } from "@src/shared/factory";

export const FIND_PLAYER_ON_MAP = createGqlQuery(
  `
  query findPlayerOnMap($lat: String!, $lon: String!, $distance: Float!) {
    findPlayerOnMap {
      data(locationLat: $lat, locationLong: $lon, distance: $distance) {
        edges {
          node {
            pkPlayer
            state
            locationLat
            locationLong
            userId {
              firstName
              lastName

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
