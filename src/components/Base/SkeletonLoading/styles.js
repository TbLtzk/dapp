import styled from 'styled-components';

export const SkeletonLoadingWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.oxfordBlueTint1};
  border-radius: 6px;
  display: block;
  margin-bottom: 16px;
  max-height: 800px;
`;
