import { createGqlQuery } from "@src/shared/factory";

export const LOGIN_MUTATION = createGqlQuery(`
mutation login($email:String,$password:String!){
    login(password:$password,email:$email){
      token
      success
      errors
      user{
        username
        phone
        firstName
      }
      unarchiving
      refreshToken
    }
  }

`);
