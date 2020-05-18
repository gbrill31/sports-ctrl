import React from 'react';
import styled, { css } from 'styled-components';
import {
  MainTitle, FlexContainer, ScrollableContainer
} from '../../../styledElements';

const ItemContainer = styled.div`
  width: 80%;
  background-color: #fff;
  color: #333;
  text-transform: capitalize;
  padding: 15px;
  margin-bottom: 15px;
  /* min-width: 600px; */
  transition: box-shadow 0.1s ease;
  cursor: pointer;

  &:hover{
    box-shadow: ${props => !props.selected ? `0 2px 5px 1px ${props.theme.primary.hover} inset` : ''};
  }

  ${props => props.selected && css`
    box-shadow: 0 5px 8px 0px ${props => props.theme.success.color} inset;
  `}

  h2{
    font-size: 2rem;
    font-weight: bold;
  }
  h3{
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 15px;
  }
  h4{
    margin: 0;
    color: #999;
    font-weight: 300;
    margin-left: 10px;
  }
`;

const ItemStat = styled.div`
  color: ${props => props.color ? props.theme[props.color].color : props.theme.success.color};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 20px;

  h3{
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    margin-left: 15px;
  }
`;

export default function TeamGameControl({ teamLocation, team, borderRight }) {
  return (
    <div>
      <FlexContainer justify="center">
        <MainTitle soft uppercase>{teamLocation}</MainTitle>
      </FlexContainer>
      <MainTitle align="center" capitalize>{team.getName()}</MainTitle>
      <ScrollableContainer heightDiff={420} fullWidth>
        <FlexContainer column align="center" minWidth="600" borderRight={borderRight}>
          {
            team.getPlayers()
              .map(player => (
                <ItemContainer key={player.getId()}>
                  <FlexContainer align="center" padding="0">
                    <h2>
                      {player.getNumber()}
                    </h2>
                    <h3>
                      {player.getName()}
                    </h3>
                    <ItemStat>
                      Points: {player.getTotalPoints()}
                    </ItemStat>
                    <ItemStat color="primary">
                      FOULS: {player.getTotalFouls()}
                    </ItemStat>
                  </FlexContainer>
                  <h4>Game Statistics</h4>
                  <FlexContainer>
                    <ItemStat>
                      <h3>2FG: {player.get2FG()}</h3>
                    </ItemStat>
                    <ItemStat>
                      <h3>3FG: {player.get3FG()}</h3>
                    </ItemStat>
                    <ItemStat>
                      <h3>FT: {player.getFT()}</h3>
                    </ItemStat>
                  </FlexContainer>
                </ItemContainer>
              ))
          }
        </FlexContainer>
      </ScrollableContainer>
    </div>
  )
}
