import styled from 'styled-components';

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;

  @media screen and (max-width: 1150px) {
    grid-template-columns: 1fr;
  }
`;

export const ListEmptyMessage = styled.div`
  margin: 40px auto;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;
