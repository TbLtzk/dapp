import { createPortal } from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';

import { Icon } from '@q-dev/q-ui-kit';
import { AnimatePresence, HTMLMotionProps } from 'framer-motion';

import Button from 'components/Button';

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
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-dialog block">
              <Button
                icon
                alwaysEnabled
                className="modal-close"
                look="ghost"
                onClick={onClose}
              >
                <Icon name="cross" />
              </Button>

              <h3 className="modal-title text-h2">
                {title}
              </h3>

              {tip && (
                <p className="modal-tip text-md">
                  {tip}
                </p>
              )}

              <div className="modal-content">
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
