import React from 'react';
import {
  Button, DialogActions, DialogContentText, DialogTitle, DialogContent, Dialog
} from '@material-ui/core';


import './PromptDialog.scss';

const PromptDialog = ({
  isOpen, handleClose, handleConfirm, title, content, confirmText
}) => (
    <Dialog
      open={isOpen}
      aria-labelledby="form-dialog-title"
      className="new-project-dialog"
      onEscapeKeyDown={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
      </Button>
        <Button onClick={handleConfirm} color="secondary">
          {confirmText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );

export default PromptDialog;
