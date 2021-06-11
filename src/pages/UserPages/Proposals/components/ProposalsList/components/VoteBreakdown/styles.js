import styled from 'styled-components';

export const ColorTitle = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: ${props => props.color ? props.color : props.theme.colors.white};
`;

