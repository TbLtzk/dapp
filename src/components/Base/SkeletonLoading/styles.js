import styled from 'styled-components';

export const SkeletonLoadingWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.block};
  border-radius: 16px;
  display: block;
  max-height: 800px;
`;
