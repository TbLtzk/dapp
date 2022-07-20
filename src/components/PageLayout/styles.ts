import styled from 'styled-components';

export const PageLayoutContainer = styled.div`
  .page-title-wrp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .page-title {
    display: flex;
    align-items: center;
    text-transform: capitalize;
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

    &:hover {
      opacity: 1;
    }
  }
`;
