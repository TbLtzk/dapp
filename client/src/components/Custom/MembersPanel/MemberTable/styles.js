import styled from 'styled-components';
import { ToggleBtn } from '../../PageLists/ListCardBody/styles';

export const MemberPanelWrap = styled.div`
  .table th{
    vertical-align: baseline;
  }
  .table td:nth-child(1){
    color: ${props => props.theme.colors.black};
  }
  .table td:nth-child(2){
    color: ${props => props.theme.colors.darkBlue};
    width: ${(props) => (props.type === 'validators' ? 'auto' : '29%')};
  }
  .table td:nth-child(3){
    color: ${props => props.type === 'validators' ? props.theme.colors.darkBlue : props.theme.colors.darkGrey};
    width: ${(props) => (props.type === 'validators' ? '15%' : 'auto')};
  }
  .pagination{
    justify-content: center;
  }
`;

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color ? props.color : '#282c34'};
  border-radius: 50%;
  margin-right: 7px;
  vertical-align: text-top;
`;

export const MemberAddress = styled.span`
  button span{
    color: ${props => props.color === 'highlight' ? props => props.theme.colors.green : props => props.theme.colors.darkGrey};
  }
  // overflow-wrap: break-word;
  //word-wrap: break-word;
  //word-break: break-all;
  //word-break: break-word;
  //hyphens: auto;
  span{
    display: inline-block;
    overflow: hidden;
  }
  .root-member{
    max-width: 140px;
  }
  .validator-member{
    max-width: 320px;
  }
  .members{
    max-width: 100%;
  }
`;

export const Sharing = styled(ToggleBtn)`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
`;
