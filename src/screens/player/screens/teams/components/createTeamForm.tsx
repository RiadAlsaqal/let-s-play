import React from "react";
import { withFormikForm, FormElementFactory } from "@src/shared/form";
import { useQuery, useMutation } from "@src/shared/hooks";
import {
  GET_TYPES_OF_TEAMS_QUERY,
  CREATE_TEAM_MUTATION,
  ADD_MEMBERS_TO_TEAM_MUTATION,
} from "../query";
import { createTeamValidationSchema, extractFriendsFromQuery } from "../utils";
import { SelectFriends } from "./index";
import { GET_ALL_FRIENDS_QUERY } from "../../friends/querys";
const extractTypes = (data: TypesResponse) => {
  let array: { label: string; value: number }[] = [];

  data.type_.data.edges.map((item) => {
    array = [...array, { label: item.node.name, value: item.node.pkType }];
  });
  return array;
};
export const CreateTeamForm = () => {
  const { data } = useQuery<TypesResponse>(GET_TYPES_OF_TEAMS_QUERY);
  const { data: friends } = useQuery<TData>(GET_ALL_FRIENDS_QUERY);
  const [createTeam] = useMutation<TDataCreateTeam>(CREATE_TEAM_MUTATION);
  const [addMembers] = useMutation(ADD_MEMBERS_TO_TEAM_MUTATION);

  const Form = withFormikForm<{}, TFormValues>({
    children: (props) => {
      console.log("data", props);
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
        console.log("friends", friends);
        addMembers({
          variables: {
            teamPk: e.data?.createTeam.data.pkTeam,
            members: selectFriends,
          },
        });
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
  allFriend: {
    data: {
      edges: {
        node: {
          pkFriend: number;
          friends: {
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
      name: "lala";
      pkTeam: 3;
    };
  };
};