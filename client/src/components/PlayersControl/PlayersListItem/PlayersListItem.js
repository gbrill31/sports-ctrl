import React from 'react';

export default function PlayersListItem({
  player
}) {
  return (
    <div style={{ color: 'white' }}>
      {`Name: ${player.getName()}, Number: ${player.getNumber()} Stats: ${JSON.stringify(player.getStats())}`}
    </div>
  )
}

/**
name: "player name",
number: "jursey number",
"team": "playing for team name",
stats: [
  {
    "game date":{
      "playedAgainst": "team name",
      "data":{
        "PT": "points in game",
        "2FG": "number of 2 points shots scored",
        "3FG": "number of 3 points shots scored",
        "FT": "number of free throws shots scored",
        "Fouls": "number of fouls made"
      }
    }
  }
]
 */