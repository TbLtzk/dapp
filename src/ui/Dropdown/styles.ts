import styled from 'styled-components';

export const DropdownContainer = styled.div<{
  $fullWidth: boolean
  $right: boolean
}>`
  position: relative;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'max-content'};

  .dropdown-content {
    position: absolute;
    top: calc(100% + 8px);
    left: ${({ $right }) => $right ? 'unset' : '0'};
    right: ${({ $right }) => $right ? '0' : 'unset'};
    min-width: 120px;
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    z-index: 10000;
    transform-origin: top right;
  }
`;
