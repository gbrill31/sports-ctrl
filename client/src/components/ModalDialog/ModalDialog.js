import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@material-ui/core';
import { Button } from '../../styledElements';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiPaper-rounded {
    background-color: ${(props) => props.theme.primary.color};
  }
`;

function ModalDialog({
  component: Component,
  componentProps,
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
    if (
      handleConfirm &&
      isEnterKeyDown &&
      (keyCode === 13 || key === 'Enter')
    ) {
      handleConfirm();
    }
  };

  return (
    isOpen && (
      <StyledDialog
        open={isOpen}
        aria-labelledby={label}
        onEscapeKeyDown={handleCancel}
        onKeyPress={handleKeyDown}
        onEnter={onOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle style={{ color: '#fff' }}>{title}</DialogTitle>
        <DialogContent>
          <Component {...componentProps} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          {handleConfirm ? (
            <Button
              onClick={handleConfirm}
              color="success"
              disabled={confirmBtnDisabled}
              saving={saving}
            >
              {saving ? 'Saving... ' : confirmText || 'Save'}
            </Button>
          ) : null}
        </DialogActions>
      </StyledDialog>
    )
  );
}

ModalDialog.propTypes = {
  component: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  label: PropTypes.string,
  saving: PropTypes.bool,
  confirmBtnDisabled: PropTypes.bool,
  isEnterKeyDown: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default React.memo(ModalDialog);
