import styled from 'styled-components';

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;

  & > a {
    color: inherit;
    margin-bottom: 0;

    & > p {
      margin-bottom: 0;
    }
  }

  span {
    display: flex;

    .tooltip {
      bottom: 120%;
    }
  }

  i {
    margin-left: 4px;
    font-size: 12px;
  }
`;
