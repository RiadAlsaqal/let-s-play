export const extractFriendsFromQuery = (query: TData) => {
  let friends: NewTypeFriend[] = [];
  query.allFriend.data.edges.map(
    ({
      node: {
        pkFriend,
        friends: {
          userId: { firstName, lastName },
        },
      },
    }) => {
      friends = [...friends, { firstName, lastName, pkFriend }];
    }
  );
  return friends;
};

type TData = {
  allFriend: {
    data: {
      edges: {
        node: {
          pkFriend: number;
          friends: {
            userId: TFriend;
          };
        };
      }[];
    };
  };
};

type TFriend = {
  firstName: string;
  lastName: string;
};

type NewTypeFriend = {
  firstName: string;
  lastName: string;
  pkFriend: number;
};
