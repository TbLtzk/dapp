
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { getModalColor } from './colors';

export const ModalContainer = styled(motion.div)<{ $width: number }>`
  position: fixed;
  z-index: 10000;

  // TODO: remove prefix when bootstrap is removed
  .q-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => getModalColor(theme, 'overlay')};
    pointer-events: all;
  }

  .q-modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    padding: 32px;
    pointer-events: all;
    width: ${({ $width }) => `${$width}px`};
  }

  .q-modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .q-modal-tip {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .q-modal-content {
    border: none;
    margin-top: 24px;
    background-color: transparent;
  }
`;
