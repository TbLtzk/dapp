import styled from 'styled-components';

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;

  .address-icon {
    display: flex;
    margin-right: 8px;
    transform: scale(0.8);
  }

  & > a {
    color: inherit;
    margin-bottom: 0;
    ${(p) => p.$semibold && 'font-weight: 600;'}

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
`;
