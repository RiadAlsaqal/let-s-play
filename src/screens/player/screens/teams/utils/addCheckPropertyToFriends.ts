export const addCheckPropertToFriends = <T>(
  friends: T[]
): (T & { check: boolean })[] =>
  friends.map((friend) => ({ ...friend, check: false }));
