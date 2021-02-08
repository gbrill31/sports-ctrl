import { useMutation, useQueryClient } from 'react-query';
import { createNewGame } from '../../api';

export default function useSaveTeam(cb) {
  const queryClient = useQueryClient();
  const createGame = useMutation((game) => createNewGame(game), {
    onMutate: async (game) => {
      await queryClient.cancelQueries('active-game');
      return game;
    },
    onError: (err) => queryClient.cancelQueries('active-game'),
    onSuccess: (data) => {
      queryClient.invalidateQueries('active-game');
      if (cb) cb();
      queryClient.setQueryData('active-game', data);
    },
    onSettled: () => queryClient.refetchQueries('active-game'),
  });

  return createGame.mutate;
}
