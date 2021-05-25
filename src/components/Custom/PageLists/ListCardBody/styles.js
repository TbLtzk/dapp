import styled from 'styled-components';

import { Card } from 'react-bootstrap';

import { indents } from 'constants/style';

export const BlockBody = styled(Card.Body)`
  background-color: ${props => props.theme.colors.oxfordBlueTint1};
  border-radius: 0 0 3px 3px;
  padding: 20px;
  margin-bottom: 16px;

  h3 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 16px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 15px;
  }

  h4 {
    color: ${props => props.theme.colors.white};
    font-size: 12px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 10px;
  }

  h5 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-weight: 600;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 2px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
  }

  a {
    padding-left: 0;
    font-size: 13px;
    line-height: 17px;
    color: ${props => props.theme.colors.white};
    margin-bottom: 15px;
    display: block;

    :hover {
      color: ${props => props.theme.colors.white};
      text-decoration: underline;
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

  .list-card__tow-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
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
    border-bottom: 1px solid ${props => props.theme.colors.oxfordBlueTint3};
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

export const Details = styled.div`
  ${props => props.theme.fontStyles.text.middle};
  font-weight: 500;
  color: ${props => props.theme.colors.oxfordBlueTint3};

  span {
    margin-left: 8px;
    ${props => props.theme.fontStyles.text.middle};
    font-weight: 500;
  }

  p {
    ${props => props.theme.fontStyles.text.middle};
    font-weight: 500;
    color: ${props => props.theme.colors.oxfordBlueTint3};
    display: inline-block;
    margin-bottom: 0;
  }
`;

export const ToggleBtn = styled.button`
  ${props => props.theme.fontStyles.text.little};
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.white};
  background: transparent;
  border: 0;
  outline: 0 !important;

  span {
    margin-right: 8px;
  }
`;
