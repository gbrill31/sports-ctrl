import { useMutation, queryCache } from "react-query";
import shortid from "shortid";
import { saveNewTeam } from "../api";

export default function useSaveTeam(cb) {
  const [saveTeam] = useMutation((team) => saveNewTeam(team), {
    onMutate: (team) => {
      queryCache.cancelQueries("teams");

      const previousValue = queryCache.getQueryData("teams");

      queryCache.setQueryData("teams", (oldTeams) => {
        const teams = team.id
          ? [...oldTeams.filter((t) => t.id !== team.id)]
          : [...oldTeams];
        return [
          ...teams,
          { ...team, id: team.id ? team.id : shortid.generate() },
        ];
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

  return saveTeam;
}
