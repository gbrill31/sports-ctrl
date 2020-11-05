import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  FlexContainer,
  MainTitle,
  Input,
  Button,
  Link,
  FormError,
} from '../../styledElements';

import { userSignup } from '../../actions';
import useSaveUser from '../../hooks/useSaveUser';

export default function UserRegisterForm({
  isSignupLink = false,
  isTitle = false,
  userType,
  cb,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, signupPending } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    // reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [password, setPassword] = useState('');

  const { saveUser, status } = useSaveUser(cb);

  const registerUser = useCallback((data) => dispatch(userSignup(data)), [
    dispatch,
  ]);

  const onSubmit = async (data) => {
    const userData = { ...data, type: userType, admin: user ? user.id : null };
    if (userType === 'admin') {
      registerUser(userData);
    } else {
      saveUser(userData);
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
    <>
      <FlexContainer
        justify="center"
        align="center"
        fullHeight
        padding="0"
        column
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FlexContainer column noWrap justify="center" align="center">
            {isTitle ? (
              <MainTitle uppercase align="center">
                Register
              </MainTitle>
            ) : null}
            <Input
              autoFocus
              name="name"
              id="name"
              type="text"
              placeholder="Full name"
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
            {errors.verifyPassword &&
              errors.verifyPassword.type === 'verify' && (
                <FormError>{errors.verifyPassword.message}</FormError>
              )}
            <Button
              type="submit"
              color="success"
              saving={signupPending || status === 'pending'}
              width="80%"
              margin="40px 0 5px 0"
            >
              Register
            </Button>
            {isSignupLink ? (
              <Link onClick={goToRoute('/userlogin')} fontSize="0.8rem">
                Sign In
              </Link>
            ) : null}
          </FlexContainer>
        </form>
      </FlexContainer>
    </>
  );
}
