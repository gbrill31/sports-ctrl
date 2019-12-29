import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { faCheck, faDatabase, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './HeaderNav.scss';


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

function HeaderNav({
  isDbConnected, isConnecting, handleConnect
}) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isDbConnected,
  });

  return (
    <header className="root">
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={isConnecting}
          onClick={handleConnect}
        >
          {isDbConnected ? 'DB Connected' : 'Connect to Database'}
          {<div className="button-icon-spacing">{
            isDbConnected ? <FontAwesomeIcon icon={faCheck} size="lg" /> : <FontAwesomeIcon icon={faDatabase} size="lg" />
          }
          </div>
          }
        </Button>
        {isConnecting && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      {
        isDbConnected ? (
          <Button
            variant="contained"
            color="primary"
            className="align-right"
            component={Link}
            to="/game"
          >
            Start A New Game
            <div className="button-icon-spacing">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </div>
          </Button>
        ) : null
      }
    </header>
  );
}

export default HeaderNav;