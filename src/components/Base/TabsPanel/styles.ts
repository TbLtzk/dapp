import styled from 'styled-components';

export const TabsStyle = styled.div`
  position: relative;
  overflow-x: auto;
  padding: 4px 0;
  margin-bottom: -3px;

  &::-webkit-scrollbar {
    display: none;
  }

  .tabs-container {
    display: flex;
    min-width: max-content;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.oxfordBlueTint2};
  }
  
  .tab {
    position: relative;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.oxfordBlueTint3};
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: none;
    }

    &.active {
      color: ${({ theme }) => theme.colors.white};
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 1px;
        z-index: 1;
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  .tab-count {
    position: absolute;
    top: -2px;
    right: -2px;
    display: grid;
    place-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 600;
    /* TODO: Colors */
    background-color: #2374DB;
    color: #fff;
  }
`;
