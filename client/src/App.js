import React, { useEffect, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { HttpInterceptors } from "./utils";
import Home from "./views/Home/Home";
import Venues from "./views/VenuesManagement/VenuesManagement";
import Teams from "./views/TeamsManagement/TeamsManagement";
import GameManagement from "./views/GameManagement/GameManagement";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import CreateGameForm from "./components/CreateGameForm/CreateGameForm";

import "react-toastify/dist/ReactToastify.min.css";

import { setRouteName } from "./actions";

const theme = {
  primary: {
    color: "#272932",
    hover: "#575C70",
  },
  secondary: {
    color: "#173753",
    hover: "#1F4A70",
  },
  error: {
    color: "#DF2935",
    hover: "#F92533",
  },
  success: {
    color: "#0B9647",
    hover: "#0DC45C",
  },
  generic: {
    color: "#ED9B40",
    hover: "#FFB056",
  },
  menu: {
    color: "#7c7d7d",
    hover: "#E6EAEB",
  },
  scrollBar: {
    bg: "#575C70",
    thumb: "#E6EAEB",
  },
  disabled: {
    bgColor: "#555",
    color: "#888",
  },
  font: "Roboto, sans-serif",
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
	/* border-radius: 10px; */
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
  background-color: #272932;
  position: relative;
  width: 100vw;
  overflow: hidden;
`;

const AppMainContent = styled.main`
  padding-top: 100px;
  height: calc(100vh - 100px);
`;

toast.configure({
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 7000,
  pauseOnFocusLoss: false,
});

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const setCurrentRoute = useCallback(
    (route) => dispatch(setRouteName(route)),
    [dispatch]
  );

  useEffect(() => {
    HttpInterceptors.initInterceptors(history);
    setCurrentRoute(history.location.pathname);
    const unlisten = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });

    return () => {
      HttpInterceptors.clearInterceptors();
      unlisten();
    };
  }, [history, setCurrentRoute]);

  return (
    <ThemeProvider theme={theme}>
      <AppGlobalStyle />
      <AppContainer>
        <HeaderNav />
        <AppMainContent>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/venues" render={() => <Venues />} />
            <Route exact path="/teams" render={() => <Teams />} />
            <Route exact path="/creategame" render={() => <CreateGameForm />} />
            <Route exact path="/game" render={() => <GameManagement />} />
          </Switch>
        </AppMainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
