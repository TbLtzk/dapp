import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledBackground = styled(motion.div)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const StyledModal = styled(motion.div)`
  max-width: 500px;
  max-height: 500px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.oxfordBlue};
  background-color: ${(p) => p.theme.colors.oxfordBlueTint6};
  box-shadow: 0px 4px 4px rgba(7, 23, 43, 0.32), 0px -1px 2px rgba(7, 23, 43, 0.24);
  border-radius: 8px;
  z-index: 100;
`;
