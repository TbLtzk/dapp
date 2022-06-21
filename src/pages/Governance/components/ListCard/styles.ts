import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { indents } from 'constants/style';

export const ProposalLink = styled(Link)`
  &,
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export const ListCardWrp = styled.div`
  background-color: ${(props) => props.theme.colors.oxfordBlueTint1};
  padding: 20px;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: all 150ms ease-out;

  &:hover {
    border-color: ${(props) => props.theme.colors.oxfordBlueTint4};
  }

  h1 {
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
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
    margin-bottom: 0;
    text-overflow: ellipsis;
  }

  a {
    padding-left: 0;
    font-size: 13px;
    line-height: 17px;
    color: ${(props) => props.theme.colors.white};

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

    &.executed,
    &.passed,
    &.accepted {
      border-color: ${(props) => props.theme.colors.neonGreen};
      color: ${(props) => props.theme.colors.neonGreen};
    }

    &.rejected,
    &.expired {
      border-color: ${(props) => props.theme.colors.validationError};
      color: ${(props) => props.theme.colors.validationError};
    }

    &.pending {
      border-color: ${(props) => props.theme.colors.yellow};
      color: ${(props) => props.theme.colors.yellow};
    }
  }

  .list-card__tow-colm {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
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

  .card__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 8px;
  }
`;

export const ListCardHeader = styled.div`
  border: none;
  display: flex;
  justify-content: space-between;

  .card__buttons {
    width: 150px;
    display: flex;
    justify-content: flex-end;
  }

  p {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1150px) {
    .card__buttons {
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: flex-end;
      position: absolute;
      top: 20px;
      right: 10px;
      height: 90px;
    }
  }
`;

export const ListCardBody = styled.div`
  margin-top: 16px;

  @media screen and (max-width: 1150px) {
    display: flex;
    flex-direction: column;
  }
`;
