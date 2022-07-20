import styled from 'styled-components';

export const ProposalLayoutContainer = styled.div`
  display: grid;
  gap: 32px;

  .proposal-layout__voting {
    display: flex;
    gap: 24px;
  }

  .details-list {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;

    &.single-column {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .details-list-item {
    display: grid;
    gap: 16px;
  }

  .details-item {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 16px;
  }

  .parameters-block {
    display: grid;
    gap: 8px;
  }

  .parameters-block-item {
    display: grid;
    grid-template-columns: 20px 3fr 3fr 1fr;
    gap: 16px;
  }

  .details-stub {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    text-align: center;

    .details-stub-content {
      display: grid;
      gap: 4px;
    }
  }
`;
