import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);

  .app__main {
    position: relative;
    height: calc(100vh - 72px);
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    overflow-y: overlay;
    overflow-x: hidden;
    min-width: 832px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .app__main-content {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;
