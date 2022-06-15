import styled from 'styled-components';

export const PurgeSlashingContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  @media screen and (min-width: 1370px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
