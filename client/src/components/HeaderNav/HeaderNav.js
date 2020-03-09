import React, { useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { faCheck, faDatabase, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './HeaderNav.scss';

import {
  connectToDB
} from '../../actions';


const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function HeaderNav() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isConnecting = useSelector(state => state.db.isPending);
  const isDBConnected = useSelector(state => state.db.isConnected);
  const currentRoute = useSelector(state => state.routes.currentRoute);

  const connectDB = useCallback(() => dispatch(connectToDB()), [dispatch]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isDBConnected,
  });

  return (
    <header className="root">
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={isConnecting}
          onClick={connectDB}
        >
          {isDBConnected ? 'DB Connected' : 'Connect to Database'}
          {<div className="button-icon-spacing">{
            isDBConnected ? <FontAwesomeIcon icon={faCheck} size="lg" /> : <FontAwesomeIcon icon={faDatabase} size="lg" />
          }
          </div>
          }
        </Button>
        {isConnecting && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {
        isDBConnected && currentRoute === '/' ? (
          <Fragment>
            <Button
              variant="contained"
              color="primary"
              className="btnSpacing"
              component={Link}
              to="/teams"
            >
              Manage Teams
          </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/venues"
            >
              Manage Venues
          </Button>
            <Button
              variant="contained"
              color="primary"
              className="right"
              component={Link}
              to="/newgame"
            >
              Start A New Game
            <div className="button-icon-spacing">
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </div>
            </Button>
          </Fragment>
        ) : (
            <Button
              variant="contained"
              color="secondary"
              className="right"
              component={Link}
              to="/"
            >
              Home
            </Button>
          )
      }
    </header>
  );
}

export default HeaderNav;