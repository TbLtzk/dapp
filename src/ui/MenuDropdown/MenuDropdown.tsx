import { HTMLAttributes, ReactNode, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { motion } from 'framer-motion';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useOnClickOutside from 'hooks/useOnClickOutside';

import { MenuContainer } from './styles';

interface MenuItems {
  id: string;
  title: string | ReactNode;
  action?: () => void;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  right?: boolean;
  disabled?: boolean;
  menuItems: MenuItems[];
  trigger?: ReactNode | undefined;
  onToggle: (open: boolean) => void;
}

function MenuDropdown ({
  open = false,
  right = false,
  disabled = false,
  trigger,
  children,
  onToggle,
  menuItems,
  ...rest
}: Props) {
  const defaultTrigger = (
    <Button
      icon
      alwaysEnabled
      look="secondary"
    >
      <motion.span style={{ height: '100%' }} animate={{ rotate: open ? 180 : 0 }}>
        <Icon name="expand-more" />
      </motion.span>
    </Button>
  );
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuDropdownRef, () => onToggle(false));
  useHotkeys('esc', () => onToggle(false));

  return (
    <MenuContainer
      right={right}
      open={open}
      trigger={trigger || defaultTrigger}
      disabled={disabled}
      onToggle={onToggle}
      {...rest}
    >
      <div className="menu-content">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-option"
            onClick={() => {
              item.action && item.action();
              onToggle(false);
            }}
          >
            <span className="text-md"> {item.title}</span>
          </div>
        ))}
        {children}
      </div>
    </MenuContainer>
  );
}

export default MenuDropdown;
