import styled, { css } from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
  }

  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.oxfordBlueTint2};
  }

  td {
    color: ${(props) => props.theme.colors.white};
    font-size: 13px;
    line-height: 18px;
    padding: 7px 5px;
    white-space: ${({ $simplified }) => $simplified ? 'normal' : 'nowrap'};

    ${({ $simplified }) => $simplified && css`
      &:first-child {
        font-weight: 600;
      }
    `}
  }
`;
