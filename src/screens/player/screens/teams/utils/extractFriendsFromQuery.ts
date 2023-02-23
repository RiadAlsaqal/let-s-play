export const extractFriendsFromQuery = (query: TData | undefined) => {
  let friends: NewTypeFriend[] = [];
  if (!!query)
    query.edges.map(
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
  edges: {
    node: {
      friends: {
        pkPlayer: number;
        userId: TFriend;
      };
    };
  }[];
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
