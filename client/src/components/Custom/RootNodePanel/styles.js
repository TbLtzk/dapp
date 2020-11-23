import styled from 'styled-components'

import {Container} from "react-bootstrap";

import {colors, indents, h5Text} from "constants/style";

export const RootNodePanelWrap = styled.div`
  .table{
    //width: 26%;
  }
  .table th:nth-child(1),
  .table th:nth-child(3){
    display: flex;
  }
  .table td:nth-child(2){
    color: ${colors.darkBlue};
    width: 29%;
  }
`;

export const H5Headline = styled(h5Text)`
`;

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color ? props.color : "#282c34"};
  border-radius: 50%;
  margin-right: 7px;
`;
export const ContainerWrap = styled.div`
  width: 50%;
`;
