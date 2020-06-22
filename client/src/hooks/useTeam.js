import { useQuery } from "react-query";
import { getTeamById } from "../api";
import Team from "../classes/Team";

export default function useTeam(teamId) {
  let team;
  const { status, data, error, isFetching, refetch } = useQuery(
    teamId && [`team-${teamId}`, teamId],
    getTeamById,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (status === "success" && data) {
    team = new Team(data);
  }
  return { status, data: team, error, isFetching, refetch };
}
