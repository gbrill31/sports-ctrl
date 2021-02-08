import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { HttpInterceptors } from './utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './views/Home/Home';

import HeaderNav from './components/HeaderNav/HeaderNav';
import RegisterUser from './views/RegisterUser/RegisterUser';
import UserLogin from './views/UserLogin/UserLogin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './ext_css/all.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { setRouteName, verifyLogin } from './actions';
import UpdatePassword from './views/UpdatePassword/UpdatePassword';

import bgPattern from './img/bgPattern.jpg';

const queryClient = new QueryClient();

const theme = {
  primary: {
    color: '#272932',
    hover: '#575C70',
  },
  secondary: {
    color: '#173753',
    hover: '#1F4A70',
  },
  error: {
    color: '#DF2935',
    hover: '#F92533',
  },
  success: {
    color: '#0B9647',
    hover: '#0DC45C',
  },
  generic: {
    color: '#ED9B40',
    hover: '#FFB056',
  },
  menu: {
    color: '#7c7d7d',
    hover: '#E6EAEB',
  },
  scrollBar: {
    bg: '#575C70',
    thumb: '#E6EAEB',
  },
  disabled: {
    bgColor: '#555',
    color: '#888',
  },
  basic: {
    color: '#E6EAEB',
    odd: '#c9caca',
  },
  bgColor: '#272932',
  font: 'Roboto, sans-serif',
};

const AppGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus{
    outline: none;
  }

  &::-webkit-scrollbar-track
{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: ${(props) => props.theme.scrollBar.bg};
}

&::-webkit-scrollbar
{
	width: 8px;
	background-color: ${(props) => props.theme.scrollBar.bg};
}

&::-webkit-scrollbar-thumb
{
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: ${(props) => props.theme.scrollBar.thumb};
}

.Toastify__toast--info {
  background-color: ${(props) => props.theme.generic.color};
}
.Toastify__toast--success {
  background-color: ${(props) => props.theme.success.color};
}
.Toastify__toast--warning {
  background-color: ${(props) => props.theme.secondary.color};
}
.Toastify__toast--error {
  background-color: ${(props) => props.theme.error.color};
}
`;

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  background-image: radial-gradient(
      circle,
      ${(props) => props.theme.primary.color} 50%,
      ${(props) => props.theme.generic.color} 100%
    ),
    url(${bgPattern});
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-size: cover;
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
`;

const AppMainContent = styled.main`
  padding-top: 70px;
  height: calc(100vh - 70px);
`;

toast.configure({
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 7000,
  pauseOnFocusLoss: false,
});

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isSetInterceptors, setIsSetInterceptors] = useState(false);
  const { user, isLoggedIn, isLoggedInCheck } = useSelector(
    (state) => state.auth
  );

  const setCurrentRoute = useCallback(
    (route) => dispatch(setRouteName(route)),
    [dispatch]
  );

  const verifyUserLogin = useCallback(() => dispatch(verifyLogin()), [
    dispatch,
  ]);

  useEffect(() => {
    HttpInterceptors.initInterceptors(history);
    setCurrentRoute(history.location.pathname);
    verifyUserLogin();
    const unListen = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });
    setIsSetInterceptors(true);

    return () => {
      HttpInterceptors.clearInterceptors();
      unListen();
    };
    // eslint-disable-next-line
  }, []);

  const isPrivateRoute = useCallback(
    () =>
      history.location.pathname !== '/userlogin' &&
      history.location.pathname !== '/usersignup',
    [history]
  );

  useEffect(() => {
    if (isLoggedIn) {
      const route = isPrivateRoute() ? history.location.pathname : '/';
      history.push(route);
    }
  }, [isLoggedIn, history, isPrivateRoute]);

  return (
    <ThemeProvider theme={theme}>
      <AppGlobalStyle />
      {isSetInterceptors && isLoggedInCheck && (
        <QueryClientProvider client={queryClient}>
          <AppContainer>
            <HeaderNav />
            <AppMainContent>
              <Switch>
                <Route
                  exact
                  path="/usersignup"
                  render={() => <RegisterUser />}
                />
                <Route exact path="/userlogin" render={() => <UserLogin />} />

                <PrivateRoute
                  path="/"
                  component={user && user.firstLogin ? UpdatePassword : Home}
                />
              </Switch>
            </AppMainContent>
          </AppContainer>
        </QueryClientProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
