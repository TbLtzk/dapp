import styled from 'styled-components';

export const ReserveTip = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 15px;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
  background-color: ${(p) => p.theme.palette === 'dark' ? '#D3DAE3' : p.theme.colors.oxfordBlueTint5};

  p {
    margin-bottom: 0;
  }
`;
