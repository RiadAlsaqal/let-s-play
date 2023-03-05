import { createGqlQuery } from "@src/shared/factory";

export const GET_MY_NOTIFECATION_QUERY = createGqlQuery(`
query getMyNotifecations {
  getNotification{
    data{
      edges{
        
        node{
          
          senderId{
            username
          }
          teamId{
            name
            type_{
              name
              pkType
            }
            
          }
          senderKind
          type
          content
          date
          
        }
      }
    }
    countNotif
    message
    status
  }
}
`);

export const READ_NOTIFECATION_MUTATION = createGqlQuery(`
mutation readNotifecation {
    readNotification{
      message
      status
    }
  }
`);

export const CHECK_NOTI = createGqlQuery(`
query checkNoti{
  hasNotification{
    data
    message
    status
  }
}
`);
