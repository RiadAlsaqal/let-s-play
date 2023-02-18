import * as Yup from "yup";

export const createTeamValidationSchema = Yup.object().shape({
  nameOfTeam: Yup.string().required("name of the team is required"),
  typeOfTeam: Yup.number().required("type of the team is required"),
  friends: Yup.array(Yup.number()).optional(),
});
