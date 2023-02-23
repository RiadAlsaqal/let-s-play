import { createGqlQuery } from "@src/shared/factory";

export const GET_ALL_FRIENDS_QUERY = createGqlQuery(
  `query getAllFriends {
    allFriend{
       data{
        edges{
          node{
            friends{
              pkPlayer
              userId{				               
                firstName
                lastName
                
              }
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
