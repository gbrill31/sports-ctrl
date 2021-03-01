import React from 'react';
import { useForm } from 'react-hook-form';
import useSaveTeam from '../../../hooks/reactQuery/useSaveTeam';
import {
  Input,
  FlexContainer,
  Button,
  FormError,
} from '../../../styledElements';

export default function NewTeamForm({ cb, team }) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: team?.name || '',
      country: team?.country || '',
      city: team?.city || '',
    },
  });

  const { saveTeam, status } = useSaveTeam(cb);

  const onSubmit = async (data) => {
    saveTeam({ ...data, id: team?.id });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FlexContainer column justify="center" align="center">
          <Input
            required
            autoFocus
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
            error={errors.country}
            ref={register({ required: true })}
            id="country"
            name="country"
            type="text"
            placeholder="Country"
          />
          {errors.country && <FormError>* This field is required</FormError>}
          <Input
            required
            color="#fff"
            error={errors.city}
            ref={register({ required: true })}
            id="city"
            name="city"
            type="text"
            placeholder="City"
          />
          {errors.city && <FormError>* This field is required</FormError>}
          <Button
            type="submit"
            color="success"
            saving={status === 'pending'}
            width="40%"
            margin="40px 0 5px 0"
          >
            Save
          </Button>
        </FlexContainer>
      </form>
    </>
  );
}
