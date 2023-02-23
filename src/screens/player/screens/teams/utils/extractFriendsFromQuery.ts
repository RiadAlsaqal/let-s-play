export const extractFriendsFromQuery = (query: TData) => {
  let friends: NewTypeFriend[] = [];
  query.getFriendCanAddToTeam.data.edges.map(
    ({
      node: {
        friends: {
          pkPlayer,
          userId: { firstName, lastName },
        },
      },
    }) => {
      friends = [...friends, { firstName, lastName, pkPlayer }];
    }
  );
  return friends;
};

type TData = {
  getFriendCanAddToTeam: {
    data: {
      edges: {
        node: {
          friends: {
            pkPlayer: number;
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
  pkPlayer: number;
};
