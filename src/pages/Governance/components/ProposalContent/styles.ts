import styled from 'styled-components';

export const ProposalContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
  }

  .content__item {
    p {
      margin-bottom: 0;
    }
  }
`;
