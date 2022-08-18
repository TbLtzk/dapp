import styled from 'styled-components';
import { media } from 'styles/media';

export const PageLayoutContainer = styled.div`
  .page-title-wrp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;

    ${media.lessThan('medium')} {
      flex-direction: column;
      gap: 16px;
    }
  }

  .page-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    ${media.lessThan('medium')} {
      gap: 8px;
    }

    // TODO: Remove when page header is passed via props
    span + .tooltip-wrapper {
      margin-left: -16px;

      ${media.lessThan('medium')} {
        margin-left: -8px;
      }
    }
  }

  .page-title-actions {
    display: flex;
    align-items: center;
  }

  .page-content {
    margin-top: 32px;
    max-width: 100%;
    display: grid;
    grid-template-columns: minmax(100px, 1fr);
    gap: 16px;

    ${media.lessThan('medium')} {
      margin-top: 24px;
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

      ${media.lessThan('medium')} {
        flex-direction: column;
      }
    }

    ${media.lessThan('large')} {
      .content__colm-2 {
        grid-template-columns: minmax(100px, 1fr);
      }
    }
  }

  .page-top-btn {
    position: fixed;
    bottom: 32px;
    right: 32px;
    opacity: 0.5;
    transition: all 300ms ease-out;

    ${media.lessThan('medium')} {
      display: none;
    }

    &:hover {
      opacity: 1;
    }
  }
`;
