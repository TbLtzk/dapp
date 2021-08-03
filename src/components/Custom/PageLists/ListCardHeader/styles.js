import styled from 'styled-components'

import { Card } from 'react-bootstrap'

export const Header = styled(Card.Header)`
  padding: 20px 20px 0 20px;
  background: ${props => props.theme.colors.oxfordBlueTint1};
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: ${props => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
    margin-bottom: 0;
    font-family: 'Lora', sans-serif;
  }

  .list-card__status {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 18px;
    color: ${props => props.theme.colors.oxfordBlueTint3};
    border: 1px solid ${props => props.theme.colors.oxfordBlueTint3};
    border-radius: 13px;
    padding: 1px 9px;
    margin-left: 10px;
  }

  .show > .btn-primary.dropdown-toggle {
    border-color: ${(props) => props.theme.colors.oxfordBlue};
    background-color: ${(props) => props.theme.colors.oxfordBlue};
    color: ${(props) => props.theme.colors.white};
  }

  .dropdown-toggle {
    align-items: center;
    width: ${(props) => (!props.width ? 'auto' : props.width)};
    max-width: ${(props) => (!props.width ? 'auto' : props.width)};
    min-width: ${(props) => (!props.width ? 'auto' : props.width)};
    padding: 7px 11px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    line-height: 18px;
    border-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    color: ${(props) => props.theme.colors.white};
    border-radius: 3px;

    &:disabled {
      color: ${(props) => props.theme.colors.oxfordBlue};
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2};
      opacity: 1;
      box-shadow: none;
    }

    &:hover {
      color: ${(props) => props.theme.colors.oxfordBlue};
      background-color: ${(props) => props.theme.colors.neonGreen};
      border-color: ${(props) => props.theme.colors.neonGreen};

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.oxfordBlue};
        border-top: 1px solid ${(props) => props.theme.colors.oxfordBlue};
      }
    }

    &:active {
      color: ${(props) => props.theme.colors.white} !important;
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2}!important;

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-top: 1px solid ${(props) => props.theme.colors.white};
      }
    }

    &:focus {
      color: ${(props) => props.theme.colors.white};
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2};

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-top: 1px solid ${(props) => props.theme.colors.white};
      }
    }

    :after {
      border-radius: 0;
      margin-left: 10px;
      border-left: 1px solid ${(props) => props.theme.colors.white};
      border-top: 1px solid ${(props) => props.theme.colors.white};
      border-right: none;
      width: 6px;
      height: 6px;
      transform: rotate(-135deg);
    }
  }

  .dropdown-menu {
    padding: 0;
    background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    min-width: 100px;
  }

  .dropdown-item {
    align-items: center;
    width: ${(props) => (!props.width ? 'auto' : props.width)};
    max-width: ${(props) => (!props.width ? 'auto' : props.width)};
    min-width: ${(props) => (!props.width ? 'auto' : props.width)};
    padding: 7px 11px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    line-height: 18px;
    border-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    color: ${(props) => props.theme.colors.white};
    border-radius: 3px;

    &:disabled {
      color: ${(props) => props.theme.colors.oxfordBlue};
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2};
      opacity: 1;
      box-shadow: none;
    }

    &:hover {
      color: ${(props) => props.theme.colors.oxfordBlue};
      background-color: ${(props) => props.theme.colors.neonGreen};
      border-color: ${(props) => props.theme.colors.neonGreen};

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.oxfordBlue};
        border-top: 1px solid ${(props) => props.theme.colors.oxfordBlue};
      }
    }

    &:active {
      color: ${(props) => props.theme.colors.white} !important;
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2};

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-top: 1px solid ${(props) => props.theme.colors.white};
      }
    }

    &:focus {
      color: ${(props) => props.theme.colors.white} !important;
      background-color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-top: 1px solid ${(props) => props.theme.colors.white};
      }
    }

    i{
      margin-right: 5px;
    }
  }
`

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
`

export const WrapBtnHeader = styled.div`
  text-align: right;
`
