import { useMutation, queryCache } from "react-query";
import { deleteVenue } from "../api";

export default function useDeleteVenue(cb) {
  const [deleteSelectedVenue] = useMutation((id) => deleteVenue(id), {
    onMutate: (id) => {
      queryCache.cancelQueries("venues");

      const previousValue = queryCache.getQueryData("venues");

      queryCache.setQueryData("venues", (oldVenues) => {
        return [...oldVenues.filter((venue) => venue.id !== id)];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("venues", previousValue),
    onSuccess: () => {
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries("venues"),
  });

  return deleteSelectedVenue;
}
