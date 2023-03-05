import { createGqlQuery } from "@src/shared/factory";

export const GET_FRIENDS_REQUEST_QUERY = createGqlQuery(`
query FriendsRequist {
    myRequestFriend{
      data{
        edges{
          node{
            friends{
              userId{
                firstName
                lastName
                email
                username
                
              }
              pkPlayer
            }
          }
        }
      }
      message
      status
    }
  }
`);
