import { useMutation, queryCache } from "react-query";
import { deleteTeam } from "../api";

export default function useDeleteTeam(cb) {
  const [deleteSelectedTeam] = useMutation((id) => deleteTeam(id), {
    onMutate: (id) => {
      queryCache.cancelQueries("teams");

      const previousValue = queryCache.getQueryData("teams");

      queryCache.setQueryData("teams", (oldTeams) => {
        return [...oldTeams.filter((team) => team.id !== id)];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("teams", previousValue),
    onSuccess: () => {
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries("teams"),
  });

  return deleteSelectedTeam;
}
