import React from 'react';
import PropTypes from 'prop-types';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFormInput from '../../hooks/useFormInput';

import { FlexContainer, Input, IconButton, Icon } from '../../styledElements';

const FilterListInput = ({ onChange, placeholder, width }) => {
  const filterInput = useFormInput('');

  const clearInput = () => {
    filterInput.setValue('');
    onChange('');
  };

  const handleInputChange = (e) => {
    filterInput.onChange(e);
    onChange(e.target.value);
  };

  return (
    <FlexContainer
      justify="center"
      align="center"
      fullWidth={!width}
      width={width}
      padding="0"
    >
      <FontAwesomeIcon icon={faFilter} size="sm" color="#666" />
      <FlexContainer padding="0" width="90%">
        <Input
          type="text"
          placeholder={placeholder || 'Filter List'}
          value={filterInput.value}
          onChange={handleInputChange}
          color="#fff"
          width="100%"
        />
        <IconButton
          color="#fff"
          show={filterInput.value.length > 0}
          onClick={clearInput}
        >
          <Icon>
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </Icon>
        </IconButton>
      </FlexContainer>
    </FlexContainer>
  );
};

FilterListInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.string,
};

export default React.memo(FilterListInput);
