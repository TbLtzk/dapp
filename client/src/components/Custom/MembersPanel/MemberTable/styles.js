import styled from 'styled-components';

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
`;

export const MemberAddress = styled.span`
  color: ${props => props.color === 'highlight' ? props => props.theme.colors.green : props => props.theme.colors.darkGrey};
`;


