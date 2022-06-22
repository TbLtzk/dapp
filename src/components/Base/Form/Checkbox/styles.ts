import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledCheckbox = styled(motion.div)<{ check: boolean }>`
  margin: 20px;

  .checkbox {
    position: relative;
    border-radius: 2px;
    width: 17px;
    height: 17px;
    cursor: pointer;
    border: 2px solid ${(p) => p.theme.colors.oxfordBlueTint1};
    background-color: ${(p) => (p.check ? p.theme.colors.oxfordBlueTint1 : 'transparent')};
    transition: all 0.2s ease-out;

    &:hover {
      border: 2px solid ${(p) => p.theme.colors.oxfordBlue};
      background-color: ${(p) => (p.check ? p.theme.colors.oxfordBlue : 'transparent')};
    }

    .checkmark {
      position: absolute;
      .checkmark-path {
        stroke: ${(p) => (p.theme.currentTheme === 'dark' ? p.theme.colors.white : p.theme.colors.oxfordBlueTint6)};
      }
    }
  }
`;
