import { useMutation, queryCache } from "react-query";
import shortid from "shortid";
import { saveNewVenue } from "../api";

export default function useSaveVenue(cb) {
  const [saveVenue] = useMutation((venue) => saveNewVenue(venue), {
    onMutate: (venue) => {
      queryCache.cancelQueries("venues");

      const previousValue = queryCache.getQueryData("venues");

      queryCache.setQueryData("venues", (oldVenues) => {
        const venues = venue.id
          ? [...oldVenues.filter((v) => v.id !== venue.id)]
          : [...oldVenues];
        return [
          ...venues,
          { ...venue, id: venue.id ? venue.id : shortid.generate() },
        ];
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

  return saveVenue;
}
