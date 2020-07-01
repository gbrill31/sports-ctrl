import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  faTrashAlt,
  faEdit,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer, Icon, IconButton } from "../../styledElements";

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
  background-color: ${(props) => props.theme.secondary.color};
  height: 100%;
  width: 50%;
  top: 0;
  opacity: ${(props) => (props.active ? "1" : "1")};
  right: ${(props) => (props.active ? "-1px" : "-70px")};
  border-radius: 0 10px;
  z-index: 99;
  transition: right 0.2s ease-in-out, opacity 0.2s linear;
`;

function ItemActionsMenu({ editItem, deleteItem, isShow, overrideClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const openActions = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const closeActions = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const openEditItem = (e) => {
    closeActions(e);
    editItem(e);
  };

  const openDeleteItem = (e) => {
    // closeActions(e);
    deleteItem(e);
  };

  useEffect(() => {
    if (!isShow && isOpen) {
      setIsOpen(false);
    }
    if (overrideClick) {
      setIsOpen(isShow);
    }
  }, [isShow, isOpen, overrideClick]);

  return (
    <>
      <FlexContainer column justify="center" align="center" padding="0">
        {!isOpen && isShow && !overrideClick && (
          <IconButton
            top="7px"
            right="-10px"
            aria-label="open team actions"
            color="#333"
            show
            animate
            onClick={openActions}
          >
            <Icon>
              <FontAwesomeIcon icon={faBars} size="1x" />
            </Icon>
          </IconButton>
        )}
        <MenuContainer>
          <MenuItems active={isOpen}>
            <FlexContainer column padding="0" justify="center" align="center">
              <IconButton
                style={{ display: !overrideClick ? "" : "none" }}
                relative
                aria-label="close team actions"
                color="#999"
                show
                onClick={closeActions}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </Icon>
              </IconButton>
              <IconButton
                relative
                aria-label="edit team"
                color="#fff"
                show
                style={{ transform: "translateX(1px)" }}
                onClick={openEditItem}
              >
                <Icon>
                  <FontAwesomeIcon icon={faEdit} size="1x" />
                </Icon>
              </IconButton>
              <IconButton
                relative
                aria-label="delete team"
                color="error"
                show
                onClick={openDeleteItem}
              >
                <Icon>
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </Icon>
              </IconButton>
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
  isShow: PropTypes.bool,
  overrideClick: PropTypes.bool,
};

export default React.memo(ItemActionsMenu);
