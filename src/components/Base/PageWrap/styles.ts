import { Container } from 'react-bootstrap';

import styled, { css } from 'styled-components';
import { scrollbarStyle } from 'styles/globalStyle';

export const WrapContainer = styled(Container)`
  position: relative;
  height: calc(100vh - 72px);
  max-height: calc(100vh - 72px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  background: ${(props) => props.theme.colors.background};
  padding: 32px;
`;

export const PageTitleWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

export const PageTitleName = styled.div`
  max-width: 50%;
  display: flex;
  align-items: flex-start;
  text-transform: capitalize;
`;

export const PageTitleActions = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapContent = styled.div`
  margin-top: 32px;
  max-width: 100%;
  display: grid;
  gap: 16px;

  ${scrollbarStyle}

  &.wrap-content__tow-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    gap: 16px;
  }

  &.wrap-content__column-2-1 {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    gap: 16px;
  }

  &.wrap-content__three-colm {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    gap: 16px;
  }

  &.wrap-content__colm-2 {
    display: grid;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 1fr);
    gap: 16px;
  }

  .content__colm-1 {
    display: none;
  }

  .content__colm-2 {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    gap: 16px;
  }

  .content__time-locks {
    & > div {
      height: 97%;
    }
  }

  .content__colm-3 {
    display: flex;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    gap: 16px;

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

export const ToTopContainer = styled.div<{ isVisible: boolean }>`
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
