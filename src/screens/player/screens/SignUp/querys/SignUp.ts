import { createGqlQuery } from "@src/shared/factory";
export const SIGNUP_MUTATION = createGqlQuery(`
  mutation myMutation(
    $lat: String!
    $lon: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Int!
    $password: String!
  ) {
    SignUpPlyer(
      playerData: {
        user: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          password: $password
        }
        locationLat: $lat
        locationLong: $lon
      }
    ) {
      data {
        userId {
          username
        }
        locationLat
        locationLong
        id
      }
      message
      status
    }
  }
`);
