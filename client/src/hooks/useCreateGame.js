import { useMutation, queryCache } from "react-query";
import { createNewGame } from "../api";

export default function useSaveTeam(cb) {
  const [createGame] = useMutation((game) => createNewGame(game), {
    onMutate: (game) => {
      queryCache.cancelQueries("active-game");
      return game;
    },
    onError: (err) => queryCache.cancelQueries("active-game"),
    onSuccess: (data) => {
      if (cb) cb();
      queryCache.setQueryData("active-game", data);
    },
    onSettled: () => queryCache.refetchQueries("active-game"),
  });

  return createGame;
}
