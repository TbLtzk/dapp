import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.block};
  border-radius: 16px;
  display: block;
`;
