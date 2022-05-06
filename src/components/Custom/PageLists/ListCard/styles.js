import { Card } from 'react-bootstrap';

import styled from 'styled-components';

import { indents } from 'constants/style';

export const ListCardWrp = styled(Card)`
  border: 0;
  background: ${(props) => props.theme.colors.oxfordBlueTint1};
  margin-bottom: 16px;

  h1 {
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
    margin-bottom: 0;
    font-family: "Lora", sans-serif;
  }

  h3 {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 16px;
    line-height: 17px;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 15px;
  }

  h4 {
    color: ${(props) => props.theme.colors.white};
    font-size: 12px;
    line-height: 17px;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 10px;
  }

  h5 {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-weight: 600;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 2px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    padding-left: 0;
    font-size: 13px;
    line-height: 17px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 15px;

    :hover {
      color: ${(props) => props.theme.colors.white};
      text-decoration: underline;
    }
  }

  .list-card__status {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 18px;
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    border: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
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
    background-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.oxfordBlueTint2;
    } else {
      return props.theme.colors.oxfordBlueTint5;
    }
  }};
    color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }};
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
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;

      :after {
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-top: 1px solid ${(props) => props.theme.colors.white};
      }
    }

    &:focus {
      box-shadow: ${(props) => (props.palette === 'light' ? 'none !important' : 'auto')};
      color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }}!important;
      background-color: ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.oxfordBlueTint2;
    } else {
      return props.theme.colors.oxfordBlueTint5;
    }
  }}!important;
      border-color: ${(props) => props.theme.colors.oxfordBlueTint2};

      :after {
        border-left: 1px solid
          ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }};
        border-top: 1px solid
          ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }};
      }
    }

    :after {
      border-radius: 0;
      margin-left: 10px;
      border-left: 1px solid
        ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }};
      border-top: 1px solid
        ${(props) => {
    if (props.palette === 'dark') {
      return props.theme.colors.white;
    } else {
      return props.theme.colors.oxfordBlue;
    }
  }};
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
    margin-bottom: 0;
    text-decoration: none !important;
    cursor: pointer;

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

    i {
      margin-right: 5px;
    }
  }

  .list-card__tow-colm {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};

    & > * {
      width: 100%;
      max-width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .list-card__three-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};

    & > * {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .list-card__column-1-2-2 {
    display: grid;
    grid-template-columns: minmax(100px, 120px) minmax(100px, 2fr) minmax(100px, 2fr);
    grid-column-gap: ${indents['15']};

    & > * {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .list-card__chart-block {
    display: flex;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 15px;

    & > :first-child {
      margin-right: 30px;
    }
  }

  .list-card__line {
    width: 100%;
    height: 1px;
    margin-top: 15px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  .list-card__actions {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export const ListCardHeader = styled(Card.Header)`
  padding: 20px 20px 0 20px;
  background: ${(props) => props.theme.colors.oxfordBlueTint1};
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;

  & > *:not(:first-child) {
    text-align: right;
  }

  & > *:first-child {
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    h1 {
      max-width: 290px;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  & > * {
    display: flex;
  }
`;

export const ListCardBody = styled(Card.Body)`
  background-color: ${(props) => props.theme.colors.oxfordBlueTint1};
  border-radius: 0 0 3px 3px;
  padding: 20px;
  margin-bottom: 16px;
  border: none;
`;
