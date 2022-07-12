import styled from 'styled-components';

export const TipWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 15px;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.block};

  p {
    margin-bottom: 0;
  }
`;
