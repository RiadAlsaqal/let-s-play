import { createGqlQuery } from "@src/shared/factory";

export const GET_CLUB = createGqlQuery(`
query getClub($id:ID!) {
    getClubById{
      data(clubId:$id){
        edges{
          node{
            name
            numberStad
            locationLat
            locationLong
            isAvailable
            pkClub
            
          }
        }
      }
      message
      status
    }
      
      stadiumFilter {
        data(clubId:$id){
          edges{
            node{
              name
              isAvailable
              hasLegua
              size
              pkStadium
              type_{
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
`);
