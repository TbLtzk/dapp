import styled from 'styled-components';
import { ToggleBtn } from '../../PageLists/ListCardBody/styles';

export const MemberPanelWrap = styled.div`
  .table th{
    vertical-align: baseline;
  }
  .table td{
    color: ${props => props.theme.colors.td};
  }
  .table td:nth-child(2){
    width: ${(props) => (props.type === 'validators' || props.type === 'delegated-validators' ? 'auto' : '29%')};
  }
  .table td:nth-child(3){
    color: ${props => props.type === 'validators' ? props.theme.colors.td : props.theme.colors.neonGreen};
    width: ${(props) => (props.type === 'validators' ? '15%' : 'auto')};
  }
  .table .validators-widened td{
    padding: 0 6px 15px;
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
    color: ${props => props.color === 'highlight' ? props => props.theme.colors.activeLinks : props => props.theme.colors.td};
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
  .validators-widened{
    max-width: 247px;
  }
  .delegated-validators{
    max-width: 176px;
  }
`;

export const Sharing = styled(ToggleBtn)`
  font-size: 14px;
  color: ${props => props.theme.colors.white};
`;
