import React from 'react';
import styled, { keyframes } from 'styled-components';
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
    background: ${props => props.active ? 'inherit' : '#fff'};
    
    &:nth-child(2n) {
      background: #e2e2e2;
    }
`;

const TeamName = styled.h1`
  text-transform: capitalize;
  color: ${props => props.theme.primary.color};
`;

const Title = styled.h2`
  text-transform: uppercase;
  color: ${props => props.theme.primary.color};
`;

const ActiveIcon = styled.div`
  color: #fff;
  animation: ${iconLoop} 0.5s alternate infinite;
`;


const GameItem = ({ game }) => {
  return (
    <ItemWrapper active={game.active}>
      <FlexContainer
        fullWidth
        align="center"
        justify="space-evenly"
      >
        <TeamName>{game.home}</TeamName>
        <Title>VS</Title>
        <TeamName>{game.away}</TeamName>
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