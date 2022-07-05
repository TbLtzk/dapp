import { createPortal } from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { AnimatePresence, HTMLMotionProps } from 'framer-motion';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { ModalContainer } from './styles';

interface Props extends HTMLMotionProps<'div'> {
  open: boolean;
  title: string;
  tip?: string;
  width?: number;
  onClose: () => void;
}

function Modal ({
  open,
  title,
  tip,
  width = 420,
  children,
  onClose,
  ...rest
}: Props) {
  useHotkeys('esc', () => onClose());

  return (
    createPortal((
      <AnimatePresence>
        {open && (
          <ModalContainer
            $width={width}
            transition={{ duration: 0.2 }}
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            initial="closed"
            animate={open ? 'open' : 'closed'}
            exit="closed"
            {...rest}
          >
            <div className="q-modal-overlay" onClick={onClose} />
            <div className="q-modal-dialog block">
              <Button
                icon
                className="q-modal-close"
                look="ghost"
                onClick={onClose}
              >
                <Icon name="cross" />
              </Button>

              <h3 className="q-modal-title text-h2">
                {title}
              </h3>

              {tip && (
                <p className="q-modal-tip text-md">
                  {tip}
                </p>
              )}

              <div className="q-modal-content">
                {children}
              </div>
            </div>
          </ModalContainer>
        )}
      </AnimatePresence>
    ), document.body)
  );
}

export default Modal;
