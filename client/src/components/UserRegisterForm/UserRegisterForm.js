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
  Notification,
} from '../../styledElements';

import { userSignup } from '../../redux';
import useRegisterSubUser from '../../hooks/reactQuery/useRegisterSubUser';
import useUpdateSubUser from '../../hooks/reactQuery/useUpdateSubUser';

export default function UserRegisterForm({
  isSignupLink = false,
  isTitle = false,
  user,
  userType = 'admin',
  cb,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user: loggedInUser, signupPending } = useSelector(
    (state) => state.auth
  );

  const { register, handleSubmit, errors, setError, clearErrors } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  const { registerSubUser, status: registerStatus } = useRegisterSubUser(cb);
  const { updateSubUser, status: updateStatus } = useUpdateSubUser(cb);

  const isRequestPending = () =>
    signupPending || registerStatus === 'pending' || updateStatus === 'pending';

  const registerUser = useCallback((data) => dispatch(userSignup(data)), [
    dispatch,
  ]);

  const onSubmit = async (data) => {
    const userData = {
      ...data,
      type: userType,
      oldEmail: user?.email,
      admin: loggedInUser ? loggedInUser.id : null,
    };
    if (userType === 'admin') {
      registerUser(userData);
    } else {
      if (!user) {
        registerSubUser(userData);
      } else {
        updateSubUser(userData);
      }
    }
  };

  const goToRoute = (route) => () => history.push(route);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

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
            {!user || user.firstLogin ? (
              <>
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
                  onChange={handleEmailChange}
                />
                {errors.email && errors.email.type === 'required' && (
                  <FormError>* This field is required</FormError>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <FormError>{errors.email.message}</FormError>
                )}
              </>
            ) : null}
            {!userType || (userType && userType === 'admin') ? (
              <>
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
              </>
            ) : null}
            <Button
              type="submit"
              color="success"
              saving={isRequestPending()}
              width="150px"
              margin="40px 0 5px 0"
            >
              {user ? 'Save' : 'Register'}
            </Button>
            {isSignupLink ? (
              <Link onClick={goToRoute('/userlogin')} fontSize="0.8rem">
                Sign In
              </Link>
            ) : (
              <>
                {!user || (user && user.email !== email) ? (
                  <Notification
                    type="success"
                    message="A first login password will be generated and emailed to the user"
                  />
                ) : null}
              </>
            )}
          </FlexContainer>
        </form>
      </FlexContainer>
    </>
  );
}
