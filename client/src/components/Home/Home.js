import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button, Fab } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { faCheck, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
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

function Home() {
  const classes = useStyles();
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isDbConnected,
  });

  const checkDbConnection = () => {
    setIsConnecting(true);
    fetch('/connect/validate')
      .then((res) => {
        if (!res.ok) {
          throw new Error('connection timeout')
        }
        return res.json();
      })
      .then(() => {
        setIsConnecting(false);
        setIsDbConnected(true);
      })
      .catch((err) => {
        setIsConnecting(false);
        setIsDbConnected(false);
      });
  }


  const connectToDB = () => {
    fetch('/connect')
      .then((res) => {
        if (!res.ok) {
          throw new Error('connection timeout')
        }
        return res.json();
      })
      .then(() => {
        setIsConnecting(false);
        setIsDbConnected(true);
      })
      .catch((err) => {
        setIsConnecting(false);
        setIsDbConnected(false);
      });
  };


  const handleConnect = () => {
    if (!isDbConnected) {
      setIsConnecting(true);
      connectToDB();
    }
  };

  useEffect(() => {
    checkDbConnection();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleConnect}
        >
          {isDbConnected ? <FontAwesomeIcon icon={faCheck} size="lg" /> : <FontAwesomeIcon icon={faDatabase} size="lg" />}
        </Fab>
        {isConnecting && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={isConnecting}
          onClick={handleConnect}
        >
          {isDbConnected ? 'Connected' : 'Connect to Database'}
        </Button>
        {isConnecting && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

export default Home;