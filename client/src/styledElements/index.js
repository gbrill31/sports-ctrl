import styled from 'styled-components';

import FlexContainer from './FlexContainer';
import GridContainer from './GridContainer';
import ScrollableContainer from './ScrollableContainer';
import MainTitle from './MainTitle';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
import Input from './Input';

const SpaceSides = element => styled(element)`
  margin: 0px 10px;
`;


export {
  MainTitle,
  FlexContainer,
  GridContainer,
  ScrollableContainer,
  Button,
  ButtonIcon,
  Input,
  SpaceSides
}