import { ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';

import { StyledBackground, StyledModal } from './styles';

type Props = {
  children?: ReactNode;
  onLeave: () => void;
  open: boolean;
};

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function Modal ({ children, onLeave, open }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <StyledBackground onClick={() => {}}>
          <StyledModal
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </StyledModal>
        </StyledBackground>
      )}
    </AnimatePresence>
  );
}

export default Modal;
