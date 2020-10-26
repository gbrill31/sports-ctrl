import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input,
  FlexContainer,
  MainTitle,
  Link,
} from '../../styledElements';
import styled from 'styled-components';

import { registerUser } from '../../api';

const FormContainer = styled.form`
  label {
    color: #fff;
    width: 150px;
  }
`;

const FormError = styled.div`
  color: ${(props) => props.theme.error.color};
  font-size: 0.8rem;
  padding-top: 5px;
  margin: 0;
`;

export default function RegisterAdmin() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm({
    mode: 'all',
  });
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const user = await registerUser(data);
      if (user) setIsSaving(false);
    } catch (err) {
      reset();
      setIsSaving(false);
    }
  };

  const goToRoute = (route) => () => history.push(route);

  const handlePasswordChange = (e) => setPassword(e.target.value);

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
    <FlexContainer
      justify="center"
      align="center"
      fullHeight
      padding="0"
      column
    >
      <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
        <FlexContainer column noWrap justify="center" align="center">
          <MainTitle uppercase align="center">
            Register
          </MainTitle>
          <Input
            autoFocus
            name="name"
            id="name"
            type="text"
            placeholder="First name"
            error={errors.name}
            ref={register({ required: true })}
            color="#fff"
          />
          {errors.name && <FormError>* This field is required</FormError>}
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            error={errors.email}
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            color="#fff"
          />
          {errors.email && errors.email.type === 'required' && (
            <FormError>* This field is required</FormError>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <FormError>{errors.email.message}</FormError>
          )}
          <Input
            autocomplete="new-password"
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            error={errors.password}
            ref={register({
              required: true,
              minLength: 6,
            })}
            color="#fff"
            onChange={handlePasswordChange}
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
              // validate: validatePassword,
            })}
            onChange={validatePassword}
            color="#fff"
          />
          {errors.verifyPassword &&
            errors.verifyPassword.type === 'required' && (
              <FormError>* This field is required</FormError>
            )}
          {errors.verifyPassword && errors.verifyPassword.type === 'verify' && (
            <FormError>{errors.verifyPassword.message}</FormError>
          )}
          <Button
            type="submit"
            color="success"
            saving={isSaving}
            width="80%"
            margin="40px 0 5px 0"
          >
            Register
          </Button>
          <Link onClick={goToRoute('/userlogin')} fontSize="0.8rem">
            Sign In
          </Link>
        </FlexContainer>
      </FormContainer>
    </FlexContainer>
  );
}
