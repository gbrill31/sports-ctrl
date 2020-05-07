import React, { useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { faCheck, faDatabase, faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { Button, ButtonIcon } from '../../styledElements';

import './HeaderNav.scss';

import {
  connectToDB
} from '../../actions';


const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

function HeaderNav() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isConnecting = useSelector(state => state.db.isPending);
  const isDBConnected = useSelector(state => state.db.isConnected);
  const currentRoute = useSelector(state => state.routes.currentRoute);

  const connectDB = useCallback(() => dispatch(connectToDB()), [dispatch]);

  const goToRoute = (route) => () => history.push(route);

  return (
    <header className="root">
      <div className={classes.wrapper}>
        <Button
          color={isDBConnected ? 'success' : 'primary'}
          disabled={isConnecting}
          onClick={connectDB}
        >
          {isDBConnected ? 'DB Connected' : 'Connect to Database'}
          {
            <ButtonIcon spaceLeft>
              {
                isDBConnected ? <FontAwesomeIcon icon={faCheck} size="sm" /> : <FontAwesomeIcon icon={faDatabase} size="sm" />
              }
            </ButtonIcon>
          }
        </Button>
        {isConnecting && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {
        isDBConnected && (currentRoute === '/' ? (
          <Fragment>
            <Button
              color="primary"
              onClick={goToRoute('/teams')}
            >
              Manage Teams
          </Button>
            <Button
              color="primary"
              onClick={goToRoute('/venues')}
            >
              Manage Venues
          </Button>
            <Button
              justifyRight
              color="primary"
              onClick={goToRoute('/game')}
            >
              Start A New Game
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
          </Fragment>
        ) : (
            <Button
              color="secondary"
              onClick={goToRoute('/')}
            >
              <ButtonIcon spaceRight>
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
              </ButtonIcon>
              Home
            </Button>
          )
        )
      }
    </header>
  );
}

export default HeaderNav;