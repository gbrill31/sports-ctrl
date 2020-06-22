import React from "react";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { Button } from "../../styledElements";

export default function ModalDialog({
  children,
  isOpen,
  title,
  handleConfirm,
  handleCancel,
  confirmText,
  label,
  saving,
  confirmBtnDisabled,
  isEnterKeyDown = true,
  onOpen,
}) {
  const handleKeyDown = (e) => {
    const { keyCode, key } = e;
    if (isEnterKeyDown && (keyCode === 13 || key === "Enter")) {
      handleConfirm();
    }
  };

  return (
    isOpen && (
      <Dialog
        open={isOpen}
        aria-labelledby={label}
        onEscapeKeyDown={handleCancel}
        onKeyPress={handleKeyDown}
        onEnter={onOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="success"
            disabled={confirmBtnDisabled}
            saving={saving}
          >
            {saving ? "Saving... " : confirmText || "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
