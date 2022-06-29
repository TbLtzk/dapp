import styled from 'styled-components';

export const TooltipWrapper = styled.span`
  display: inline-flex;
  font-size: 12px;

  .tooltip-content {
    padding: 8px;
  }

  .copy-msg {
    width: 40px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
  }
`;

export const CopyTrigger = styled.span`
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
`;
