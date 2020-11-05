import React from 'react';
import { useForm } from 'react-hook-form';
import useSaveVenue from '../../../hooks/useSaveVenue';
import { Button, FlexContainer, FormError } from '../../../styledElements';
import { Input } from '../../../styledElements';

export default function NewVenueForm({ cb }) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      seats: 0,
    },
  });

  const { saveVenue, status } = useSaveVenue(cb);

  const onSubmit = async (data) => {
    saveVenue({ ...data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FlexContainer column noWrap justify="center" align="center">
          <Input
            required
            autoFocus
            color="#fff"
            id="name"
            name="name"
            type="text"
            placeholder="Venue Name"
            error={errors.name}
            ref={register({ required: true })}
          />
          {errors.name && <FormError>* This field is required</FormError>}
          <Input
            required
            color="#fff"
            id="country"
            name="country"
            type="text"
            placeholder="Country"
            error={errors.country}
            ref={register({ required: true })}
          />
          {errors.country && <FormError>* This field is required</FormError>}
          <Input
            required
            color="#fff"
            id="city"
            name="city"
            type="text"
            placeholder="City"
            error={errors.city}
            ref={register({ required: true })}
          />
          {errors.city && <FormError>* This field is required</FormError>}
          <Input
            id="seats"
            name="seats"
            color="#fff"
            type="number"
            min="0"
            placeholder="Seats"
            ref={register()}
          />
          <Button
            type="submit"
            color="success"
            saving={status === 'pending'}
            width="40%"
            margin="40px 0 5px 0"
          >
            Create
          </Button>
        </FlexContainer>
      </form>
    </>
  );
}
