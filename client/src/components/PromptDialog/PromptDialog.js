import React from "react";
import PropTypes from "prop-types";
import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { Button } from "../../styledElements";

function PromptDialog({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText,
  isPending,
  pendingTitle,
}) {
  const handleEnterConfirm = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    isOpen && (
      <Dialog
        open={isOpen}
        aria-labelledby={title}
        onEscapeKeyDown={handleClose}
        onKeyPress={handleEnterConfirm}
        maxWidth="sm"
      >
        <DialogTitle id={title}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="success" saving={isPending}>
            {isPending ? pendingTitle || "Pending..." : confirmText || "OK"}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

PromptDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  isPending: PropTypes.bool,
  pendingTitle: PropTypes.string,
};

export default React.memo(PromptDialog);
