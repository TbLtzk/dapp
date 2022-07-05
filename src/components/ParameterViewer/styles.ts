import styled from 'styled-components';

export const ParameterViewerContainer = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 16px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.blockDivider};
`;
