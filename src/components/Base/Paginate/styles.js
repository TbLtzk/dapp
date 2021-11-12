import styled from 'styled-components'

export const PaginateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .page-link {
    background-color: transparent;
    border: none;
    margin-right: 10px;
    padding: 0;
  }

  .break-link {
    border: none;
    margin-right: 10px;
    padding: 0;
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.oxfordBlueTint3
      } else {
        return props.theme.colors.oxfordBlueTint4
      }
    }};
  }

  .pagination {
    padding: 0;
    margin-bottom: 0;
    li.page-item {
      &:first-child {
        display: none;
      }
      &:last-child {
        display: none;
      }
    }
  }

  a {
    color: inherit;
  }

  a:hover {
    color: inherit;
    text-decoration: underline;
  }

  a:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  .active {
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.white
      } else {
        return props.theme.colors.oxfordBlueTint6
      }
    }} !important;
  }

  .page-item__link {
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.oxfordBlueTint3
      } else {
        return props.theme.colors.oxfordBlueTint4
      }
    }};
  }

  .page-item__title {
    color: ${(props) => props.theme.colors.white};
    margin-right: 10px;
  }
`
