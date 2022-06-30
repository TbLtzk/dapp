import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const ProposalCardLink = styled(Link)`
  background-color: ${(props) => props.theme.colors.block};
  padding: 20px;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 150ms ease-out;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
    border-color: ${(props) => props.theme.colors.blockBorder};
  }

  .proposal-card__head {
    display: flex;
    justify-content: space-between;
  }

  .proposal-card__title {
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
    font-family: "Lora", sans-serif;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 8px;
  }

  .proposal-card__body {
    margin-top: 16px;
  }
  
  h5 {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-weight: 600;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 0;
  }

  p {
    font-size: 13px;
    margin-bottom: 0;
  }
`;
