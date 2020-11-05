import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Icon,
  Input,
  FlexContainer,
  FormError,
} from '../../../styledElements';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import useSavePlayers from '../../../hooks/useSavePlayers';

export default function NewPlayerForm({ cb }) {
  const [players, setPlayers] = useState([]);

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const selectedTeam = useSelector((state) => state.teams.selected);

  const addPlayer = (data) => {
    setPlayers([
      ...players,
      {
        ...data,
        team: selectedTeam.name,
        teamId: selectedTeam.id,
      },
    ]);
    reset();
    document.querySelector('#name').focus();
  };
  const { savePlayers, status } = useSavePlayers(() => {
    setPlayers([]);
    cb();
  });

  const saveNewPlayers = () => savePlayers(players);

  const onSubmit = (data) => {
    addPlayer(data);
  };

  const removePlayer = (player) => () => {
    setPlayers(
      players.filter(
        (p) => p.name !== player.name && p.number !== player.number
      )
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FlexContainer column justify="center" align="center">
          <Input
            autoFocus
            required
            color="#fff"
            error={errors.name}
            ref={register({ required: true })}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && <FormError>* This field is required</FormError>}
          <Input
            required
            color="#fff"
            error={errors.number}
            ref={register({ required: true })}
            id="number"
            name="number"
            type="text"
            placeholder="Number"
          />
          {errors.number && <FormError>* This field is required</FormError>}
        </FlexContainer>
        <FlexContainer column justify="center" align="center">
          <Button type="submit" color="secondary">
            Add To List
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </Icon>
          </Button>
          <Button
            color="success"
            onClick={saveNewPlayers}
            saving={status === 'pending'}
            width="40%"
            margin="40px 0 5px 0"
            disabled={players.length === 0}
          >
            Save Players
          </Button>
        </FlexContainer>
      </form>
      <FlexContainer>
        {players &&
          players.map((player) => (
            <Button
              color="generic"
              key={`${player.name}${player.number}`}
              onClick={removePlayer(player)}
            >
              {`${player.number} ${player.name}`}
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </Icon>
            </Button>
          ))}
      </FlexContainer>
    </>
  );
}
