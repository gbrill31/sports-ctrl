import React, { useState, useEffect } from 'react';

import HeaderNav from '../HeaderNav/HeaderNav';
import './Home.scss';



function Home() {
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

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
    <div>
      <HeaderNav
        isDbConnected={isDbConnected}
        isConnecting={isConnecting}
        handleConnect={handleConnect}
      />
      {

      }
    </div>
  );
};

export default Home;