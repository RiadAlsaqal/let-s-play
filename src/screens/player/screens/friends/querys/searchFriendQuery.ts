import { createGqlQuery } from "@src/shared/factory";

export const SEARCH_FRIEND_QUERY = createGqlQuery(`
query searchFriend($playerName:String!){
    getFriendByName{
        data(name:$playerName){
          edges{
            node{
              friends{
                pkPlayer
                state
                userId{
                  firstName
                  lastName
                  
                }
              }
            }
          }
        }
      }
  }
`);
