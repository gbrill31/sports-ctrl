import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@material-ui/core';
import { Button, FlexContainer, Input } from '../../styledElements';

function PromptDialog({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  content,
  confirmText,
  isPending,
  pendingTitle,
  checkboxText,
  checkBoxInitState = false,
  isCheckbox,
}) {
  const [isChecked, setIsChecked] = useState(checkBoxInitState);

  const handleClickConfirm = () => handleConfirm(isChecked);

  const handleEnterConfirm = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      handleClickConfirm();
    }
  };

  const handleCheckboxChange = () => setIsChecked(!isChecked);

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
          {isCheckbox ? (
            <FlexContainer align="center" justify="flex-start">
              <Input
                type="checkbox"
                id="confirmCheckbox"
                name="confirmCheckbox"
                noMargin
                onChange={handleCheckboxChange}
                value={isChecked}
                checked={isChecked}
              />
              <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                {checkboxText}
              </div>
            </FlexContainer>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleClickConfirm}
            color="success"
            saving={isPending}
          >
            {isPending ? pendingTitle || 'Pending...' : confirmText || 'OK'}
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
  isCheckbox: PropTypes.bool,
  checkboxText: PropTypes.string,
  confirmText: PropTypes.string,
  isPending: PropTypes.bool,
  pendingTitle: PropTypes.string,
};

export default React.memo(PromptDialog);
