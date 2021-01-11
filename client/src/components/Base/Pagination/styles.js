import styled from 'styled-components';

export const WrapPagination = styled.div`
  .page-link{
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.black};
      cursor: pointer;
      box-shadow: none;
  }
  .active .page-link{
      background-color: ${props => props.theme.colors.main};
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.main};
  }
  .disabled .page-link{
      background-color: ${props => props.theme.colors.lightGrey};
      color: ${props => props.theme.colors.white};
      cursor: default;
  }

`;
