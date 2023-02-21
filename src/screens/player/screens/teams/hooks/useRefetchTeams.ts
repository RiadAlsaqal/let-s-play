import { useClient } from "@src/shared/Apollo";

export const useRefetchTeams = () => {
  const client = useClient();
  const refetchTeams = () => {
    client.refetchQueries({
      include: ["getMyTeams"],
    });
  };
  return { refetchTeams };
};
