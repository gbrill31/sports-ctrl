import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, Input, FlexContainer, MainTitle } from '../../styledElements';

import { updatePassword } from '../../redux';

const FormContainer = styled.form`
  label {
    color: #fff;
  }
`;

const FormError = styled.div`
  color: ${(props) => props.theme.error.color};
  font-size: 0.8rem;
  padding-top: 5px;
  margin: 0;
`;

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState('');

  const { register, handleSubmit, errors, setError, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const { user, updatePasswordPending } = useSelector((state) => state.auth);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const updateUserPassword = useCallback(
    (data) => dispatch(updatePassword(data)),
    [dispatch]
  );

  const onSubmit = async (data) => {
    updateUserPassword({ ...data, id: user.id });
  };

  const validatePassword = (e) => {
    const { value } = e.target;
    if (value !== password) {
      setError('verifyPassword', {
        type: 'verify',
        message: "Passwords doesn't match",
      });
    } else {
      clearErrors('verifyPassword');
    }
  };

  return (
    <>
      <FlexContainer
        justify="center"
        align="center"
        fullHeight
        padding="0"
        column
      >
        <MainTitle uppercase align="center">
          Set Password
        </MainTitle>
        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <FlexContainer column noWrap justify="center" align="center">
            <Input
              autocomplete="new-password"
              name="password"
              type="password"
              id="userPassword"
              placeholder="Password"
              error={errors.password}
              ref={register({
                required: true,
                minLength: 6,
              })}
              onChange={handlePasswordChange}
              color="#fff"
              width="100%"
            />
            {errors.password && errors.password.type === 'required' && (
              <FormError>* This field is required</FormError>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <FormError>Password must have a least 6 characters</FormError>
            )}
            <Input
              autocomplete="verify-password"
              name="verifyPassword"
              type="password"
              id="verifyPassword"
              placeholder="Verify password"
              error={errors.verifyPassword}
              ref={register({
                required: true,
              })}
              onChange={validatePassword}
              color="#fff"
            />
            {errors.verifyPassword &&
              errors.verifyPassword.type === 'required' && (
                <FormError>* This field is required</FormError>
              )}
            {errors.verifyPassword &&
              errors.verifyPassword.type === 'verify' && (
                <FormError>{errors.verifyPassword.message}</FormError>
              )}
            <Button
              type="submit"
              color="success"
              saving={updatePasswordPending}
              width="150px"
              margin="40px 0 5px 0"
            >
              Update
            </Button>
          </FlexContainer>
        </FormContainer>
      </FlexContainer>
    </>
  );
}
