- screens -[role]
  screens
  Signup
  ./components
  ./hooks
  ./context
  ./data
  ./queries
  Signup.ts
  Signup.tsx
  index.ts

const useSignUpMutation = () => {
const {mutate} = useMutation(SIGNUP_MUTATION , {
onSuccess : () => {

        }
    })

}
