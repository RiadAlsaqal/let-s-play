import { createGqlQuery } from "@src/shared/factory";

export const LOGIN_MUTATION = createGqlQuery(`
mutation login($email:String,$password:String!){
  login(password:$password,email:$email){
    
    token
    user{
      username
      phone
      firstName
      lastName
      
      email
    	  player{
          pkPlayer
          
        }
    }
    success
    errors
    
  }
}
`);
