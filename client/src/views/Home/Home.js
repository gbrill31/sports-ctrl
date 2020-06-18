import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import GamesList from "../../components/GamesList/GamesList";
import useDb from "../../hooks/useDb";

import { getAllGames } from "../../actions";

function Home() {
  const dispatch = useDispatch();

  const { status: dbStatus } = useDb();

  const getAllPlayedGames = useCallback(() => dispatch(getAllGames()), [
    dispatch,
  ]);

  useEffect(() => {
    if (dbStatus === "success") {
      getAllPlayedGames();
    }
  }, [dbStatus, getAllPlayedGames]);

  return (
    <>
      <GamesList />
    </>
  );
}

export default Home;
