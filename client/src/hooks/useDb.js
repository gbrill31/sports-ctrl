import { useQuery } from "react-query";
import { connectDB } from "../api";

export default function useTeams() {
  return useQuery("db", connectDB, {
    refetchOnWindowFocus: false,
  });
  // if (status === "success" && data) {
  //   teams = data.map((team) => new Team(team));
  // }
  // return { status, data: teams, error, isFetching };
}
