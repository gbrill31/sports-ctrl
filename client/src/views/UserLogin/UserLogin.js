import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Input, FlexContainer } from '../../styledElements';
import styled from 'styled-components';

import { userLogin } from '../../actions';

const FormContainer = styled.form`
  label {
    color: #fff;
    /* width: 150px; */
  }
`;

const FormError = styled.div`
  color: ${(props) => props.theme.error.color};
  font-size: 0.8rem;
  padding-top: 5px;
  margin: 0;
`;

export default function UserLogin() {
  const {
    register,
    handleSubmit,
    errors,
    // reset,
  } = useForm({
    mode: 'all',
  });
  const dispatch = useDispatch();
  const { loginPending } = useSelector((state) => state.auth);

  const loginUser = useCallback((data) => dispatch(userLogin(data)), [
    dispatch,
  ]);

  const onSubmit = async (data) => {
    loginUser(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FlexContainer column justify="center" align="center">
        <FlexContainer justify="center" align="center" width="30%">
          <FlexContainer fullWidth column justify="center" align="center">
            <label htmlFor="userEmail">Email</label>
            <div>
              <Input
                // autocomplete="username"
                name="email"
                type="email"
                id="userEmail"
                placeholder="Enter Email"
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
            </div>
          </FlexContainer>
          <FlexContainer fullWidth column justify="center" align="center">
            <label htmlFor="userPassword">Password</label>
            <div>
              <Input
                autocomplete="current-password"
                name="password"
                type="password"
                id="userPassword"
                placeholder="Enter Password"
                error={errors.password}
                ref={register({
                  required: true,
                  minLength: 6,
                })}
                color="#fff"
              />
              {errors.password && errors.password.type === 'required' && (
                <FormError>* This field is required</FormError>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <FormError>Password must have a least 6 characters</FormError>
              )}
            </div>
          </FlexContainer>
          <FlexContainer fullWidth justify="center">
            <Button
              type="submit"
              color="success"
              saving={loginPending}
              width="50%"
            >
              Login
            </Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FormContainer>
  );
}
