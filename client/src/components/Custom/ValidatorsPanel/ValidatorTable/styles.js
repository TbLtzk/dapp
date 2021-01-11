import styled from 'styled-components';

import { indents } from 'constants/style';

export const RootNodePanelWrap = styled.div`
  .table{
    //width: 26%;
  }
  .table th:nth-child(1),
  .table th:nth-child(3){
    display: flex;
  }
  .table td:nth-child(1){
    color: ${props => props.theme.colors.black};
  }
  .table td:nth-child(2){
    color: ${props => props.theme.colors.darkBlue};
    width: 29%;
  }
  .table td:nth-child(3){
    color: ${props => props.theme.colors.darkBlue};
  }
  .pagination{
    justify-content: flex-end;
  }
`;

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color ? props.color : '#282c34'};
  border-radius: 50%;
  margin-right: 7px;
`;

export const MemberAddress = styled.span`
  color: ${props => props.color === 'highlight' ? props => props.theme.colors.green : props => props.theme.colors.darkGrey};
`;


