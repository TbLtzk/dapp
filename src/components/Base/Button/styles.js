import styled, { css } from 'styled-components';

export const ButtonCustom = styled.button`
  align-items: center;
  width: ${(p) => (!p.width ? 'auto' : p.width)};
  max-width: ${(p) => (!p.width ? 'auto' : p.width)};
  min-width: ${(p) => (!p.width ? 'auto' : p.width)};
  position: ${(p) => (!p.position ? '' : p.position)};
  right: ${(p) => (!p.right ? '' : p.right)};
  top: ${(p) => (!p.top ? '' : p.top)};
  margin: ${(p) => (!p.margin ? '' : p.margin)};
  padding: 7px 11px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  line-height: 18px;
  transition: 0.2s;
  border: 1px solid black;
  outline: none;
  border-radius: 3px;
  border-color: ${(p) =>
    p.type === 'white'
      ? p.theme.colors.oxfordBlueTint5
      : p.type === 'transparent'
      ? 'transparent'
      : p.theme.colors.oxfordBlueTint2};

  &:hover {
    color: ${(p) => p.theme.colors.oxfordBlue};
  }

  &:disabled {
    opacity: 1;
    box-shadow: none;
  }

  .btn-icon {
    margin: ${(p) => (p.title ? (p.isiconpositionright ? '0 0 0 10px' : '0 10px 0 0') : '0')};
    font-size: ${(p) => (p.iconfontsize ? p.iconfontsize : '')};
  }

  ${(p) =>
    p.theme.palette === 'dark'
      ? css`
          background-color: ${p.type === 'white' || p.type === 'transparent'
            ? 'transparent'
            : p.theme.colors.oxfordBlueTint2};
          color: ${p.type === 'white' || p.type === 'transparent'
            ? p.theme.colors.oxfordBlueTint5
            : p.theme.colors.white};
          &:hover {
            background-color: ${p.type === 'white' || p.type === 'transparent'
              ? p.theme.colors.oxfordBlueTint5
              : p.theme.colors.neonGreen};
            border-color: ${p.type === 'white' || p.type === 'transparent'
              ? p.theme.colors.oxfordBlueTint5
              : p.theme.colors.neonGreen};
          }

          &:disabled {
            color: ${p.type === 'transparent' ? p.theme.colors.oxfordBlueTint2 : p.theme.colors.oxfordBlue};
            background-color: ${p.type === 'white'
              ? p.theme.colors.oxfordBlueTint2
              : p.type === 'transparent'
              ? 'transparent'
              : p.theme.colors.circleDark};
            border-color: ${p.type === 'transparent' ? 'transparent' : p.theme.colors.oxfordBlueTint2};
          }
        `
      : css`
          color: ${p.theme.colors.oxfordBlue};
          background-color: ${p.theme.colors.oxfordBlueTint5};
          &:hover {
            background-color: ${p.theme.colors.oxfordBlueTint4};
            border-color: ${p.theme.colors.oxfordBlueTint4};
          }

          &:disabled {
            color: ${p.theme.colors.oxfordBlue};
            background-color: ${p.theme.colors.circleDark};
            border-color: ${p.type === 'transparent' ? 'transparent' : p.theme.colors.circleDark};
          }
        `}
`;
