import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlexContainer, Input, Icon, IconButton } from '../../styledElements';
import styled, { css } from 'styled-components';
import shortid from 'shortid';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFormInput from '../../hooks/useFormInput';
import useOutsideMouseDown from '../../hooks/useOutsideMouseDown';

const OptionsContainer = styled.div`
  position: absolute;
  top: -15px;
  visibility: hidden;
  flex-flow: column;
  width: inherit;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;

  ${(props) =>
    props.show &&
    css`
      visibility: visible;
      opacity: 1;
    `};
`;

const OptionItem = styled.div`
  background: #fff;
  width: 100%;
  padding: 10px 0 10px 10px;
  color: ${(props) => props.theme.primary.color};
  cursor: pointer;
  user-select: none;

  &:nth-child(2n) {
    background: #e2e2e2;
  }

  &:hover {
    background: ${(props) => props.theme.primary.hover};
    color: #fff;
  }
`;

function AutoCompleteInput({
  id,
  color,
  spaceLeft,
  placeholder,
  options,
  getOptionLabel,
  onSelection,
  selectedValue,
  loading = false,
}) {
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selection = useFormInput(selectedValue || '');
  const ref = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    if (selectedValue !== '') {
      selection.setValue(selectedValue);
    }
  }, [selection, selectedValue]);

  useOutsideMouseDown(elementRef, isFocused, () => {
    setIsFocused(false);
    setIsOptionsExpanded(false);
  });

  const handleFocus = () => {
    if (ref && ref.current) {
      ref.current.focus();
    }
    setIsFocused(true);
    setIsOptionsExpanded(true);
  };

  const handleSelection = (option) => () => {
    onSelection(option.id);
    setIsOptionsExpanded(false);
  };

  const handleInputChange = (e) => {
    selection.onChange(e);
    if (selection.value !== '' && !isOptionsExpanded) {
      setIsOptionsExpanded(true);
    }
  };

  const clearSelectionInput = () => {
    handleFocus();
    onSelection('');
    selection.setValue('');
  };

  const getFilteredOptions = () => {
    const items = [];
    options.forEach((option) => items.push(getOptionLabel(option)));
    const value = selection.value.toLowerCase();
    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(value)
    );
  };

  return (
    <FlexContainer column ref={elementRef}>
      <FlexContainer padding="0">
        <Input
          ref={ref}
          id={id}
          name={shortid.generate()}
          color={color}
          spaceLeft={spaceLeft}
          placeholder={placeholder}
          type="text"
          value={selection.value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          isLoading={loading}
          disabled={loading}
        />
        {
          <IconButton
            color={color}
            show={selection.value.length > 0}
            onClick={clearSelectionInput}
          >
            <Icon>
              <FontAwesomeIcon icon={faTimes} size="sm" />
            </Icon>
          </IconButton>
        }
      </FlexContainer>

      <FlexContainer width={`${ref?.current?.clientWidth - 10}px`} padding="0">
        <OptionsContainer show={isOptionsExpanded}>
          {options &&
            getFilteredOptions().map((option) => (
              <OptionItem
                key={option.id || getOptionLabel(option)}
                onClick={handleSelection(option)}
              >
                {getOptionLabel(option)}
              </OptionItem>
            ))}
        </OptionsContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

AutoCompleteInput.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  spaceLeft: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  getOptionLabel: PropTypes.func,
  onSelection: PropTypes.func,
  selectedValue: PropTypes.string,
  loading: PropTypes.bool,
};

export default React.memo(AutoCompleteInput);
