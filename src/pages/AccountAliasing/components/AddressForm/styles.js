import styled from 'styled-components';

export const WrapContainer = styled.div`
  margin-top: 10px;
  display: grid;
  align-items: flex-start;
  width: 100%;
  grid-template-columns: 480px 100px;
  gap: 15px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;

    button {
      width: 100px;
    }
  }
`;
