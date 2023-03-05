import { createGqlQuery } from "@src/shared/factory";
export const SIGNUP_MUTATION = createGqlQuery(`
mutation myMutation($lat: String!, $lon: String!, $firstName: String!, $lastName: String!, $email: String!, $phone: Int!, $password: String!, $picture: Upload) {
  SignUpPlyer(data: {user: {firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, password: $password}, locationLat: $lat, locationLong: $lon, picture: $picture}) {
    data {
      
      userId {
        username
        
      }
      
      locationLat
      locationLong
      pkPlayer
      
    }
    message
    status
  }
}


`);
