import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexContainer } from '../../styledElements';

const iconLoop = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(40px);
  }
`;

const ItemWrapper = styled.div`
  background: #fff;
  padding: 5px 0;
  
  &:nth-child(2n) {
    background: #e2e2e2;
  }
  
  ${props => props.active && css`
      &:hover{
        cursor: pointer;
      }
  `};
`;

const TeamName = styled.h1`
  margin: 0;
  text-transform: capitalize;
  color: ${props => props.theme.primary.color};
`;

const TeamScore = styled.h1`
  margin: 0;
  font-size: 4rem;
  text-transform: capitalize;
  color: ${props => props.winner ? props.theme.generic.color : props.theme.secondary.color};
`;

const Title = styled.h2`
  margin: 0;
  text-transform: uppercase;
  color: ${props => props.theme.primary.color};
`;

const ActiveIcon = styled.div`
  color: #222;
  animation: ${iconLoop} 0.5s alternate infinite;
`;


const GameItem = ({ game, goToActive }) => {

  return (
    <ItemWrapper onClick={game.active ? goToActive : null} active={game.active}>
      <FlexContainer
        fullWidth
        align="center"
        justify="space-evenly"
        padding="0"
      >
        <TeamName>{game.home}</TeamName>
        <TeamScore winner={game.homePoints > game.awayPoints}>{game.homePoints}</TeamScore>
        <Title>VS</Title>
        <TeamScore winner={game.homePoints < game.awayPoints}>{game.awayPoints}</TeamScore>
        <TeamName>{game.home}</TeamName>
        <Title>{game.venue}</Title>
        {
          game.active && (
            <ActiveIcon>
              <FontAwesomeIcon icon={faChevronRight} size="4x" />
            </ActiveIcon>
          )
        }
      </FlexContainer>
    </ItemWrapper>
  )
};

export default GameItem;