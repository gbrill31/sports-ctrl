import React, { useState } from 'react';
import {
  CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField
} from '@material-ui/core';

import './NewGameDialog.scss';

function NewGameDialog({
  isOpen, handleClose, handleConfirm, isSaving
}) {
  const [homeName, setHomeName] = useState('');
  const [awayName, setAwayName] = useState('');
  const [venue, setVenue] = useState('');

  const dialogConfirm = async () => {
    await handleConfirm({ home: homeName, away: awayName, venue });
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="create-new-game"
        maxWidth="md"
        disableBackdropClick
        fullWidth
      >
        <DialogTitle id="create-new-game">Start a new game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your Home & Away team names
          </DialogContentText>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="home"
              label="Home Team"
              type="text"
              placeholder="Home team"
              value={homeName}
              onChange={(e) => {
                setHomeName(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="away"
              label="Away Team"
              type="text"
              placeholder="Away team"
              value={awayName}
              onChange={(e) => {
                setAwayName(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="venue"
              label="Venue"
              type="text"
              placeholder="Venue"
              value={venue}
              onChange={(e) => {
                setVenue(e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <div className="create-btn">
            <Button
              variant="contained"
              disabled={isSaving}
              onClick={dialogConfirm}
              color="primary"
            >
              Start Game
            </Button>
            {isSaving && <CircularProgress size={24} className="saving-loader" />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewGameDialog;