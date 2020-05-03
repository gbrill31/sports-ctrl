import React from 'react';
import {
  DialogActions, DialogContentText, DialogTitle, DialogContent, Dialog,
  CircularProgress
} from '@material-ui/core';
import { Button } from "../../styledElements";


import './PromptDialog.scss';

const PromptDialog = ({
  isOpen, handleClose, handleConfirm, title, content, confirmText, isPending
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
        <Button onClick={handleClose} color="error">
          Cancel
      </Button>
        <Button onClick={handleConfirm} color="success">
          {confirmText || 'OK'}
        </Button>
        {isPending && <CircularProgress size={24} />}
      </DialogActions>
    </Dialog>
  );

export default PromptDialog;
