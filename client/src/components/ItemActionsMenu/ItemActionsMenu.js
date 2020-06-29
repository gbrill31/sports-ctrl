import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  faTrashAlt,
  faEdit,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer, ButtonIcon, ClearButton } from "../../styledElements";

const MenuContainer = styled.div`
  width: 65px;
  height: 300px;
  right: -15px;
  top: -15px;
  position: absolute;
  overflow: hidden;
`;

const MenuItems = styled.div`
  position: absolute;
  /* padding-top: 10px; */
  background-color: ${(props) => props.theme.secondary.color};
  height: 100%;
  width: 50%;
  top: 0;
  opacity: 0;
  right: -50px;
  border-radius: 0 10px;
  z-index: 99;
  transition: right 0.2s ease-in-out, opacity 0.2s linear;

  ${(props) =>
    props.open &&
    css`
      opacity: 1;
      right: -1px;
    `}
`;

function ItemActionsMenu({ editItem, deleteItem, isItemSelected }) {
  const [isOpenActions, setIsOpenActios] = useState(false);

  const openActions = (e) => {
    e.stopPropagation();
    setIsOpenActios(true);
  };
  const closeActions = (e) => {
    e.stopPropagation();
    setIsOpenActios(false);
  };

  const openEditItem = (e) => {
    setIsOpenActios(false);
    editItem(e);
  };

  const openDeleteItem = (e) => {
    setIsOpenActios(false);
    deleteItem(e);
  };

  useEffect(() => {
    if (!isItemSelected && isOpenActions) {
      setIsOpenActios(false);
    }
  }, [isItemSelected, isOpenActions]);

  return (
    <>
      <FlexContainer column justify="center" align="center" padding="0">
        {!isOpenActions && isItemSelected && (
          <ClearButton
            top="7px"
            right="-10px"
            aria-label="open team actions"
            color="#333"
            show
            onClick={openActions}
          >
            <ButtonIcon>
              <FontAwesomeIcon icon={faBars} size="1x" />
            </ButtonIcon>
          </ClearButton>
        )}
        <MenuContainer>
          <MenuItems open={isOpenActions}>
            <FlexContainer column padding="0" justify="center" align="center">
              <ClearButton
                relative
                aria-label="close team actions"
                color="#999"
                show
                onClick={closeActions}
              >
                <ButtonIcon>
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </ButtonIcon>
              </ClearButton>
              <ClearButton
                relative
                aria-label="edit team"
                color="#fff"
                show
                style={{ transform: "translateX(1px)" }}
                onClick={openEditItem}
              >
                <ButtonIcon>
                  <FontAwesomeIcon icon={faEdit} size="1x" />
                </ButtonIcon>
              </ClearButton>
              <ClearButton
                relative
                aria-label="delete team"
                color="error"
                show
                onClick={openDeleteItem}
              >
                <ButtonIcon>
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </ButtonIcon>
              </ClearButton>
            </FlexContainer>
          </MenuItems>
        </MenuContainer>
      </FlexContainer>
    </>
  );
}

ItemActionsMenu.propTypes = {
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  isItemSelected: PropTypes.bool,
};

export default React.memo(ItemActionsMenu);
