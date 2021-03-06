import React from 'react';
import PropTypes from 'prop-types';
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

const ItemContainer = styled.div`
  background: #fff;
  padding: 5px 0;
  width: 100%;

  &:nth-child(2n) {
    background: #e2e2e2;
  }

  ${(props) =>
    props.active &&
    css`
      &:hover {
        cursor: pointer;
      }
    `};
`;

const TeamName = styled.h2`
  margin: 0;
  text-transform: capitalize;
  color: ${(props) => props.theme.primary.color};
`;

const TeamScore = styled.h2`
  margin: 0;
  font-size: 4rem;
  text-transform: capitalize;
  color: ${(props) =>
    props.winner ? props.theme.success.color : props.theme.secondary.color};
`;

const Title = styled.h2`
  margin: 0;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary.color};
`;

const ActiveIcon = styled.div`
  color: #222;
  animation: ${iconLoop} 0.5s alternate infinite;
`;

const HomeGameListItem = ({ game, goToActive }) => {
  return (
    <ItemContainer
      onClick={game.active ? goToActive : null}
      active={game.active}
    >
      <FlexContainer
        fullWidth
        align="center"
        justify="space-evenly"
        padding="0"
      >
        <TeamName>{game.home.name}</TeamName>
        <TeamScore winner={game.homePoints > game.awayPoints}>
          {game.homePoints}
        </TeamScore>
        <Title>VS</Title>
        <TeamScore winner={game.homePoints < game.awayPoints}>
          {game.awayPoints}
        </TeamScore>
        <TeamName>{game.away.name}</TeamName>
        <Title>{game.venue}</Title>
        {game.active && (
          <ActiveIcon>
            <FontAwesomeIcon icon={faChevronRight} size="4x" />
          </ActiveIcon>
        )}
      </FlexContainer>
    </ItemContainer>
  );
};

HomeGameListItem.propTypes = {
  game: PropTypes.object.isRequired,
  goToActive: PropTypes.func,
};

export default React.memo(HomeGameListItem);
