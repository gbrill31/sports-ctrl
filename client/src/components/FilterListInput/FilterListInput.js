import React from "react";
import PropTypes from "prop-types";
import { faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormInput from "../../hooks/useFormInput";

import {
  FlexContainer,
  Input,
  ClearButton,
  ButtonIcon,
} from "../../styledElements";

const FilterListInput = ({ onChange, placeholder }) => {
  const filterInput = useFormInput("");

  const clearInput = () => {
    filterInput.setValue("");
    onChange("");
  };

  const handleInputChange = (e) => {
    filterInput.onChange(e);
    onChange(e.target.value);
  };

  return (
    <FlexContainer justify="center" align="center" fullWidth padding="0">
      <FontAwesomeIcon icon={faFilter} size="sm" color="#666" />
      <FlexContainer padding="0" width="90%">
        <Input
          type="text"
          placeholder={placeholder || "Type here to filter the list"}
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
  );
};

FilterListInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default React.memo(FilterListInput);
