import { HTMLAttributes, ReactNode, useRef } from 'react';

import { motion } from 'framer-motion';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useOnClickOutside from 'hooks/useOnClickOutside';

import { MenuContainer } from './styles';

interface MenuItems {
  id: string;
  title: string | ReactNode;
  func?: () => void;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  right?: boolean;
  disabled?: boolean;
  menuItems: MenuItems[];
  trigger: ReactNode | undefined;
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
    <motion.div animate={{ rotate: open ? 270 : 90 }}>
      <Button icon look="secondary">
        <Icon name="chevron-right" />
      </Button>
    </motion.div>
  );
  const menuDropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuDropdownRef, () => onToggle(false));

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
            onClick={item?.func}
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
