import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  Input,
  FlexContainer,
  Link,
  MainTitle,
} from '../../styledElements';

import { userLogin } from '../../actions';

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

export default function UserLoginForm() {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const { loginPending } = useSelector((state) => state.auth);

  const loginUser = useCallback((data) => dispatch(userLogin(data)), [
    dispatch,
  ]);

  const onSubmit = async (data) => {
    loginUser(data);
  };

  const goToRoute = (route) => () => history.push(route);

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
          Sign In
        </MainTitle>
        <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
          <FlexContainer column noWrap justify="center" align="center">
            <Input
              autocomplete="user-email"
              name="email"
              type="email"
              id="userEmail"
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
              width="100%"
            />
            {errors.email && errors.email.type === 'required' && (
              <FormError>* This field is required</FormError>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <FormError>{errors.email.message}</FormError>
            )}
            <Input
              autocomplete="current-password"
              name="password"
              type="password"
              id="userPassword"
              placeholder="Password"
              error={errors.password}
              ref={register({
                required: true,
                minLength: 6,
              })}
              color="#fff"
              width="100%"
            />
            {errors.password && errors.password.type === 'required' && (
              <FormError>* This field is required</FormError>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <FormError>Password must have a least 6 characters</FormError>
            )}
            <Button
              type="submit"
              color="success"
              saving={loginPending}
              width="80%"
              margin="40px 0 5px 0"
            >
              Login
            </Button>
            <Link onClick={goToRoute('/usersignup')} fontSize="0.8rem">
              Signup
            </Link>
          </FlexContainer>
        </FormContainer>
      </FlexContainer>
    </>
  );
}
