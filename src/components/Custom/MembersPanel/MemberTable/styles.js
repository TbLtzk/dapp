import styled from 'styled-components';
import { ToggleBtn } from '../../PageLists/ListCardBody/styles';

export const MemberAddress = styled.span`
  button span{
    color: ${props => props.color === 'highlight' ? props => props.theme.colors.activeLinks : props => props.theme.colors.td};
  }

  span{
    display: inline-block;
    overflow: hidden;
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
