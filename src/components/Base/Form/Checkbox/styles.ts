import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const StyledCheckbox = styled(motion.div)<{ check: boolean; invertedColors?: boolean }>`
  margin: 20px;

  .checkbox {
    position: relative;
    border-radius: 2px;
    width: 17px;
    height: 17px;
    cursor: pointer;
    transition: all 0.2s ease-out;

    .checkmark {
      position: absolute;
    }

    ${(p) =>
      p.invertedColors
        ? css`
            border: 2px solid ${p.theme.colors.oxfordBlueTint6};
            background-color: ${p.check ? p.theme.colors.oxfordBlueTint6 : 'transparent'};
            &:hover {
              border: 2px solid ${(p) => p.theme.colors.oxfordBlueTint5};
              background-color: ${p.check ? p.theme.colors.oxfordBlueTint5 : 'transparent'};
            }
            .checkmark-path {
              stroke: ${p.theme.colors.oxfordBlueTint1};
            }
          `
        : css`
            border: 2px solid ${p.theme.colors.oxfordBlueTint1};
            background-color: ${p.check ? p.theme.colors.oxfordBlueTint1 : 'transparent'};
            &:hover {
              border: 2px solid ${(p) => p.theme.colors.oxfordBlue};
              background-color: ${p.check ? p.theme.colors.oxfordBlue : 'transparent'};
            }
            .checkmark-path {
              stroke: ${(p) =>
                p.theme.currentTheme === 'dark' ? p.theme.colors.white : p.theme.colors.oxfordBlueTint6};
            }
          `}
  }
`;
