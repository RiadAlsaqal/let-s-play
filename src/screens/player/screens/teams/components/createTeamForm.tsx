import React from "react";
import { withFormikForm, FormElementFactory } from "@src/shared/form";
import { useQuery, useMutation } from "@src/shared/hooks";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackTeamsScreenProps } from "@src/shared/types";
import {
  GET_TYPES_OF_TEAMS_QUERY,
  CREATE_TEAM_MUTATION,
  ADD_MEMBERS_TO_TEAM_MUTATION,
  GET_FRIENDS_CAN_ADD_TO_TEAM,
} from "../query";
import { createTeamValidationSchema, extractFriendsFromQuery } from "../utils";
import { SelectFriends } from "./index";
import { useRefetchTeams } from "../hooks";
const extractTypes = (data: TypesResponse) => {
  let array: { label: string; value: number }[] = [];

  data.type_.data.edges.map((item) => {
    array = [...array, { label: item.node.name, value: item.node.pkType }];
  });
  return array;
};
const CreateTeamFormWithoutNavigation: React.FC<TProps> = ({ navigation }) => {
  const { data } = useQuery<TypesResponse>(GET_TYPES_OF_TEAMS_QUERY);
  const { data: friends } = useQuery<TData>(GET_FRIENDS_CAN_ADD_TO_TEAM);
  const [createTeam] = useMutation<TDataCreateTeam>(CREATE_TEAM_MUTATION);
  const [addMembers] = useMutation(ADD_MEMBERS_TO_TEAM_MUTATION);
  const { refetchTeams } = useRefetchTeams();
  const handleNavigatToTeam = () => {
    navigation.navigate("teams");
  };
  const Form = withFormikForm<{}, TFormValues>({
    children: (props) => {
      return !!data && !!friends ? (
        <>
          <FormElementFactory
            type="TextField"
            name="nameOfTeam"
            elementProps={{ label: "team name" }}
          />

          <FormElementFactory
            type="DropDown"
            name="typeOfTeam"
            elementProps={{
              items: extractTypes(data),
              placeholder: "select type ot the team",
            }}
          />
          <FormElementFactory
            type="custom"
            name="selectFriends"
            children={
              <SelectFriends
                friends={extractFriendsFromQuery(friends)}
                setValue={(value) =>
                  props.setFieldValue("selectFriends", value)
                }
              />
            }
          />
          <FormElementFactory
            type="SubmitButton"
            name="submitButton"
            elementProps={{ label: "submit" }}
          />
        </>
      ) : (
        <></>
      );
    },
    validationSchema: createTeamValidationSchema,
    handleSubmit: ({ selectFriends, nameOfTeam, typeOfTeam }) => {
      createTeam({
        variables: {
          name: nameOfTeam,
          typeId: typeOfTeam,
        },
      }).then((e) => {
        refetchTeams();
        !!selectFriends?.length
          ? addMembers({
              variables: {
                teamPk: e.data?.createTeam.data.pkTeam,
                members: selectFriends,
              },
            }).then(() => {
              handleNavigatToTeam();
            })
          : handleNavigatToTeam();
      });
    },
    mapPropsToValues: (props) => ({
      nameOfTeam: "",
      typeOfTeam: undefined,
      selectFriends: undefined,
    }),
  });
  return <Form />;
};
export const CreateTeamForm = withNavigation(CreateTeamFormWithoutNavigation);
type TProps = {
  navigation: TNavigation<TRootStackTeamsScreenProps>;
};

type TypesResponse = {
  type_: {
    data: {
      edges: TTypesInfo[];
    };
  };
};

type TTypesInfo = {
  node: {
    name: string;
    pkType: number;
  };
};

type TFormValues = {
  nameOfTeam: string;
  typeOfTeam: number | undefined;
  selectFriends: number[] | undefined;
};

type TData = {
  getFriendCanAddToTeam: {
    data: {
      edges: {
        node: {
          friends: {
            pkPlayer: number;
            userId: {
              firstName: string;
              lastName: string;
            };
          };
        };
      }[];
    };
  };
};

type TDataCreateTeam = {
  createTeam: {
    data: {
      name: string;
      pkTeam: number;
    };
  };
};
