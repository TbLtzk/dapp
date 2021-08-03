import styled from 'styled-components'

export const WrapPagination = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.oxfordBlueTint3};

  .pagination {
    margin: 0;
  }

  .page-link {
    background-color: transparent;
    color: ${props => props.theme.colors.oxfordBlueTint3};
    cursor: pointer;
    border: none;
    padding: 10px;
    box-shadow: none;
  }

  .active .page-link {
    background-color: transparent;
    color: ${props => props.theme.colors.white};
  }

  .disabled .page-link {
    background-color: transparent;
    color: ${props => props.theme.colors.white};
    cursor: default;
  }

`

export const WrapText = styled.div`
  margin-right: 10px;
  `
