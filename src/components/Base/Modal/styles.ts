import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
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
