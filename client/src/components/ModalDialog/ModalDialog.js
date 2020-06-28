import React from "react";
import PropTypes from "prop-types";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { Button } from "../../styledElements";

function ModalDialog({
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

ModalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  label: PropTypes.string,
  saving: PropTypes.bool,
  confirmBtnDisabled: PropTypes.bool,
  isEnterKeyDown: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default React.memo(ModalDialog);
