import { Container } from 'react-bootstrap';

import styled, { css } from 'styled-components';

import { scrollbarStyle } from 'constants/globalStyle';
import { indents } from 'constants/style';

export const WrapContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  background: ${(props) => props.theme.colors.oxfordBlue};
  padding: 0 ${indents['45']} 0 ${indents['40']};

  @media screen and (max-width: 1550px) {
    padding: 0 ${indents['15']} 0 ${indents['15']};
  }
`;

export const PageTitleWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${indents['15']};
  padding-top: ${indents['15']};

  a {
    text-decoration: none;
  }
`;

export const PageTitleName = styled.div`
  max-width: 50%;
  display: flex;
  font-size: 30px;
  line-height: 38px;
  align-items: flex-start;
  font-family: "Lora", sans-serif;
  text-transform: capitalize;
`;

export const PageTitleActions = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapContent = styled.div`
  min-height: 490px;
  max-width: 100%;
  ${scrollbarStyle}

  &.wrap-content__tow-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  &.wrap-content__column-2-1 {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  &.wrap-content__three-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  &.wrap-content__colm-2 {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  .content__colm-1 {
    display: none;
  }

  .content__colm-2 {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};
  }

  .content__time-locks {
    & > div {
      height: 97%;
    }
  }

  .content__colm-3 {
    display: flex;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-column-gap: ${indents['15']};

    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1250px) {
    .wrap-content__colm-1 {
      display: block;
      width: 100%;
    }
    .wrap-content__colm-2 {
      display: none;
    }
    .content__colm-2 {
      grid-template-columns: minmax(100px, 1fr);
    }
  }
`;

export const ToTopContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 55px;

  transition: all 0.3s ease-in-out;
  transition-delay: 0.2s;

  i {
    cursor: pointer;
    opacity: 0.33;
    font-size: 40px;
  }

  i:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.white};
  }

  ${(p) =>
    p.isVisible
      ? css`
          right: -50px;
        `
      : css``};
`;
