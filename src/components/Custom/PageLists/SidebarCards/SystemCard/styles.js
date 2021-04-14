import styled from 'styled-components';

export const BlockWrap = styled.div`
  margin-top: 20px;
`;

export const Title = styled.h5`
  ${(props) => props.theme.fontStyles.title.subtitle};
  margin-bottom: 10px;
`;
