import styled, { css } from 'styled-components';

export const ButtonCustom = styled.button`
  position: relative;
  display: inline-flex;
  gap: 10px;
  flex-direction: ${(p) => p.$iconRight ? 'row-reverse' : 'row'};
  align-items: center;
  justify-content: center;
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
    p.$look === 'white'
      ? p.theme.colors.oxfordBlueTint5
      : p.$look === 'transparent'
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
    font-size: ${(p) => p.$iconFontSize || ''};
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  ${(p) =>
    p.theme.palette === 'dark'
      ? css`
          background-color: ${p.$look === 'white' || p.$look === 'transparent'
            ? 'transparent'
            : p.theme.colors.oxfordBlueTint2};
          color: ${p.$look === 'white' || p.$look === 'transparent'
            ? p.theme.colors.oxfordBlueTint5
            : p.theme.colors.white};
          &:hover {
            background-color: ${p.$look === 'white' || p.$look === 'transparent'
              ? p.theme.colors.oxfordBlueTint5
              : p.theme.colors.neonGreen};
            border-color: ${p.$look === 'white' || p.$look === 'transparent'
              ? p.theme.colors.oxfordBlueTint5
              : p.theme.colors.neonGreen};
          }

          &:disabled {
            color: ${p.$look === 'transparent' ? p.theme.colors.oxfordBlueTint2 : p.theme.colors.oxfordBlue};
            background-color: ${p.$look === 'white'
              ? p.theme.colors.oxfordBlueTint2
              : p.$look === 'transparent'
              ? 'transparent'
              : p.theme.colors.circleDark};
            border-color: ${p.$look === 'transparent' ? 'transparent' : p.theme.colors.oxfordBlueTint2};
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
            border-color: ${p.$look === 'transparent' ? 'transparent' : p.theme.colors.circleDark};
          }
        `}
`;
