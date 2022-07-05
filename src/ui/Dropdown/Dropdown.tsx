import { HTMLAttributes, ReactNode, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AnimatePresence, motion } from 'framer-motion';

import useOnClickOutside from 'hooks/useOnClickOutside';

import { DropdownContainer } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  fullWidth?: boolean
  right?: boolean
  disabled?: boolean
  trigger: ReactNode
  onToggle: (open: boolean) => void
}

function Dropdown ({
  open = false,
  fullWidth = false,
  right = false,
  disabled = false,
  trigger,
  children,
  onToggle,
  ...rest
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => onToggle(false));
  useHotkeys('esc', () => onToggle(false));

  return (
    <DropdownContainer
      ref={dropdownRef}
      $fullWidth={fullWidth}
      $right={right}
      {...rest}
    >
      <div onClick={() => !disabled && onToggle(!open)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dropdown-content"
            transition={{ duration: 0.15 }}
            variants={{
              open: { scaleY: 1 },
              closed: { scaleY: 0 },
            }}
            initial="closed"
            animate={open ? 'open' : 'closed'}
            exit="closed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
}

export default Dropdown;
