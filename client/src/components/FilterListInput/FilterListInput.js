import React from 'react';

import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFormInput from '../../hooks/useFormInput';

import {
  FlexContainer, Input, ClearButton, ButtonIcon
} from '../../styledElements';

export default function FilterListInput({ onChange, placeholder }) {

  const filterInput = useFormInput('');

  const clearInput = () => {
    filterInput.setValue('');
    onChange('');
  }

  const handleInputChange = (e) => {
    filterInput.onChange(e);
    onChange(e.target.value);
  }

  return (
    <FlexContainer justify="center" align="center" fullWidth>
      <FontAwesomeIcon icon={faFilter} size="sm" color="#666" />
      <FlexContainer padding="0" width="90%">
        <Input
          type="text"
          placeholder={placeholder}
          value={filterInput.value}
          onChange={handleInputChange}
          color="#fff"
          width="100%"
        />
        <ClearButton
          color="#fff"
          show={filterInput.value.length > 0}
          onClick={clearInput}
        >
          <ButtonIcon>
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </ButtonIcon>
        </ClearButton>
      </FlexContainer>
    </FlexContainer>
  )
}
