import { useQuery } from "react-query";
import { getAllTeams } from "../api";
import Team from "../classes/Team";

export default function useTeams(isAllowed) {
  let teams;
  const { status, data, error, isFetching } = useQuery(
    isAllowed && "teams",
    getAllTeams,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (status === "success" && data) {
    teams = data.map((t) => new Team(t));
  }
  return { status, data: teams, error, isFetching };
}
