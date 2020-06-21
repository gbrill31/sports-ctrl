import { useQuery } from "react-query";
import { getAllGames } from "../api";

export default function useTeams(isAllowed) {
  return useQuery(isAllowed && "games", getAllGames, {
    refetchOnWindowFocus: false,
  });
}
